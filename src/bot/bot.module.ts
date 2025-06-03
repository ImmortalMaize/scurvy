import { DatabaseModule, DatabaseService } from 'src/database';

import { Module } from '@nestjs/common';
import { BotController } from './bot.controller';
import { BotGateway } from './bot.gateway';
import { BeepModule, BeepService } from 'src/content/beep';
import { UserModule, UserService } from 'src/content/user';

@Module({
    imports: [DatabaseModule, BeepModule, UserModule],
    controllers: [
    	BotController],
    providers: [BotGateway, DatabaseService, BeepService, UserService],
})
export class BotModule {}
