import { API_KEY, CONVERSATION_URL, DEFAULT_ASSISTANT_NAME, DEFAULT_METADATA, DEFAULT_TITLE } from "@/definitions/constants/chatbot.const";

export const createConversation = async () => {
    const conversationId = Date.now();
    const response = await fetch(CONVERSATION_URL, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "assistantName": DEFAULT_ASSISTANT_NAME,
            "title": `${DEFAULT_TITLE} ${conversationId}`,
            "metadata": DEFAULT_METADATA
        }),
    });
    return response.json();
}