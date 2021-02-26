import SequelizeLoader from '../loaders/sequelize';
import { randomBytes } from 'crypto';
import { Model } from '@types/sequelize';
import UserModel from '../db/models/user.js';
import argon2 from 'argon2';
import { IUser, IUserInputDTO } from '../interfaces/IUser';
import Logger from '../loaders/logger';

export default class Auth {
  private User: Model;
  private logger: any;
  constructor() {
    const sequelize = SequelizeLoader();
    this.User = UserModel(sequelize);
    this.logger = Logger;
  }
  async signUp(userInputDTO: IUserInputDTO): Promise<{ user: IUser }> {
    try {
      const salt = randomBytes(32);
      const hashedPassword = await argon2.hash(userInputDTO.password, { salt });
      this.logger.silly('Creating user db record');

      const user = await this.User.create({
        ...userInputDTO,
        salt: salt.toString('hex'),
        password: hashedPassword,
      });
      await user.save();
      return { user };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
  async signIn(email: string, password: string) {
    const userRecord = await this.User.findOne({
      where: {
        email,
      },
    });
    if (!userRecord) throw new Error('User not registered');
    this.logger.silly('Hashing password');

    return userRecord;
  }
  private generateToken(user) {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    /**
     * A JWT means JSON Web Token, so basically it's a json that is _hashed_ into a string
     * The cool thing is that you can add custom properties a.k.a metadata
     * Here we are adding the userId, role and name
     * Beware that the metadata is public and can be decoded without _the secret_
     * but the client cannot craft a JWT to fake a userId
     * because it doesn't have _the secret_ to sign it
     * more information here: https://softwareontheroad.com/you-dont-need-passport
     */
    this.logger.silly(`Sign JWT for userId: ${user._id}`);
    return jwt.sign(
      {
        _id: user._id, // We are gonna use this in the middleware 'isAuth'
        role: user.role,
        name: user.name,
        exp: exp.getTime() / 1000,
      },
      config.jwtSecret,
    );
  }
}
