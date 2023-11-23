import { Body, Controller, Post } from '@nestjs/common';
import { DatabaseService } from 'src/database';

@Controller()
export class BotController {
    constructor(private databaseService: DatabaseService) {}
    @Post('likeBeep')
    public async likeBeep(@Body() body: { liker: string, beep: string, author: string }) {
    	const script = this.databaseService.readScript("/src/bot/scripts/likeBeep")
    	return await this.databaseService.run(script, body)
    }
}

