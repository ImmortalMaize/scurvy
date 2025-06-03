import { RelationshipNodeProperties } from "neode"

export const submittedCreq: RelationshipNodeProperties = {
    type: "relationship",
    target: "Critique_Request",
    relationship: "SUBMITTED",
    direction: "out",
    properties: {
        tags: "string"
    }
}

export const made: RelationshipNodeProperties = {
    type: "relationship",
    target: "Beep",
    relationship: "MADE",
    direction: "out",
}

export const likedBeep: RelationshipNodeProperties = {
    type: "relationship",
    target: "Sauce",
    relationship: "LIKED",
    direction: "out",
}

export const relationships: Array<RelationshipNodeProperties> = [submittedCreq, made, likedBeep]