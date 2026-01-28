import { NextRequest } from "next/server";
import { createMessage, getMessage, sanitizeMessage } from "./utils";

const DEFAULT_THINKING_MESSAGE = "Réfléchit à une solution pour vous...";

export async function POST(request: NextRequest, { params }: { '/params': { id: string } }) {
    try {
        const body = await request.json();
        const message = sanitizeMessage(body.message);
        const { id: conversationId } = await params;

        if (!conversationId) {
            return new Response(
                JSON.stringify({ error: "Conversation ID is required" }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }

        const response = await createMessage(conversationId, message);
        const messageId = response.id;

        // Create a ReadableStream for Server-Sent Events
        const stream = new ReadableStream({
            async start(controller) {
                const encoder = new TextEncoder();

                const sendEvent = (data: string) => {
                    controller.enqueue(encoder.encode(`data: ${data}\n\n`));
                };

                let previousContent = "";
                let messageResponse = await getMessage(conversationId, messageId);

                // Poll for updates
                while (messageResponse.answers[0].status !== "completed") {
                    if (messageResponse.answers[0].status === "failed") {
                        sendEvent(JSON.stringify({
                            type: "error",
                            message: "Erreur lors du traitement de la requête"
                        }));
                        controller.close();
                        return;
                    }

                    const currentContent = messageResponse.answers[0].content || "";
                    const status = messageResponse.answers[0].status;

                    // Send update if content changed or if we need to show default message
                    if (currentContent !== previousContent || (!currentContent && (status === "todo" || status === "doing"))) {
                        const displayContent = currentContent ||
                            (status === "todo" || status === "doing" ? DEFAULT_THINKING_MESSAGE : "");

                        sendEvent(JSON.stringify({
                            type: "content",
                            content: displayContent,
                            status: status
                        }));
                        previousContent = currentContent;
                    }

                    await new Promise(resolve => setTimeout(resolve, 300));
                    messageResponse = await getMessage(conversationId, messageId);
                }

                // Send final content
                const finalContent = messageResponse.answers[0].content || "Aucune réponse reçue";
                sendEvent(JSON.stringify({
                    type: "content",
                    content: finalContent,
                    status: "completed"
                }));

                // Send done event
                sendEvent(JSON.stringify({ type: "done" }));
                controller.close();
            },
        });

        return new Response(stream, {
            headers: {
                "Content-Type": "text/event-stream",
                "Cache-Control": "no-cache",
                "Connection": "keep-alive",
            },
        });
    } catch {
        return new Response(
            JSON.stringify({ error: "Error processing request" }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}
