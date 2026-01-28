export const API_KEY = process.env.NEXT_CHATBOT_TOKEN;
export const BASE_URL = process.env.NEXT_CHATBOT_BASE_URL;

export const CONVERSATION_URL = `${BASE_URL}/conversations`;
export const DEFAULT_ASSISTANT_NAME = "pci-bot-hackathon";
export const DEFAULT_TITLE = "My conversation about AI";
export const DEFAULT_METADATA = {
    "source": "web",
    "userId": "123"
};