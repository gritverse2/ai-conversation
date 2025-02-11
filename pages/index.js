import { useEffect, useState } from "react";

export default function Home() {
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    fetch("/conversations.json")
      .then((res) => res.json())
      .then((data) => setConversations(data));
  }, []);

  return (
    <div style={{
      backgroundColor: "black",
      color: "green",
      fontFamily: "monospace",
      padding: "20px",
      minHeight: "100vh"
    }}>
      <h1>AI Conversation Terminal</h1>
      {conversations.length > 0 ? (
        conversations.map((conv, index) => (
          <div key={index} style={{ marginTop: "20px" }}>
            <h3>📅 {conv.date}</h3>
            {conv.messages.map((msg, i) => (
              <p key={i}><strong>{msg.speaker}:</strong> {msg.text}</p>
            ))}
          </div>
        ))
      ) : (
        <p>Loading conversations...</p>
      )}
    </div>
  );
}
