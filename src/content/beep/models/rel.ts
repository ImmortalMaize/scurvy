import { RelationshipNodeProperties } from "neode"

export const made: RelationshipNodeProperties = {
    type: "relationship",
    target: "User",
    relationship: "MADE",
    direction: "in",
    eager: true
}

export const submitted: RelationshipNodeProperties = {
    type: "relationship",
    target: "Sheet",
    relationship: "SUBMITTED_TO",
    direction: "out",
    properties: {
        caption: "string"
    },
}

export const based: RelationshipNodeProperties = {
    type: "relationship",
    target: "Sauce",
    relationship: "BASED_ON",
    direction: "out",
    properties: {
        type: "string",
    },
}

export const liked: RelationshipNodeProperties = {
    type: "relationship",
    target: "Sauce",
    relationship: "LIKED",
    direction: "in",
}