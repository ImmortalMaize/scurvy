import { RelationshipNodeProperties, SchemaObject } from "neode";
import { submitted } from "./rel";

export interface Sheet {
    name: string,
    submitted: RelationshipNodeProperties,
}

export default {
    name: {
        type: "string",
        unique: true,
        required: true,
        index: true,
        primary: true,
    },
    submitted
} as SchemaObject