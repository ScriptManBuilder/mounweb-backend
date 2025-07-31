import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'MOUN Digital Agency API is running successfully! 🚀';
  }
}
