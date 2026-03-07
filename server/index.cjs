/* Minimal Express server to create Razorpay orders (CommonJS) */
require("dotenv").config({ path: ".env.local" });
const express = require("express");
const cors = require("cors");
const Razorpay = require("razorpay");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());

const key_id = (process.env.RAZORPAY_KEY_ID || "").trim();
const key_secret = (process.env.RAZORPAY_KEY_SECRET || "").trim();

app.get("/", (_req, res) => {
  res.json({
    ok: true,
    service: "razorpay-api",
    endpoints: ["/api/health", "/api/create-order"],
  });
});

if (!key_id || !key_secret) {
  console.warn("[server] Missing RAZORPAY_KEY_ID or RAZORPAY_KEY_SECRET. Order creation will fail.");
}

const rzp =
  key_id && key_secret
    ? new Razorpay({
        key_id,
        key_secret,
      })
    : null;

app.get("/api/health", (_req, res) => {
  res.json({
    ok: true,
    hasKey: Boolean(key_id),
    hasSecret: Boolean(key_secret),
    keyIdSuffix: key_id ? key_id.slice(-6) : null,
  });
});

app.post("/api/create-order", async (req, res) => {
  try {
    if (!rzp) {
      return res.status(500).json({ error: "Razorpay not configured" });
    }
    const { amount, currency = "INR", notes = {} } = req.body || {};
    if (!amount || amount < 1) {
      return res.status(400).json({ error: "Invalid amount" });
    }
    try {
      // Primary: use official SDK
      const order = await rzp.orders.create({
        amount,
        currency,
        payment_capture: 1,
        receipt: `order_${Date.now()}`,
        notes,
      });
      return res.json(order);
    } catch (sdkErr) {
      // Fallback: direct REST call with Basic auth for more transparent errors
      const resp = await axios.post(
        "https://api.razorpay.com/v1/orders",
        {
          amount,
          currency,
          payment_capture: 1,
          receipt: `order_${Date.now()}`,
          notes,
        },
        {
          auth: {
            username: key_id,
            password: key_secret,
          },
          headers: { "Content-Type": "application/json" },
          timeout: 15000,
        },
      );
      return res.json(resp.data);
    }
  } catch (err) {
    try {
      const status = err?.response?.status;
      const data = err?.response?.data;
      const msg =
        (data && (data.description || data.error || data.message)) ||
        (err && err.error && err.error.description) ||
        err?.message;
      console.error(
        "[server] create-order error:",
        JSON.stringify({ status, message: msg, data }, null, 2),
      );
      return res.status(500).json({ error: "Failed to create order", status, message: msg, data });
    } catch {
      return res.status(500).json({ error: "Failed to create order" });
    }
  }
});

const PORT = process.env.PORT || 8787;
app.listen(PORT, () => {
  console.log(`[server] API listening on http://localhost:${PORT}`);
});
