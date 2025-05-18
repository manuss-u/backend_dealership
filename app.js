import express from 'express';
import userRoutes from './routes/user.routes.js';

const app = express();
app.use(express.json());
// Middleware to console log the request method and URL
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', userRoutes);

export default app;