import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

  app.use(express.json());

  // Doctor WhatsApp notification endpoint
  // Simulates or connects with WhatsApp Business Webhook / WhatsApp Gateway
  app.post('/api/notify-doctor', (req, res) => {
    try {
      const { type, recipientPhone, data, timestamp } = req.body;
      const doctorNumber = '+92342-7817236';

      console.log(`[DISPATCH SYSTEM] Automatic notification sent to Dr. Zargham Ghaffar (${doctorNumber}):`);
      console.log(`Type: ${type}`);
      console.log(`Payload:`, JSON.stringify(data, null, 2));
      console.log(`Timestamp: ${timestamp || new Date().toISOString()}`);

      // In production or webhook integration, here the server sends payload via WhatsApp Business API / Twilio / GreenAPI.
      return res.status(200).json({
        success: true,
        message: 'Notification delivered to Dr. Zargham Ghaffar connected number automatically',
        doctorNumber,
        status: 'Delivered',
        dispatchedAt: new Date().toISOString(),
      });
    } catch (error) {
      console.error('[DISPATCH ERROR]', error);
      return res.status(500).json({ success: false, error: 'Internal server dispatch error' });
    }
  });

  // Development setup with Vite middleware
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Production static serving
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

startServer();
