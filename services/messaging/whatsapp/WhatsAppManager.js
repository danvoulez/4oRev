import makeWASocket, { DisconnectReason, useMultiFileAuthState } from "@whiskeysockets/baileys";
import { Boom } from "@hapi/boom";
import express from "express";

const app = express();
app.use(express.json());

let sock;

async function connectToWhatsApp() {
    const { state, saveCreds } = await useMultiFileAuthState("baileys_auth");

    sock = makeWASocket({
        auth: state,
        printQRInTerminal: true
    });

    sock.ev.on("creds.update", saveCreds);
    sock.ev.on("connection.update", ({ connection, lastDisconnect }) => {
        if (connection === "close") {
            const shouldReconnect = lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;
            if (shouldReconnect) {
                connectToWhatsApp();
            }
        }
    });

    sock.ev.on("messages.upsert", async (message) => {
        const msg = message.messages[0];
        if (!msg.key.fromMe && msg.message?.conversation) {
            console.log("📩 Mensagem Recebida: ", msg.message.conversation);
            await sock.sendMessage(msg.key.remoteJid, { text: "Vox recebeu sua mensagem!" });
        }
    });
}

connectToWhatsApp();

app.post("/api/whatsapp/send", async (req, res) => {
    const { number, message } = req.body;
    if (!number || !message) return res.status(400).json({ error: "Número e mensagem são obrigatórios" });

    try {
        await sock.sendMessage(`${number}@s.whatsapp.net`, { text: message });
        res.json({ status: "Mensagem enviada com sucesso!" });
    } catch (error) {
        res.status(500).json({ error: "Erro ao enviar mensagem", details: error });
    }
});

app.listen(3001, () => console.log("📡 WhatsApp API rodando na porta 3001"));