import { RelationshipNodeProperties } from "neode"

export const made: RelationshipNodeProperties = {
    type: "relationship",
    target: "Beep",
    relationship: "MADE",
    direction: "out"
}

export const liked: RelationshipNodeProperties = {
    type: "relationship",
    target: "Sauce",
    relationship: "LIKED",
    direction: "out",
}