
export type GraphQLScalar = string | number | boolean | null;
export type GraphQLArgType = GraphQLScalar | {[key: string]: GraphQLArgType};

export interface GraphQLArg {
    name: string;
    value: GraphQLArgType;
}

export interface GraphQLField {
    name: string;
    args: GraphQLArg[];
}

export interface GraphQLContext {
    args: GraphQLArg[];
    fields: GraphQLField[]; // ? convert to a map?
}