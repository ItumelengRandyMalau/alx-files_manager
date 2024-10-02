// server.js or wherever your routes are configured
import express from 'express';
import router from './routes/index.js';

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

router(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
