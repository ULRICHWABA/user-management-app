import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
  
    super({ usernameField: 'email', passwordField: 'email' });  
  }

  
  async validate(email: string): Promise<any> {
    const user = await this.authService.validateUserByEmail(email); 
    if (!user) {
      throw new UnauthorizedException('Utilisateur non trouvé');
    }
    return user;  // Attach the user to req.user
  }
}
