import { BASE_URL } from "./chatbot.const";

export const getMessageEndpoint = (conversationId: string) => `${BASE_URL}/conversations/${conversationId}/messages`;

export const getSpecificMessageEndpoint = (conversationId: string, messageId: string) => `${BASE_URL}/conversations/${conversationId}/messages/${messageId}`;