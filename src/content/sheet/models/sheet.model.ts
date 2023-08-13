import { RelationshipNodeProperties, SchemaObject } from "neode";
import { submitted } from "./rel";
import { Content } from "src/database";
export interface SheetDto {
    name: string
}

export interface SheetInterface extends Content, SheetDto {
    submitted: RelationshipNodeProperties,
}

export const Sheet = {
    name: {
        type: "string",
        unique: true,
        required: true,
        index: true,
        primary: true,
    },
    submitted
} as SchemaObject