import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  // Méthode pour valider l'utilisateur pendant la connexion
  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (user && await bcrypt.compare(pass, user.mot_de_passe)) {
      const { mot_de_passe, ...result } = user.toObject();
      return result;
    }
    return null;
  }

  // Méthode pour générer un token JWT
  async login(user: any) {
    const payload = { email: user.email, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload, { expiresIn: '1h' }),
      refresh_token: this.jwtService.sign(payload, { expiresIn: '365d' }),
    };
  }
}
