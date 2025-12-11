const express = require("express");
const app = express();

app.use(express.json());

// Verificación de webhook (GET)
app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode && token === "PruebaBNI") {
    // Token correcto → devolver el challenge para que Meta lo valide
    res.status(200).send(challenge);
  } else {
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

