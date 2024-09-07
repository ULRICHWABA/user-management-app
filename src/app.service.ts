import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Ton application a bien start mr ulrich 👌 !!';
  }
}
