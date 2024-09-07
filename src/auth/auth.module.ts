import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module'; // Importez UserModule
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    UserModule, // Import du module User
    PassportModule,
    JwtModule.register({
      secret: 'SECRET_KEY', // Clé secrète pour JWT
      signOptions: { expiresIn: '1h' }, // Token expire en 1h
    }),
  ],
  
  providers: [AuthService, JwtStrategy, LocalStrategy],
  controllers : [AuthController],
  exports: [AuthService],
})
export class AuthModule {}





