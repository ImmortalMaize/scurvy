import { SchemaObject, RelationshipNodeProperties } from "neode";
import { based, made, submitted } from "./rel";
import { Content } from "src/database";

export interface BeepDto {
    sauce: string,
    discordId: string
}

export interface BeepInterface extends Content, BeepDto {
    made?: RelationshipNodeProperties,
    submitted?: RelationshipNodeProperties
    based?: RelationshipNodeProperties
}
export const Beep = {
    sauce: {
        type: "string",
        unique: true,
        required: true,
        index: true
    },
    discordId: {
        type: "string",
        unique: true,
        required: true,
        index: true,
        primary: true
    },
    made,
    submitted,
    based
} as SchemaObject