import { Router, Request, Response } from 'express';
import { celebrate, Joi } from 'celebrate';
import SequelizeLoader from '../../loaders/sequelize';
import UserModel from '../../db/models/user.js';

const route = Router();
const sequlize = SequelizeLoader();
const User = UserModel(sequlize);

export default async (app: Router) => {
  app.use('/login', route);
  route.get('/', async (req: Request, res: Response) => {
    const user = await User.findAll();
    res.send(user);
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
      const user = await User.findOne({
        where: {
          email: email,
        },
      });
      res.json(user).status(200).end();
    },
  );
};
