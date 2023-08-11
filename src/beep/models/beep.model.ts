import { SchemaObject, RelationshipNodeProperties } from "neode";
import { made, submitted } from "./rel";

export interface Beep {
    sauce: string,
    made: RelationshipNodeProperties,
    submitted: RelationshipNodeProperties
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
    submitted
} as SchemaObject