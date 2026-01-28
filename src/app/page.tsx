'use client';

import CloudConfigurator from "../components/CloudConfigurator";
import ChatbotPanel from "../components/ChatbotPanel";
import { useState } from "react";
import { Drawer, DrawerContent, Button } from "../ods";
import { DRAWER_POSITION } from "@ovhcloud/ods-react";
import styles from "./page.module.css";

export default function Home() {
  const [chatOpen, setChatOpen] = useState(true);

  return (
    <div className={styles.page}>
      <main
        className={styles.main}
        style={{
          height: "calc(100vh - 2rem)",
          position: "relative",
        }}
      >
        <div style={{ height: "100%", overflow: "auto" }}>
          <CloudConfigurator />
        </div>

        <div
          style={{
            position: "fixed",
            right: 16,
            bottom: 16,
            zIndex: 50,
          }}
        >
          <Button
            color="primary"
            variant="default"
            onClick={() => setChatOpen((o) => !o)}
          >
            {chatOpen ? "Hide Chatbot" : "Show Chatbot"}
          </Button>
        </div>

        <Drawer open={chatOpen} onOpenChange={({ open }) => setChatOpen(open)}>
          <DrawerContent
            position={DRAWER_POSITION.right}
            style={{
              width: "min(480px, 100vw)",
              height: "100vh",
              overflow: "hidden",
              boxShadow: "-2px 0 8px rgba(0,0,0,0.08)",
            }}
          >
            <div
              style={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <ChatbotPanel />
            </div>
          </DrawerContent>
        </Drawer>
      </main>
    </div>
  );
}
