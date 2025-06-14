import { BadRequestException, Body, Controller, HttpException, NotFoundException, Post } from '@nestjs/common';
import { BeepInterface, DiscordBeepDto } from 'src/content/beep/models/beep.model';
import { UserService } from 'src/content/user';
import { DiscordUserDto, UserInterface } from 'src/content/user/models/user.model';
import { DatabaseService } from 'src/database';
import { BeepService } from './../content/beep/beep.service';
import Neode from 'neode';
import { Public } from 'src/auth/public.decorator';
import { picksLadder } from 'src/content/meta/classes/ladders';

@Controller()
export class BotController {
    constructor(private databaseService: DatabaseService, private userService: UserService, private beepService: BeepService) { }

    @Public()
    @Post('getXP')
    public async calculateXP(@Body() body: { author: DiscordUserDto }) {
        const { author } = body
        return await this.userService.calculateXPFromPicks(author.discordId)
    }

    @Public()
    @Post('postBeep')
    public async postInFinishedBeeps(@Body() body: { beep: DiscordBeepDto, author: DiscordUserDto }) {
        console.log(body.beep)
        const { discordId, title, sauce, published, blurb } = body.beep
        let beep = await this.beepService.findByKey("sauce", sauce)
        if (!beep) beep = await this.beepService.make({
            discordId,
            title,
            sauce,
            published,
            blurb
        }).catch(() => { throw new BadRequestException('Could not create beep.') }) as Neode.Node<BeepInterface>

        const dtoAuthor = body.author
        let author = await this.userService.findByKey("discordId", dtoAuthor.discordId)
        if (!author) author = await this.userService.make({
            discordId: dtoAuthor.discordId,
            username: dtoAuthor.username
        }).catch(() => { throw new BadRequestException('Could not find or create author.') }) as Neode.Node<UserInterface>

        return (await this.beepService.addAuthor(beep as Neode.Node<BeepInterface>, author as Neode.Node<UserInterface>)).properties
    }

    @Public()
    @Post('likeBeep')
    public async likeInFinishedBeeps(@Body() body: { likers: DiscordUserDto[], beep: DiscordBeepDto, author: DiscordUserDto }) {
        const dtoLikers = body.likers
        const dtoBeep = body.beep
        const dtoAuthor = body.author

        // Find user who made the beep. If non-existent create that user.
        let author = await this.userService.findByKey("discordId", dtoAuthor.discordId)
        if (!author) author = await this.userService.make({
            discordId: dtoAuthor.discordId,
            username: dtoAuthor.username
        }).catch(() => { throw new BadRequestException('Could not find or create author.') }) as Neode.Node<UserInterface>

        // Find beep. If non-existent create that beep.
        let beep = await this.beepService.findByKey("sauce", dtoBeep.sauce)
        if (!beep) beep = await this.beepService.make({
            title: dtoBeep.title,
            discordId: dtoBeep.discordId,
            sauce: dtoBeep.sauce,
            published: dtoBeep.published,
            blurb: dtoBeep.blurb
        }).catch(() => { throw new BadRequestException('Could not find or create beep.') }) as Neode.Node<BeepInterface>

        //Creates :MADE relationship between beep and author if one doesn't already exist.
        if (beep && author) await this.beepService.addAuthor(beep as Neode.Node<BeepInterface>, author as Neode.Node<UserInterface>)


        // Find user who liked the beep. If non-existent create that user.
        const likers = []
        for (const dtoLiker of dtoLikers) {
            let liker = await this.userService.findByKey("discordId", dtoLiker.discordId)
            if (!liker) liker = await this.userService.make({
                discordId: dtoLiker.discordId,
                username: dtoLiker.username
            }).catch(() => { throw new BadRequestException('Could not find or create liker.') }) as Neode.Node<UserInterface>

            //Creates :LIKED relationship between beep and liker if one doesn't already exist
            if (beep && liker) likers.push((await this.beepService.addLike(beep as Neode.Node<BeepInterface>, liker as Neode.Node<UserInterface>)).properties)
        }
        return likers
    }

    @Public()
    @Post("getPicksTemporally")
    public async getPicks(@Body() body: { after: string, before: string }) {
        const { after, before } = body
        const beeps = await this.beepService.getBeepsTemporally(after, before)
        picksLadder.entries = beeps
        return picksLadder.populateTier(picksLadder.floor).sort((a, b) => b.score - a.score)
    }

    @Public()
    @Post("updateTitle")
    public async updateTitle(@Body() body: { discordId: string, title: string }) {
        const { discordId, title } = body
        if (!discordId || !title) throw new BadRequestException("Sauce and title are required.")
        const beep = await this.beepService.findByKey("discordId", discordId)
        if (!beep) throw new NotFoundException("Beep not found.")
        return (await beep.update({ title })).properties()
    }

    @Public()
    @Post("updateBeep")
    public async updateBeep(@Body() body: { beep: DiscordBeepDto, author: DiscordUserDto }) {
        const { author: dtoAuthor } = body
        let author = await this.userService.findByKey("discordId", dtoAuthor.discordId)
        if (!author) author = await this.userService.make({
            discordId: dtoAuthor.discordId,
            username: dtoAuthor.username
        }).catch(() => { throw new BadRequestException('Could not find or create author.') }) as Neode.Node<UserInterface>

        const { beep: dtoBeep } = body
        if (!dtoBeep.discordId || !dtoBeep.sauce) throw new BadRequestException("Discord ID and sauce are required.")

        // Find beep. If non-existent create that beep.
        let beep = await this.beepService.findByKey("discordId", dtoBeep.discordId).catch(() => { throw new BadRequestException('Could not find beep.') }) as Neode.Node<BeepInterface>
        if (beep) (await beep.update(dtoBeep as BeepInterface)).properties()
        beep = await this.beepService.make({
            discordId: dtoBeep.discordId,
            title: dtoBeep.title,
            sauce: dtoBeep.sauce,
            published: dtoBeep.published,
            blurb: dtoBeep.blurb
        }).catch(() => { throw new BadRequestException('Could not create beep.') }) as Neode.Node<BeepInterface>

        if (beep && author) await this.beepService.addAuthor(beep as Neode.Node<BeepInterface>, author as Neode.Node<UserInterface>)
    }
}

