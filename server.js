import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';

// Import API handlers
import chatHandler from './api/chat.js';
import emailDraftHandler from './api/email-draft.js';
import businessAnalysisHandler from './api/business-analysis.js';
import caseStudyHandler from './api/generate-case-study.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// API routes
app.post('/api/chat', chatHandler);
app.post('/api/email-draft', emailDraftHandler);
app.post('/api/business-analysis', businessAnalysisHandler);
app.post('/api/generate-case-study', caseStudyHandler);

// Serve static files from dist directory
app.use(express.static(path.join(__dirname, 'dist')));

// Handle React Router - send all non-API requests to index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`✅ Digital Helper server running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT signal received: closing HTTP server');
  process.exit(0);
});
