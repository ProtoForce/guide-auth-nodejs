import { restify, unrestify } from '../transformer';
import { RestSpec } from '../specs';
import { HTTPMethod } from '../../http';

export interface SampleJSON {
    d: {
        f1?: string | undefined;
        f2?: string[] | undefined;
        f3?: { [key: string]: string } | undefined;
        f4: string[];
        f5: { [key: string]: string };
        f6?: number | undefined;
        f7: number[];
        f8: { [key: string]: number };
    }
}

const sample1: SampleJSON = {
    d: {
        f1: 's5',
        f2: ['abc', 'def'],
        f3: { key1: 'hij', key2: 'klm' },
        f4: ['x', 'y'],
        f5: { z: 'z' },
        f6: 10,
        f7: [1,2,3],
        f8: {
            'i1': 1,
            'i2': 2,
            'i3': 3
        }
    }
};

const sample2: SampleJSON = {
    d: {
        f4: ['x', 'y'],
        f5: { z: 'z' },
        f7: [1,2,3],
        f8: {'i1': 1}
    }
};

export function getSample1(): SampleJSON {
    return JSON.parse(JSON.stringify(sample1));
}

export function getSample2(): SampleJSON {
    return JSON.parse(JSON.stringify(sample2));
}

export const sample1Endpoint: string =
    '/get/7?f7=1,2,3&f6=10&f1=s5&f8=i1:1,i2:2,i3:3&f5=z:z&f3=key1:hij,key2:klm&f4=x,y&f2=abc,def';

export const sample2Endpoint: string =
    '/get/7?f7=1,2,3&f8=i1:1&f5=z:z&f4=x,y';

