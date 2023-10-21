import { DatabaseModule, DatabaseService } from 'src/database';

import { Module } from '@nestjs/common';
import { BotController } from './bot.controller';
import { BotGateway } from './bot.gateway';

@Module({
    imports: [DatabaseModule],
    controllers: [
    	BotController],
    providers: [DatabaseService, BotGateway],
})
export class BotModule {}
