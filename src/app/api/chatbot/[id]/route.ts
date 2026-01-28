import { NextRequest, NextResponse } from "next/server";
import { createMessage, getMessage, sanitizeMessage } from "./utils";

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const body = await request.json();
        console.log("Body:", body);
        const message = sanitizeMessage(body.message);
        console.log("Message:", message);
        const { id: conversationId } = await params;
        console.log("Conversation ID:", conversationId);
        if (!conversationId) {
            return NextResponse.json(
                { message: "Conversation ID is required" },
                { status: 400 }
            );
        }

        const response = await createMessage(conversationId, message);

        console.log(response);
        let messageResponse = await getMessage(conversationId, response.id);

        while (messageResponse.answers[0].status !== "completed") {
            if (messageResponse.answers[0].status === "failed") {
                return NextResponse.json(
                    { message: "Error processing request" },
                    { status: 500 }
                );
            }
            await new Promise(resolve => setTimeout(resolve, 300));
            messageResponse = await getMessage(conversationId, response.id);
            console.log("Waiting for answer...", messageResponse);
        }

        console.log("Answer received:", messageResponse);

        return NextResponse.json({
            message: messageResponse.answers[0].content ?? "No answer received"
        });
    } catch (error) {
        return NextResponse.json(
            { message: "Error processing request" },
            { status: 500 }
        );
    }
}
    // TODO: Implement external API call to send message
    // Example structure:
    // const response = await fetch(`${BASE_URL}/conversations/${conversationId}/messages`, {
    //     method: 'POST',
    //     headers: {
    //         'Authorization': `Bearer ${API_KEY}`,
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ message }),
    // });
    // const data = await response.json();
    // return NextResponse.json({ message: data.response });
