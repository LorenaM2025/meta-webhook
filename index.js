const express = require("express");
const app = express();

app.use(express.json());

// 👉 Definís acá el mismo token que pusiste en Meta
const VERIFY_TOKEN = "PruebaBNI";

// Verificación de webhook (GET)
app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  // Meta espera exactamente esto:
  // mode === 'subscribe' y token que coincida
  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    console.log("WEBHOOK_VERIFIED");
    res.status(200).send(challenge);
  } else {
    console.log("WEBHOOK_VERIFICATION_FAILED", { mode, token });
    res.sendStatus(403);
  }
});

// Recepción de eventos (POST)
app.post("/webhook", (req, res) => {
  console.log("EVENTO RECIBIDO:", JSON.stringify(req.body, null, 2));
  res.sendStatus(200);
});

// Railway usa la variable de entorno PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Webhook corriendo en puerto ${PORT}`));

