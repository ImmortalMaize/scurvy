import {RelationshipNodeProperties, SchemaObject} from "neode";
import { made } from './rel';

export interface User {
    sauce: string,
    made: RelationshipNodeProperties
}

export default {
    discordId: {
        type: "number",
        unique: true,
        required: true,
        index: true,
        primary: true,
    },
    made
} as SchemaObject