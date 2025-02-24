import express from 'express';
import { router } from './routes';


const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    console.log(`Incoming Request: ${req.method} ${req.url}`);
    next();
  });
  
// Routes
app.use('/api/v1/', router);



export default app;