import { RelationshipNodeProperties } from "neode";

export const based: RelationshipNodeProperties = {
    type: "relationship",
    target: "Beep",
    relationship: "BASED_ON",
    direction: "in",
    properties: {
        type: "string",
    }
}

