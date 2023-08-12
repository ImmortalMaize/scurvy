/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Post } from '@nestjs/common';
import { BeepService } from './beep.service';
import { UserService } from 'src/user/user.service';
import { Delete } from '@nestjs/common';
import { Beep } from './models/beep.model';
import { Sheet } from 'src/sheets/models/sheet.model';
import Neode from 'neode';
import { SheetService } from 'src/sheets/sheet.service';
import { SauceService } from './../sauce/sauce.service';

@Controller('/b')
export class BeepController {
    constructor(private beepService: BeepService, private userService: UserService, private sheetService: SheetService, private sauceService: SauceService) {

    }

    private async connectBeepToUsers(beep: Neode.Node<unknown>, authors: string[]) {
        await Promise.all(authors.map(async author => {
            return await this.userService.merge(author)
        })).then(users => {
            for (let user of users) {
                user.relateTo(beep, 'made')
            }
        })
    }
    
    private async connectBeepToSheets(beep: Neode.Node<unknown>, sheets: string[]) {
        await Promise.all(sheets.map(async sheet => {
            return await this.sheetService.merge(sheet)
        })).then(sheets => {
            for (let sheet of sheets) {
                sheet.relateTo(beep, 'submitted')
            }
        })
    }

    private async connectBeepToSauces(beep: Neode.Node<unknown>, sauces: string[]) {
        await Promise.all(sauces.map(async sauce => {
            return await this.sauceService.merge(sauce)
        })).then(mergedSauces => {
            for (let sauce of mergedSauces) {
                sauce.relateTo(beep, 'based')
            }
        })
    }

    @Post('')
    public async makeBeep(@Body('sauce') sauce: string, @Body('authors') authors: string[], @Body('sheets') sheets: string[], @Body('basedOn') basedOn: string[]) {
        const beep = await this.beepService.makeBeep(sauce)
        if (authors) await this.connectBeepToUsers(beep, authors)
        if (sheets) await this.connectBeepToSheets(beep, sheets)
        if (sauce) await this.connectBeepToSauces(beep, basedOn)
        return beep.properties()
    }

    @Delete()
    async clear() {
        return await this.beepService.clear()
    }
}
