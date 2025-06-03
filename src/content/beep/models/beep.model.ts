import { SchemaObject, RelationshipNodeProperties } from "neode";
import { based, made, submitted, liked } from "./rel";
import { Content } from "src/database";


export interface DiscordBeepDto {
    sauce?: string,
    discordId: string,
    title?: string,
    blurb?: string,
    published?: number
}

export interface BeepDto {
    sauce?: string,
    discordId: string,
    title?: string,
    blurb?: string,
    published?: number,
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
    },
    discordId: {
        type: "string",
        index: true,
        primary: true,
        unique: true
    },
    published: {
        type: 'date',
        required: true,
        default: () => new Date()
    },
    title: {
        type: 'string',
        required: false,
        default: "untitled"
    },
    made,
    submitted,
    based,
    liked
} as SchemaObject