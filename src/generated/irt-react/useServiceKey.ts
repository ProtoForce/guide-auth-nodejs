import { useCallback, useMemo } from 'react';
import { CacheKeyType, CacheKeyPrimitiveType, CacheKeyParam } from '@dyssent/fetcherjs';

import { WithRTTI } from '../irt';

interface MaybeSerializableObject<TS = unknown> {
    toJSON?: () => TS;
}

interface MaybeADTObject {
    value?: WithRTTI;
    flatValue?: unknown;
    map?: () => unknown;
    flatMap?: () => unknown;
}

export type ServiceCacheKeyType =
    | CacheKeyPrimitiveType
    | { [key: string]: ServiceCacheKeyType }
    | ServiceCacheKeyType[]
    | MaybeSerializableObject;

export type ServiceCacheKeyParam = ServiceCacheKeyType | (() => ServiceCacheKeyType);

function unpackServiceKeyType(k: ServiceCacheKeyType): CacheKeyType {
    switch (typeof k) {
        case 'boolean':
            return k;
        case 'number':
            return k;
        case 'string':
            return k;
        case 'undefined':
            return k;
        case 'function': {
            throw new Error(`There should be no other types besides service classes in a key. toJSON method is missing.`);
        }

        case 'object': {
            if (k === null) {
                return k as CacheKeyType;
            }

            if (Array.isArray(k)) {
                return k.map(ak => unpackServiceKeyType(ak));
            }

            // See if this is a serializable object, or a class in other words
            const maybeSerializable = k as MaybeSerializableObject;
            if (maybeSerializable.toJSON) {
                return maybeSerializable.toJSON() as CacheKeyType;
            }

            const maybeADT = k as MaybeADTObject;
            if (maybeADT.flatMap && maybeADT.flatValue && maybeADT.value && maybeADT.flatValue) {
                return unpackServiceKeyType([maybeADT.value.RTTI_FQN, (maybeADT.value as unknown) as CacheKeyType]);
            }

            // We checked it has no serialize, so it must be the other type
            const ko = k as { [key: string]: ServiceCacheKeyType };

            const unpacked: { [key: string]: CacheKeyType } = {};
            Object.keys(k).forEach(key => (unpacked[key] = unpackServiceKeyType(ko[key])));
            return unpacked;
        }
        default:
            throw new Error(`Unexpected type: ${typeof k} in unpackServiceKeyType`);
    }
}

export function computeServiceKey(key: ServiceCacheKeyParam): CacheKeyParam {
    if (typeof key === 'function') {
        return () => unpackServiceKeyType(key());
    }
    if (key === false) {
        return false;
    }
    return unpackServiceKeyType(key);
}

export function useServiceKey<ARGS extends ServiceCacheKeyType[]>(
    service: string,
    method: string,
    ...args: ARGS
): [CacheKeyParam, (...forArgs: ARGS) => CacheKeyParam] {
    const func = useCallback((...forArgs: ARGS) => computeServiceKey([service, method, ...forArgs]), [service, method]);
    const key = useMemo(() => {
        return func(...args);
    }, [...args]);
    return [key, func];
}