export const sampleSpec: RestSpec = {
    method: HTTPMethod.GET,
    extractor: {
        queryParameters: {
            f7: {
                field: {
                    name: 'f7',
                    ref: {
                        id: 'lst',
                        args: [
                            {
                                id: 'i32',
                                args: []
                            }
                        ]
                    }
                },
                path: [
                    {
                        name: 'd',
                        ref: {
                            id: 'D4',
                            args: []
                        }
                    }
                ],
                onWire: {
                    type: 'generic',
                    ref: {
                        id: 'lst',
                        args: [
                            {
                                id: 'i32',
                                args: []
                            }
                        ]
                    },
                    generic: 'list',
                    unpacked: false
                }
            },
            f6: {
                field: {
                    name: 'f6',
                    ref: {
                        id: 'opt',
                        args: [
                            {
                                id: 'i32',
                                args: []
                            }
                        ]
                    }
                },
                path: [
                    {
                        name: 'd',
                        ref: {
                            id: 'D4',
                            args: []
                        }
                    }
                ],
                onWire: {
                    type: 'generic',
                    ref: {
                        id: 'opt',
                        args: [
                            {
                                id: 'i32',
                                args: []
                            }
                        ]
                    },
                    generic: 'option'
                }
            },
            f1: {
                field: {
                    name: 'f1',
                    ref: {
                        id: 'opt',
                        args: [
                            {
                                id: 'str',
                                args: []
                            }
                        ]
                    }
                },
                path: [
                    {
                        name: 'd',
                        ref: {
                            id: 'D4',
                            args: []
                        }
                    }
                ],
                onWire: {
                    type: 'generic',
                    ref: {
                        id: 'opt',
                        args: [
                            {
                                id: 'str',
                                args: []
                            }
                        ]
                    },
                    generic: 'option'
                }
            },
            f8: {
                field: {
                    name: 'f8',
                    ref: {
                        id: 'map',
                        args: [
                            {
                                id: 'str',
                                args: []
                            },
                            {
                                id: 'i32',
                                args: []
                            }
                        ]
                    }
                },
                path: [
                    {
                        name: 'd',
                        ref: {
                            id: 'D4',
                            args: []
                        }
                    }
                ],
                onWire: {
                    type: 'generic',
                    ref: {
                        id: 'map',
                        args: [
                            {
                                id: 'str',
                                args: []
                            },
                            {
                                id: 'i32',
                                args: []
                            }
                        ]
                    },
                    generic: 'map'
                }
            },
            f5: {
                field: {
                    name: 'f5',
                    ref: {
                        id: 'map',
                        args: [
                            {
                                id: 'str',
                                args: []
                            },
                            {
                                id: 'str',
                                args: []
                            }
                        ]
                    }
                },
                path: [
                    {
                        name: 'd',
                        ref: {
                            id: 'D4',
                            args: []
                        }
                    }
                ],
                onWire: {
                    type: 'generic',
                    ref: {
                        id: 'map',
                        args: [
                            {
                                id: 'str',
                                args: []
                            },
                            {
                                id: 'str',
                                args: []
                            }
                        ]
                    },
                    generic: 'map'
                }
            },
            f3: {
                field: {
                    name: 'f3',
                    ref: {
                        id: 'opt',
                        args: [
                            {
                                id: 'map',
                                args: [
                                    {
                                        id: 'str',
                                        args: []
                                    },
                                    {
                                        id: 'str',
                                        args: []
                                    }
                                ]
                            }
                        ]
                    }
                },
                path: [
                    {
                        name: 'd',
                        ref: {
                            id: 'D4',
                            args: []
                        }
                    }
                ],
                onWire: {
                    type: 'generic',
                    ref: {
                        id: 'opt',
                        args: [
                            {
                                id: 'map',
                                args: [
                                    {
                                        id: 'str',
                                        args: []
                                    },
                                    {
                                        id: 'str',
                                        args: []
                                    }
                                ]
                            }
                        ]
                    },
                    generic: 'option'
                }
            },
            f4: {
                field: {
                    name: 'f4',
                    ref: {
                        id: 'lst',
                        args: [
                            {
                                id: 'str',
                                args: []
                            }
                        ]
                    }
                },
                path: [
                    {
                        name: 'd',
                        ref: {
                            id: 'D4',
                            args: []
                        }
                    }
                ],
                onWire: {
                    type: 'generic',
                    ref: {
                        id: 'lst',
                        args: [
                            {
                                id: 'str',
                                args: []
                            }
                        ]
                    },
                    generic: 'list',
                    unpacked: false
                }
            },
            f2: {
                field: {
                    name: 'f2',
                    ref: {
                        id: 'opt',
                        args: [
                            {
                                id: 'lst',
                                args: [
                                    {
                                        id: 'str',
                                        args: []
                                    }
                                ]
                            }
                        ]
                    }
                },
                path: [
                    {
                        name: 'd',
                        ref: {
                            id: 'D4',
                            args: []
                        }
                    }
                ],
                onWire: {
                    type: 'generic',
                    ref: {
                        id: 'opt',
                        args: [
                            {
                                id: 'lst',
                                args: [
                                    {
                                        id: 'str',
                                        args: []
                                    }
                                ]
                            }
                        ]
                    },
                    generic: 'option'
                }
            }
        },
        pathSpec: [
            {
                type: 'word',
                value: ''
            },
            {
                type: 'word',
                value: 'get'
            },
            {
                type: 'word',
                value: '7'
            }
        ]
    },
    body: {
        fields: []
    }
};

describe('RESTification', () => {
    it('Can restify sample1', () => {
        const payload = getSample1();
        console.log(`Restify body:\n${JSON.stringify(payload, undefined, 2)}`);

        const endpoint = restify(payload, sampleSpec);
        expect(endpoint).toEqual(sample1Endpoint);
        console.log(
            `Restified output:\nEndpoint: ${endpoint}\nBody: ${JSON.stringify(
                payload,
                undefined,
                2
            )}`
        );

        expect(() => unrestify(endpoint, payload, sampleSpec)).not.toThrow();
        console.log(
            `Unrestified output:\nBody: ${JSON.stringify(payload, undefined, 2)}`
        );

        expect(payload).toEqual(getSample1());
    });

    it('Can restify sample2', () => {
        const payload = getSample2();
        console.log(`Restify body:\n${JSON.stringify(payload, undefined, 2)}`);

        const endpoint = restify(payload, sampleSpec);
        expect(endpoint).toEqual(sample2Endpoint);
        console.log(
            `Restified output:\nEndpoint: ${endpoint}\nBody: ${JSON.stringify(
                payload,
                undefined,
                2
            )}`
        );

        expect(() => unrestify(endpoint, payload, sampleSpec)).not.toThrow();
        console.log(
            `Unrestified output:\nBody: ${JSON.stringify(payload, undefined, 2)}`
        );

        expect(payload).toEqual(getSample2());
    });
});