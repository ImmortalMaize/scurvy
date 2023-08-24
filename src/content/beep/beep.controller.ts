import { Body, Controller, HttpException, Inject, Param, Post, Put, Response } from '@nestjs/common';
import { BeepService } from './beep.service';
import { UserService } from '../user';
import Neode from 'neode';
import { SheetService } from '../sheet';
import { SauceService } from '../sauce';
import { ContentControllerHost } from 'src/generators/content.controller.host';

interface SheetSubmission {
    name: string,
    caption: string,
}
//@ts-ignore
export class BeepController extends ContentControllerHost<BeepInterface>(BeepService, '') {
    @Inject(UserService) private userService: UserService
    @Inject(SheetService) private sheetService: SheetService
    @Inject(SauceService) private sauceService: SauceService
    @Inject(BeepService) private beepService: BeepService

    @Post('')
    async make(@Body('sauce') sauce: string, @Body('discordId') discordId: string, @Body('authors') authors: string[], @Body('sheets') sheets: SheetSubmission[], @Body('basedOn') basedOn: string[]) {
        console.log(sauce)
        console.log(discordId)
        const beep = await this.beepService.make({
            sauce,
            discordId
        })
        if (!beep) return null
        if (authors) await this.connectBeepToUsers(beep, authors)
        if (sheets) await this.connectBeepToSheets(beep, sheets)
        if (basedOn) await this.connectBeepToSauces(beep, basedOn)
        return beep.properties()
    }

    @Put(':discordId')
    async merge(@Body('sauce') sauce: string, @Param('discordId') discordId: string, @Body('caption') caption: string, @Body('authors') authors: string[], @Body('sheets') sheets: SheetSubmission[], @Body('basedOn') basedOn: string[]) {
        //@ts-ignore
        const beep = await this.beepService.merge(discordId, {
            sauce
        })
        if (!beep) return null
        if (authors) await this.connectBeepToUsers(beep, authors)
        if (sheets) await this.connectBeepToSheets(beep, sheets)
        if (basedOn) await this.connectBeepToSauces(beep, basedOn)
        return beep.properties()
    }

    private async connectBeepToUsers(beep: Neode.Node<unknown>, authors: string[]) {
        await Promise.all(authors.map(async author => {
            return await this.userService.merge(author)
        })).then(users => {
            for (let user of users) {
                if (user) user.relateTo(beep, 'made')
            }
        })
    }

    private async connectBeepToSheets(beep: Neode.Node<unknown>, sheets: {name: string, caption: string}[]) {
        await Promise.all(sheets.map(async sheet => {
            const mergedSheet = await this.sheetService.merge(sheet.name)
            return {mergedSheet, caption: sheet.caption}
        })).then(mergedSheets => {
            for (let sheet of mergedSheets) {
                if (sheet.mergedSheet) sheet.mergedSheet.relateTo(beep, 'submitted', {
                    caption: sheet.caption
                })
            }
        })
    }

    private async connectBeepToSauces(beep: Neode.Node<unknown>, sauces: string[]) {
        await Promise.all(sauces.map(async sauce => {
            return await this.sauceService.merge(sauce)
        })).then(mergedSauces => {
            for (let sauce of mergedSauces) {
                if (sauce) sauce.relateTo(beep, 'based')
            }
        })
    }

    @Post(':id2/liked_by/:id1')
    async like(@Param('id1') id1: string, @Param('id2') id2: string) {
        console.log(id1, id2)
        const user = await this.userService.findByPrimary(id1);
        const beep = await this.beepService.findByPrimary(id2);
        if (!user) throw new HttpException('User not found.', 404)
        if (!beep) throw new HttpException('Beep not found.', 404)
        else { const relation = await (user.relateTo(beep, 'likedBeep')); return await relation.toJson()}
    }
}
