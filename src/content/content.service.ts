import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database';
import From from './types/from.type';

const scriptsDir = 'src/content/scripts/'
@Injectable()
export class ContentService {
    constructor(private databaseService: DatabaseService) {}
    async clearAll() {
        return await this.databaseService.run(
            this.databaseService.readScript(scriptsDir + 'clearAll')
        )
    }
    generateAltId(from: From, id: string) {
        return `${from}:${id}`
    }
}
