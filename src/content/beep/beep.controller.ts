/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Inject, Post } from '@nestjs/common';
import { BeepService } from './beep.service';
import { UserService } from '../user';
import { Delete } from '@nestjs/common';
import Neode from 'neode';
import { SheetService } from '../sheet';
import { SauceService } from '../sauce';
import { ContentControllerHost } from 'src/generators/content.controller.host';

//@ts-ignore
export class BeepController extends ContentControllerHost<BeepInterface>(BeepService, '') {
    @Inject(UserService) private userService: UserService
    @Inject(SheetService) private sheetService: SheetService
    @Inject(SauceService) private sauceService: SauceService
    @Inject(BeepService) private beepService: BeepService

    @Post('')
    async make (@Body('sauce') sauce: string, discordId: string, @Body('authors') authors: string[], @Body('sheets') sheets: string[], @Body('basedOn') basedOn: string[]) {
        const beep = await this.beepService.make({
            sauce,
            discordId
        })
        if (authors) await this.connectBeepToUsers(beep, authors)
        if (sheets) await this.connectBeepToSheets(beep, sheets)
        if (sauce) await this.connectBeepToSauces(beep, basedOn)
        return beep.properties()
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

    @Post(':id1:/like_beep/:id2')
    async like(id1: string, id2: string) {
        const user = await this.userService.findByPrimary(id1);
        const beep = await this.beepService.findByPrimary(id2);
        return await (user.relateTo(beep, 'liked'))
    }
}
