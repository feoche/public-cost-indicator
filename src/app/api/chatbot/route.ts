import { NextResponse } from 'next/server';
import { createConversation } from './utils';
import type { ConversationCreationResponse } from '@/definitions/types/chatbot';

// Create a new conversation
export async function POST() {
    try {
        const response = await createConversation();
        const data: ConversationCreationResponse = response;
        return NextResponse.json({
            "conversationId": data.id
        });
    } catch {
        return NextResponse.json(
            { message: "Error processing request" },
            { status: 500 }
        );
    }
}

export async function GET() {
    return NextResponse.json(
        { message: "Method not allowed" },
        { status: 405 }
    );
}
