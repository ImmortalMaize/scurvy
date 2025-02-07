import { RelationshipNodeProperties } from "neode";

export const submit: RelationshipNodeProperties = {
    type: "relationship",
    target: "User",
    relationship: "SUBMITTED",
    direction: "in",
    properties: {
        tags: "string"
    }
}

export const critiqued: RelationshipNodeProperties = {
    type: "relationship",
    target: "Critique_Request",
    relationship: "CRITIQUED",
    direction: "out",
    properties: {
        discordId: "string"
    }
}