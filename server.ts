import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

  app.use(express.json());

  app.post("/api/chat", async (req, res) => {
    try {
      const { history, message } = req.body;
      
      if (!process.env.GEMINI_API_KEY) {
        return res.status(500).json({ error: "Clé API Gemini non configurée sur le serveur." });
      }

      const ai = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });
      
      const chat = ai.chats.create({
        model: "gemini-3.6-flash",
        history: history || [],
        config: {
          systemInstruction: "Tu es un assistant virtuel amical de HardSoft Technologies, une agence de développement web et logiciel. Tu aides les visiteurs à comprendre nos services (logiciels sur mesure, sites web, applications SaaS, automatisation n8n, point de vente POS). Réponds de manière concise (max 3-4 phrases), professionnelle et chaleureuse. Si on te demande un devis, invite l'utilisateur à remplir le formulaire de contact ou à utiliser WhatsApp. Réponds en français ou en anglais selon la langue de l'utilisateur.",
        }
      });
      
      const response = await chat.sendMessage({ message });
      res.json({ text: response.text, role: "model" });
    } catch (error) {
      console.error("Erreur API Chat:", error);
      res.status(500).json({ error: "Désolé, je ne peux pas répondre pour le moment." });
    }
  });

  app.get("/api/dashboard/stats", (req, res) => {
    res.json({
      revenue: { total: "$12,450" },
      users: { active: "1,245" },
      projects: { new: "45" },
      conversionRate: "4.6%",
      revenueData: [
        { name: 'Jan', value: 4000 },
        { name: 'Fév', value: 3000 },
        { name: 'Mar', value: 5000 },
        { name: 'Avr', value: 2780 },
        { name: 'Mai', value: 6890 },
        { name: 'Juin', value: 8390 },
      ],
      usersData: [
        { name: 'Lun', value: 120 },
        { name: 'Mar', value: 200 },
        { name: 'Mer', value: 150 },
        { name: 'Jeu', value: 300 },
        { name: 'Ven', value: 250 },
        { name: 'Sam', value: 90 },
        { name: 'Dim', value: 40 },
      ]
    });
  });

  // Serve static files in production / fallback to index.html for SPA router
  if (process.env.NODE_ENV === "production") {
    const distPath = path.join(process.cwd(), "build");
    app.use(express.static(distPath));
    app.get("*all", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  } else {
    // Vite dev middleware for on-the-fly compiling during workspace editing
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
