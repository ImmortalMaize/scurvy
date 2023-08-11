import { UserService } from './user.service';
import { UserController } from './user.controller';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { DatabaseService } from 'src/database/database.service';

@Module({
    imports: [DatabaseModule],
    controllers: [
        UserController,],
    providers: [
        UserService, DatabaseService],
})
export class UserModule { }
