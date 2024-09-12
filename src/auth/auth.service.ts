import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  // Valider l'utilisateur avec seulement l'email
  async validateUserByEmail(email: string): Promise<any> {
    const user = await this.userService.findByEmail(email);

    // Vérifie si l'utilisateur existe
    if (!user) {
      throw new UnauthorizedException('Utilisateur non trouvé');
    }
    return user;
  }

  // Méthode pour générer les tokens JWT
  async login(email: string) {
    const user = await this.validateUserByEmail(email);
  
    // Durées d'expiration en secondes
    const accessTokenExpiresIn = 3600; // 1 heure en secondes
    const refreshTokenExpiresIn = 365 * 24 * 60 * 60; // 365 jours en secondes
  
    // Générer les tokens
    const payload = { email: user.email, sub: user._id };
    const access_token = this.jwtService.sign(payload, { expiresIn: accessTokenExpiresIn });
    const refresh_token = this.jwtService.sign(payload, { expiresIn: refreshTokenExpiresIn });
  
    // Retourner les tokens avec les durées d'expiration
    return {
      message: `Access token expire dans ${accessTokenExpiresIn / 60} minutes et refresh token dans ${refreshTokenExpiresIn / (24 * 60 * 60)} jours.`,
      access_token,
      access_token_expires_in: accessTokenExpiresIn, // Durée d'expiration en secondes
      refresh_token,
      refresh_token_expires_in: refreshTokenExpiresIn, // Durée d'expiration en secondes
    };
  }
  
}
