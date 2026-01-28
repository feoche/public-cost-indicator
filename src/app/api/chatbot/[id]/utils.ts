import { API_KEY } from "@/definitions/constants/chatbot.const";
import { getMessageEndpoint, getSpecificMessageEndpoint } from "@/definitions/constants/conversation.const";
import type { MessageResponse } from "@/definitions/types/conversation";

export const createMessage = async (conversationId: string, message: string) => {
    const response = await fetch(getMessageEndpoint(conversationId), {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: message }),
    });
    return response.json();
}

export const getMessage = async (conversationId: string, messageId: string): Promise<MessageResponse> => {
    const response = await fetch(getSpecificMessageEndpoint(conversationId, messageId), {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${API_KEY}`,
        },
    });
    return response.json();
}

export const sanitizeMessage = (message?: string) => {
    if (!message || message.length === 0) {
        throw new Error('Message cannot be empty');
    }
    if (message.length > 5000) {
        throw new Error('Message cannot be longer than 1000 characters');
    }
    return message.trim();
}