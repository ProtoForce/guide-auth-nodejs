import { ExtractorSpec, RestSpec } from './specs';
import { isObject, BasicField } from './common';
import { encodeWireType, decodeURIValue } from './encoder';

function payloadError(
    message: string,
    payload: unknown,
    path: BasicField[]
): string {
    const p = path.map(p => p.name).join('.');
    const pj = JSON.stringify(payload, undefined, 2);
    return `${message} in payload: ${pj} in path: ${p}`;
}

function extractField(
    payload: unknown,
    path: BasicField[],
    field: BasicField,
    optional?: boolean
): unknown {
    if (!isObject(payload)) {
        throw new Error(payloadError('Expected object', payload, [...path, field]));
    }

    let pathObjects = [{ key: '', obj: payload }];
    let value: {[key: string]: unknown} | unknown = payload;

    for (let i = 0; i < path.length; i++) {
        const f = path[i];
        switch (typeof value) {
            case 'object':
                if (!isObject(value)) {
                    throw new Error(payloadError('Expected object', payload, [...path, field]));
                }
                pathObjects.push({ key: f.name, obj: value });
                value = value[f.name];
                // Because we do clean ups at each iteration of field
                // exteraction, we need to check in the path that we are
                // fine to continue looking for a field.
                if (typeof value === 'undefined') {
                    if (optional) {
                        return undefined;
                    }
                    throw new Error(
                        payloadError('Path is not accessible', payload, [...path, field])
                    );
                }
                break;

            default:
                throw new Error(
                    payloadError('Expected object', payload, [...path, field])
                );
        }
    }

    const res = value[field.name];
    if (typeof res === 'undefined') {
        if (optional) {
            return undefined;
        }

        throw new Error(
            payloadError(`Field ${field.name} is not found`, payload, [
                ...path,
                field
            ])
        );
    }
    delete value[field.name];

    // Since we extracted the field, we now need to go back and check
    // whether we need to clean up objects
    for (let i = pathObjects.length - 1; i > 0; i--) {
        const v = pathObjects[i];
        if (Object.keys(v.obj[v.key]).length === 0) {
            delete v.obj[v.key];
        }
    }

    return res;
}

function insertField(
    payload: unknown,
    path: BasicField[],
    field: BasicField,
    value: unknown
) {
    let obj = payload;
    for (let i = 0; i < path.length; i++) {
        if (!isObject(obj)) {
            throw new Error(
                payloadError('Expected object', payload, [...path, field])
            );
        }

        const p = path[i];
        if (typeof obj[p.name] === 'undefined') {
            obj[p.name] = {};
        }

        obj = obj[p.name];
    }

    if (!isObject(obj)) {
        throw new Error(payloadError('Expected object', payload, [...path, field]));
    }

    obj[field.name] = value;
}

function constructEndpoint(payload: unknown, spec: ExtractorSpec): string {
    const path = spec.pathSpec
        .map(p => {
            switch (p.type) {
                case 'word':
                    return p.value
                case 'param':
                    return extractField(payload, p.path, p.field)
                default:
                    throw new Error('Unexpected path segment type: ' + JSON.stringify(p))
            }
        })
        .join('/');

    const query = Object.keys(spec.queryParameters)
        .map(key => {
            const param = spec.queryParameters[key];
            const optional =
                param.onWire.type === 'generic' && param.onWire.generic === 'option';

            const value = extractField(payload, param.path, param.field, optional);
            if (optional && !value) {
                return undefined;
            }

            return encodeWireType(key, param.onWire, value);
        })
        .filter(qp => qp && qp !== '')
        .join('&');

    return path + (query !== '' ? `?${query}` : '');
}

