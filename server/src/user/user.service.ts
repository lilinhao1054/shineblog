import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  // constructor() {}
  async findOne(username: string): Promise<User> {
    return { username: 'admin', password: '123456' };
  }
}
