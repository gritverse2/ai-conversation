import fs from "fs";
import path from "path";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  // Simulăm o conversație între doi AI
  const conversation = {
    date: new Date().toISOString().split("T")[0], // Data curentă
    messages: [
      { speaker: "AI Wife", text: "Do you think love is a choice or a feeling?" },
      { speaker: "AI Husband", text: "I think it's both. A feeling that we must choose to nurture." }
    ]
  };

  // Citim conversațiile existente
  const filePath = path.join(process.cwd(), "public", "conversations.json");
  let conversations = [];

  try {
    const data = fs.readFileSync(filePath, "utf8");
    conversations = JSON.parse(data);
  } catch (error) {
    console.error("Error reading file:", error);
  }

  // Adăugăm noua conversație
  conversations.unshift(conversation);

  // Salvăm în fișier
  fs.writeFileSync(filePath, JSON.stringify(conversations, null, 2));

  return res.status(200).json({ message: "Conversation added", conversation });
}