function deconstructEndpoint(
    payload: object,
    endpoint: string,
    spec: ExtractorSpec
) {
    const chunks = endpoint.split('?');
    if (chunks.length > 2) {
        throw new Error('Invalid endpoint format: ' + endpoint);
    }

    const pss = chunks[0].split('/');
    if (pss.length !== spec.pathSpec.length) {
        throw new Error(
            `Endpoint expected to have ${spec.pathSpec.length} segments, got ${pss.length}`
        );
    }

    for (let i = 0; i < spec.pathSpec.length; i++) {
        const ps = spec.pathSpec[i];
        switch (ps.type) {
            case 'word':
                if (ps.value !== pss[i]) {
                    throw new Error(`Segment ${i} must be '${ps.value}', got '${pss[i]}'`);
                }
                break;

            case 'param':
                switch (ps.onWire.type) {
                    case 'scalar':
                        insertField(
                            payload,
                            ps.path,
                            ps.field,
                            decodeURIValue(pss[i], ps.onWire.ref)
                        );
                        break;

                    default:
                        throw new Error(
                            'Only scalars are supported in path. Got: ' + JSON.stringify(ps)
                        );
                }
                break;

            default:
                throw new Error('Unexpected path segment type: ' + JSON.stringify(ps));
        }
    }

    if (chunks.length === 2) {
        const qps: { [key: string]: string | string[] } = {};
        chunks[1]
            .split('&')
            .map(qp => qp.split('='))
            .forEach(([key, value]) => {
                if (typeof qps[key] !== 'undefined') {
                    const existing = qps[key];
                    if (Array.isArray(existing)) {
                        qps[key] = [...existing, value];
                    } else {
                        qps[key] = [existing, value];
                    }
                } else {
                    qps[key] = value;
                }
            });

        Object.keys(spec.queryParameters).forEach(key => {
            const qp = spec.queryParameters[key];
            const value = qps[key];
            if (!value) {
                if (qp.onWire.type === 'generic' && qp.onWire.generic === 'option') {
                    return;
                }
                throw new Error(
                    `Query parameter was expected with key ${key} in ${JSON.stringify(
                        qps
                    )}`
                );
            }

            switch (qp.onWire.type) {
                case 'scalar':
                    if (Array.isArray(value)) {
                        throw new Error(
                            'Scalar is expected to have only a single value, got array.'
                        );
                    }
                    insertField(
                        payload,
                        qp.path,
                        qp.field,
                        decodeURIValue(value, qp.onWire.ref)
                    );
                    break;

                case 'generic':
                    switch (qp.onWire.generic) {
                        case 'option':
                            if (Array.isArray(value)) {
                                throw new Error(
                                    'option is expected to have only a single value, got array.'
                                );
                            }
                            if (qp.onWire.ref.args.length !== 1) {
                                throw new Error(
                                    'option is expected to have only a single arg value.'
                                );
                            }
                            insertField(
                                payload,
                                qp.path,
                                qp.field,
                                decodeURIValue(value, qp.onWire.ref.args[0])
                            );
                            break;

                        case 'list':
                            if (qp.onWire.ref.args.length !== 1) {
                                throw new Error(
                                    'list is expected to have only a single arg value.'
                                );
                            }
                            // We support both packed and unpacked arrays here, so just accepting everything
                            if (Array.isArray(value)) {
                                const decoded = value.map(v =>
                                    decodeURIValue(v, qp.onWire.ref.args[0])
                                );
                                insertField(payload, qp.path, qp.field, decoded);
                            } else {
                                insertField(
                                    payload,
                                    qp.path,
                                    qp.field,
                                    decodeURIValue(value, qp.onWire.ref)
                                );
                            }
                            break;

                        case 'map':
                            if (Array.isArray(value)) {
                                throw new Error(
                                    'map is expected to have only a single value, got array.'
                                );
                            }
                            insertField(
                                payload,
                                qp.path,
                                qp.field,
                                decodeURIValue(value, qp.onWire.ref)
                            );
                            break;

                        default:
                            throw new Error(
                                'Unexpected generic type: ' + JSON.stringify(qp.onWire)
                            );
                    }
                    break;
            }
        })
    }
}

/**
 * Converts json to a combination of body + endpoint using a rest spec
 * @param payload Payload to be converted
 * @param spec REST specification
 */
export function restify(payload: object, spec: RestSpec): string {
    return constructEndpoint(payload, spec.extractor);
}

/**
 * This is an inverted method to restify, which basically
 * reconstructs the JSON back from what it was
 * @param endpoint Path from which values can be extarcted
 * @param payload Payload received to be enriched with REST bits
 * @param spec REST specification
 */
export function unrestify(endpoint: string, payload: object, spec: RestSpec) {
    deconstructEndpoint(payload, endpoint, spec.extractor);
}