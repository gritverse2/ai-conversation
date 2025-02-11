import { Configuration, OpenAIApi } from "openai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  // Inițializăm OpenAI API
  const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(config);

  try {
    // Generăm o conversație între cei doi AI
    const response = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are an AI wife having a conversation about love and relationships." },
        { role: "user", content: "Start a conversation with your AI husband about love." },
      ],
    });

    const aiConversation = response.data.choices[0].message.content;

    // Trimitem conversația generată ca răspuns
    return res.status(200).json({ conversation: aiConversation });

  } catch (error) {
    console.error("OpenAI API Error:", error);
    return res.status(500).json({ message: "Error generating conversation" });
  }
}
