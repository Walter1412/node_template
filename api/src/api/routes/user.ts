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
  /**
   * @typedef Signin
   * @property {string} email.required - Some email or phone - eg: eerwrewrwr@example.com
   * @property {string} password.required - Some password - eg: adsfafafaf
   */
  /**
   * This function comment is parsed by doctrine
   * @route POST /user/signin
   * @group User - Operations about user
   * @param {Signin.model} content.body.required - the new point
   * @returns {object} 200 - An array of user info
   * @returns {Error}  default - Unexpected error
   */
  route.post(
    '/signin',
    celebrate({
      body: Joi.object({
        email: Joi.string().required().email(),
        password: Joi.string().required(),
      }),
    }),
    async (req: Request, res: Response) => {
      try {
        const { body } = req;
        const { email, password } = body;

        const { token } = await auth.signIn(email, password);
        res.json(result.sucess()(token)).status(200).end();
      } catch (error) {
        res.json(result.fail()(error));
      }
    },
  );
  /**
   * @typedef Signup
   * @property {string} firstName.required - Some email or phone - eg: TestFirstName
   * @property {string} lastName.required - Some password - eg: TestLastName
   * @property {string} email.required - Some email or phone - eg: test@example.com
   * @property {string} password.required - Some password - eg: 123456
   */
  /**
   * This function comment is parsed by doctrine
   * @route POST /user/signup
   * @group User - Operations about user
   * @param {Signup.model} content.body.required - the new point
   * @returns {object} 200 - An array of user info
   * @returns {Error}  default - Unexpected error
   */

  route.post(
    '/signup',
    celebrate({
      body: Joi.object({
        name: Joi.string(),
        account: Joi.string().required().email(),
        password: Joi.string().required(),
      }),
    }),
    async (req: Request, res: Response) => {
      try {
        const { body } = req;
        const { name, account, password } = body;
        const { createUserAccount } = await auth.signUp({ name, account, password });
        res.json(result.sucess()(createUserAccount)).status(200).end();
      } catch (error) {
        res.json(result.fail()(error.errors[0].message));
      }
    },
  );
};
