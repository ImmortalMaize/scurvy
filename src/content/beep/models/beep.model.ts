import { SchemaObject, RelationshipNodeProperties } from "neode";
import { based, made, submitted, likedBeep } from "./rel";
import { Content } from "src/database";

export interface BeepDto {
    sauce: string,
    discordId: string
    published: Date
}

export interface BeepInterface extends Content, BeepDto {
    made?: RelationshipNodeProperties,
    submitted?: RelationshipNodeProperties
    based?: RelationshipNodeProperties
}
export const Beep = {
    sauce: {
        type: "string",
        required: true,
        index: true,
        unique: true,
        uri: true
    },
    discordId: {
        type: "string",
        index: true,
        primary: true,
        unique: true
    },
    published: {
        type: 'date',
        required: true
    },
    made,
    submitted,
    based,
    likedBeep
} as SchemaObject