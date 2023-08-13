import { RelationshipNodeProperties, SchemaObject } from "neode";
import { based } from './rel';
import { Content } from "src/database";

export interface SauceDto {
    sauce: string,
}
export interface SauceInterface extends Content, SauceDto {
    based: RelationshipNodeProperties
}

export const Sauce = {
    sauce: {
        type: "string",
        primary: true,
        required: true,
        index: true
    },
    based   
} as SchemaObject