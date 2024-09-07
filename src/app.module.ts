import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './auth/jwt.strategy';
import { EventController } from './event/event.controller';
import { EventModule } from './event/event.module';
import { AppService } from './app.service';
import { AppController } from './app.controller';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'SECRET_KEY',
      signOptions: { expiresIn: '1h' },
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/projet_event_ulrich'),
    AuthModule,
    UserModule,
    EventModule,
  ],
  controllers: [AppController, EventController],
  providers: [AppService,JwtStrategy,],
})
export class AppModule {}
