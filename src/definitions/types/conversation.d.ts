export type MessageCreationRequest = {
    content: string;
}

export type Answer = {
    id: string,
    createdAt: string,
    updatedAt: string,
    content: string,
    feedback: null,
    sources: [],
    duration: number,
    model: string,
    status: "todo" | "doing" | "completed" | "failed"
}

export type MessageResponse = {
    id: string,
    createdAt: string,
    updatedAt: string,
    content: string,
    answers: Answer[],
    conversationId: string
}
