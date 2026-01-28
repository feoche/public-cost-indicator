export type ConversationCreationRequest = {
    assistantName: string;
    title: string;
    metadata: Record<string, string>;
}

export type ConversationCreationResponse = {
    "id": string,
    "createdAt": string,
    "updatedAt": string,
    "title": string,
    "assistantName": string,
    "metadata": Record<string, string>,
    "datasetIds": [
        string
    ],
    "isWebSearchEnabled": [
        boolean
    ]
}