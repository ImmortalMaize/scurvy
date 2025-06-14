import { Inject, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ContentServiceHost } from '../../generators/content.service.host';
import { SauceService } from '../sauce';
import { SheetService } from '../sheet';
import { UserInterface, UserService } from '../user';
import { BeepDto, BeepInterface } from './models/beep.model';
import Neode from 'neode';
import { DatabaseService } from 'src/database';
import { readFileSync } from 'fs';
import * as Day from 'dayjs'
import * as Driver from 'neo4j-driver-core/lib/temporal-types.js'
import { LadderEntries } from '../meta/classes/ladders';

const model = 'Beep'

export class BeepService extends ContentServiceHost<BeepInterface, BeepDto>(model, "discordId") {
    private readonly auxLogger = new Logger(model + 'Service+' )
    @Inject(DatabaseService) private databaseService: DatabaseService

    public async addAuthor(beep: Neode.Node<BeepInterface>, author: Neode.Node<UserInterface>) {
        return await author.relateTo(beep, "made").then((relationship) => { this.auxLogger.log("Beep and author connected."); return relationship })
    }
    public async addLike(beep: Neode.Node<BeepInterface>, liker: Neode.Node<UserInterface>) {
        return await liker.relateTo(beep, "likedBeep").then((relationship) => { this.auxLogger.log("Beep and liker connected."); return relationship })
    }
    public async getBeepsTemporally(after: Day.ConfigType, before?: Day.ConfigType) {
        const beforeDate = before ? Day(before) : Day()
        const afterDate = Day(after)
        
        after = afterDate.toISOString()
        before = beforeDate.toISOString()
        console.log(after)
        const script = readFileSync('src/content/beep/scripts/get.beeps.temporally.cyp', 'utf-8')
        const table = this.databaseService.table(await this.databaseService.read(script, {
            after, before
        })) as (BeepInterface & LadderEntries[number])[]
        return table
    }

    @Cron(CronExpression.EVERY_DAY_AT_5AM)
    public async cleanData() {
        const script = readFileSync('src/content/beep/scripts/clean.cyp', 'utf-8')
        this.auxLogger.log("Cleaning out duplicates.")
        return await this.databaseService.run(script)
    }
}