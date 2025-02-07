import { Content } from "src/database";
import { critiqued, submitted } from "./rel"
import { SchemaObject } from "neode";
export interface CreqDto {
    discordId: string
}

export interface CreqInterface extends Content, CreqDto {

}

export const Creq: SchemaObject = {
    discordId: {
        type: "string",
        unique: true,
        required: true,
        indexed: true,
        primary: true
    },
    submitted,
    critiqued
}