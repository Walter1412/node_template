import { Router } from 'express';
import login from './routes/login';

// guaranteed to get dependencies
export default () => {
  const app = Router();
  login(app);

  return app
}