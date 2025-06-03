import {RelationshipNodeProperties, SchemaObject} from "neode";
import { made, likedBeep, submittedCreq } from './rel';
import { Content } from "src/database";

export interface DiscordUserDto {
    discordId: string
    username: string
}

export interface UserDto {
    discordId: string
    username?: string
}

export interface UserInterface extends Content, UserDto {
    refreshToken?: string;
    accessToken?: string;
    made: RelationshipNodeProperties
}

export const User: SchemaObject = {
    discordId: {
        type: "string",
        unique: true,
        required: true,
        primary: true,
    },
    username: {
        type: "string",
    },
    made,
    likedBeep,
    submittedCreq
}



