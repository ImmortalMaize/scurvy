import { RelationshipNodeProperties, SchemaObject } from "neode";
import { based } from './rel';
export interface Sauce {
    sauce: string,
    based: RelationshipNodeProperties
}

export default {
    sauce: "string",
    based   
} as SchemaObject