/*
https://docs.nestjs.com/providers#services
*/

import { Inject, Injectable } from '@nestjs/common';
import { DatabaseService } from './../database/database.service';

const scriptsDir = "/src/beep/scripts/";

@Injectable()
export class BeepService {
    constructor(private databaseService: DatabaseService) {}
    public async makeBeep(sauce: string) {
        return await this.databaseService.make('Beep', {
            sauce
        })
    }
    public async clear() {
        return await this.databaseService.clear('Beep')
    }
}
