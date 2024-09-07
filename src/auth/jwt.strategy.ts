import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '../user/user.service';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'SECRET_KEY', // Assurez-vous que cette clé correspond à celle utilisée pour signer les tokens
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.userService.findUserById(payload.sub);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user; // L'utilisateur sera attaché à req.user
  }
}