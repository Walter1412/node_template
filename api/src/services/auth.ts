import SequelizeLoader from '../loaders/sequelize';
import { Sequelize, Model } from 'sequelize';
import Logger from '../loaders/logger';
import jwt from 'jsonwebtoken';
import argon2 from 'argon2';
import { v1 as uuidv1 } from 'uuid';
import UserAccountModel from '../db/models/userAccount.js';
import UserVerificationModel from '../db/models/UserVerification.js';
import config from '../config/index';
import { randomBytes, Certificate } from 'crypto';
import { IUserAccount, IUserAccountInputDTO } from '../interfaces/IUserAccount';
import { IUserVerification } from '../interfaces/IUserVerification';

export default class Auth {
  private UserAccount: Model;
  private UserVerification: Model;
  private logger: any;
  private sequelize: Sequelize;
  constructor() {
    this.sequelize = SequelizeLoader();
    this.UserAccount = UserAccountModel(this.sequelize);
    this.UserVerification = UserVerificationModel(this.sequelize);
    this.logger = Logger;
  }
  async signUp(
    userAccountInputDTO: IUserAccountInputDTO,
  ): Promise<{ createUserAccount: IUserAccount; createUserVerification: IUserVerification }> {
    const t = await this.sequelize.transaction();
    try {
      const salt = randomBytes(32);
      const hashedPassword = await argon2.hash(userAccountInputDTO.password, { salt });
      this.logger.silly('Creating user db record');

      const createUserAccount = await this.UserAccount.create(
        {
          ...userAccountInputDTO,
          no: uuidv1(),
          salt: salt.toString('hex'),
          password: hashedPassword,
        },
        { transaction: t },
      );

      const createUserVerification = await this.UserVerification.create(
        {
          userAccountId: createUserAccount.id,
        },
        { transaction: t },
      );
      await t.commit();

      return { createUserAccount, createUserVerification };
    } catch (error) {
      this.logger.error(error);
      await t.rollback();
      throw error;
    }
  }
  async signIn(email: string, password: string): Promise<{ token?: string }> {
    try {
      const userRecord = await this.UserAccount.findOne({
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
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
  private generateToken(user: IUserAccount) {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 60);
    this.logger.silly(`Sign JWT for userId: ${user._id}`);
    return jwt.sign(
      {
        _id: user._id, // We are gonna use this in the middleware 'isAuth'
        email: user.account,
        exp: exp.getTime() / 1000,
      },
      config.jwtSecret,
    );
  }
}
