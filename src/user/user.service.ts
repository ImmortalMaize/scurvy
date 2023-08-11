
import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class UserService {
    constructor(private databaseService: DatabaseService) { }

    async merge(discordId: string) {
        return await this.databaseService.merge('User', {
            discordId
        })
    }
}
