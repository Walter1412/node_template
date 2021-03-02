import { Router, Request, Response } from 'express';
import { celebrate, Joi } from 'celebrate';
import Auth from '../../services/auth';
import Result from '../../services/result';
const route = Router();
const auth = new Auth();
const result = new Result();
export default async (app: Router) => {
  app.use('/user', route);
  route.get('/', async (req: Request, res: Response) => {
    res.send('Hello');
  });
  route.post(
    '/singin',
    celebrate({
      body: Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required(),
      }),
    }),
    async (req: Request, res: Response) => {
      const { body } = req;
      const { email, password } = body;

      await auth.signIn(email, password);
      res.json(result.sucess()).status(200).end();
    },
  );
  route.post(
    '/signup',
    celebrate({
      body: Joi.object({
        firstName: Joi.string(),
        lastName: Joi.string(),
        email: Joi.string().required(),
        password: Joi.string().required(),
      }),
    }),
    async (req: Request, res: Response) => {
      const { body } = req;
      const { firstName, lastName, email, password } = body;
      const { user } = await auth.signUp({ firstName, lastName, email, password });

      res.json(result.sucess()(user)).status(200).end();
    },
  );
};
