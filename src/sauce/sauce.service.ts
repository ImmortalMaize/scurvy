import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

const scriptsDir = "/src/sheets/scripts/";
@Injectable()
export class SauceService {
    constructor(private databaseService: DatabaseService) {
    }
    public async merge(name: string) {
        return await this.databaseService.merge('Sauce', {
            name
        })
    }
    public async find(name: string) {
        return await this.databaseService.readScript(scriptsDir + "findByName", { name })
    }
    public async clear() {
        return await this.databaseService.clear('Sauce')
    }
}
