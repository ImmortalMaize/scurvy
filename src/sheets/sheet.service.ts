import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

const scriptsDir = "/src/sheets/scripts/";
@Injectable()
export class SheetService {
    constructor(private databaseService: DatabaseService) {
    }

    public async merge(name: string) {
        return await this.databaseService.merge('Sheet', {
            name
        })
    }

    public async find(name: string) {
        return await this.databaseService.readScript(scriptsDir + "findByName", { name })
    }
    public async clear() {
        return await this.databaseService.clear('Sheet')
    }
}
