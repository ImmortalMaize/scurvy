import { SchemaObject, RelationshipNodeProperties } from "neode";
import { based, made, submitted } from "./rel";

export interface Beep {
    sauce: string,
    made: RelationshipNodeProperties,
    submitted: RelationshipNodeProperties
    based: RelationshipNodeProperties
}
export default {
    sauce: {
        type: "string",
        unique: true,
        required: true,
        index: true,
        primary: true,
        uri: true
    },
    made,
    submitted,
    based
} as SchemaObject