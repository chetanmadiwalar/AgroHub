import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import path from 'path';
import { readdirSync } from 'fs';
import connectDB from './config/db.js';
import colors from 'colors';
import { notFound, errorHandler } from './middleware/errorMiddlware.js';
import { pathToFileURL } from 'url';

dotenv.config();

const app = express();

// Connect to DB
connectDB();

// Middlewares
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ limit: '5mb', extended: true }));

app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://chetanagrohub.netlify.app'
  ],
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type, Authorization'
}));

// Dynamic route loading
const routesDir = path.join(path.resolve(), './routes');
const routeFiles = readdirSync(routesDir);

for (const route of routeFiles) {
  const routePath = path.join(routesDir, route);
  const routeModule = await import(pathToFileURL(routePath).href);
  app.use('/api/v1', routeModule.default);
}

// Static file serving
const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
app.use('/img', express.static(path.join(process.cwd(), 'public', 'img')));

// Paypal config
app.get('/api/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID));

// Root route
app.get('/', (req, res) => {
  res.send({
    activeStatus: true,
    error: false,
  });
});

// Error handlers
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// For serverless deployment (e.g., Vercel)
export default app;

// For local development
if (process.env.NODE_ENV !== 'production') {
  app.listen(
    PORT,
    () => console.log(`Server running ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold)
  );
}