import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const API_KEY = "bzRIF2bVse40tMQqXHvget0H37AZmUORQ2446WKu6ePR5Ix49mnVZiknWiO7c2mb";

app.post('/create-invoice', async (req, res) => {
  const { amount, currency } = req.body;

  try {
    const response = await fetch("https://plisio.net/api/v1/invoices/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        api_key: API_KEY,
        amount: amount,
        currency: currency || "RUB",
        order_number: "RB6-" + Date.now(),
        order_name: "Redmi Buds 6",
        success_url: "https://romantic8868.github.io/-redmi-buds6/success.html",
        failed_url: "https://romantic8868.github.io/-redmi-buds6/failed.html",
        callback_url: "https://romantic8868.github.io/-redmi-buds6/callback"
      })
    });

    const data = await response.json();
    res.json(data.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Помилка при створенні інвойсу" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});