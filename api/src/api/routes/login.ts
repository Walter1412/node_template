import { Router, Request, Response } from 'express';
import { celebrate, Joi } from 'celebrate';
import Auth from '../../services/auth';
const route = Router();
const auth = new Auth();
export default async (app: Router) => {
  app.use('/login', route);
  route.get('/', async (req: Request, res: Response) => {
    res.send('Hello');
  });
  route.post(
    '/',
    celebrate({
      body: Joi.object({
        name: Joi.string(),
        email: Joi.string().required(),
        password: Joi.string().required(),
      }),
    }),
    async (req: Request, res: Response) => {
      const { body } = req;
      const { email } = body;
      // const user = await User.findOne({
      //   where: {
      //     email: email,
      //   },
      // });
      console.log(auth.signIn(email));
      res.json('Hello').status(200).end();
    },
  );
};
