import {RelationshipNodeProperties, SchemaObject} from "neode";
import { made, likedBeep } from './rel';
import { Content } from "src/database";

export interface UserDto {
    discordId: string
}

export interface UserInterface extends Content, UserDto {
    made: RelationshipNodeProperties
}

export const User = {
    discordId: {
        type: "string",
        unique: true,
        required: true,
        index: true,
        primary: true,
    },
    username: {
        type: "string",
        index: true
    },
    made,
    likedBeep
} as SchemaObject



