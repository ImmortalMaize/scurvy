import { RelationshipNodeProperties } from "neode"

export const made: RelationshipNodeProperties = {
    type: "relationship",
    target: "User",
    relationship: "MADE",
    direction: "in"
}

export const submitted: RelationshipNodeProperties = {
    type: "relationship",
    target: "Sheet",
    relationship: "SUBMITTED_TO",
    direction: "out"
}

export const based: RelationshipNodeProperties = {
    type: "relationship",
    target: "Beep",
    relationship: "BASED_ON",
    direction: "out",
    properties: {
        type: "string",
    }
}