import SequelizeLoader from '../loaders/sequelize';
import Logger from '../loaders/logger';
import jwt from 'jsonwebtoken';
import argon2 from 'argon2';
import UserModel from '../db/models/user.js';
import config from '../config/index';
import { randomBytes } from 'crypto';
import { IUser, IUserInputDTO } from '../interfaces/IUser';

export default class Auth {
  private User: any;
  private logger: any;
  constructor() {
    const sequelize = SequelizeLoader();
    this.User = UserModel(sequelize);
    this.logger = Logger;
  }
  async signUp(userInputDTO: IUserInputDTO): Promise<{ createUser: IUser }> {
    try {
      const salt = randomBytes(32);
      const hashedPassword = await argon2.hash(userInputDTO.password, { salt });
      this.logger.silly('Creating user db record');

      const createUser = await this.User.create({
        ...userInputDTO,
        salt: salt.toString('hex'),
        password: hashedPassword,
      });

      return { createUser };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
  async signIn(email: string, password: string): Promise<{ token?: string }> {
    const userRecord = await this.User.findOne({
      where: {
        email,
      },
    });

    if (!userRecord) throw new Error('User not registered');
    this.logger.silly('Checking password');
    const validPassword = await argon2.verify(userRecord.password, password);

    if (validPassword) {
      this.logger.silly('Password is valid!');
      this.logger.silly('Generating JWT');
      const token = this.generateToken(userRecord);
      return { token };
    } else {
      throw new Error('Invalid Password');
    }
    return userRecord;
  }
  private generateToken(user: IUser) {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 60);
    this.logger.silly(`Sign JWT for userId: ${user._id}`);
    return jwt.sign(
      {
        _id: user._id, // We are gonna use this in the middleware 'isAuth'
        name: user.name,
        exp: exp.getTime() / 1000,
      },
      config.jwtSecret,
    );
  }
}
