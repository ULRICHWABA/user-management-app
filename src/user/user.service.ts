import { Injectable, NotFoundException, UnauthorizedException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from './user.schema';
import { CreateUserDto } from '../auth/create-user.dto';
import { JwtPayload } from '../auth/jwt-payload.interface'; // Assurez-vous que ce chemin est correct

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.findByEmail(createUserDto.email);
    if (existingUser) {
      throw new ConflictException('Un utilisateur avec cet email existe déjà');
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(createUserDto.mot_de_passe, salt);

    const createdUser = new this.userModel({
      ...createUserDto,
      mot_de_passe: hashedPassword,
    });
    return createdUser.save();
  }

  async validate(payload: JwtPayload): Promise<User> {
    const user = await this.findUserById(payload.sub);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }

  async findUserById(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException(`Utilisateur avec ID ${id} non trouvé`);
    }
    return user;
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findByDate(annee?: string, mois?: string, jour?: string): Promise<User[]> {
    const matchConditions: any = [];

    if (annee) matchConditions.push({ $eq: [{ $year: '$createdAt' }, parseInt(annee)] });
    if (mois) matchConditions.push({ $eq: [{ $month: '$createdAt' }, parseInt(mois)] });
    if (jour) matchConditions.push({ $eq: [{ $dayOfMonth: '$createdAt' }, parseInt(jour)] });

    return this.userModel.aggregate([
      {
        $match: matchConditions.length > 0 ? { $expr: { $and: matchConditions } } : {},
      },
      {
        $project: {
          createdAt: 1,
          nom: 1,
          prenom: 1,
          email: 1,
        },
      },
    ]).exec();
  }
}