import { Inject, Logger } from '@nestjs/common';
import { ContentServiceHost } from '../../generators/content.service.host';
import { SauceService } from '../sauce';
import { SheetService } from '../sheet';
import { UserInterface, UserService } from '../user';
import { BeepDto, BeepInterface } from './models/beep.model';
import Neode from 'neode';

const model = 'Beep'

export class BeepService extends ContentServiceHost<BeepInterface, BeepDto>(model, "discordId") {
    private readonly auxLogger = new Logger(model + 'Service+' )

    public async addAuthor(beep: Neode.Node<BeepInterface>, author: Neode.Node<UserInterface>) {
        return await author.relateTo(beep, "made").then((relationship) => { this.auxLogger.log("Beep and author connected."); return relationship })
    }
    public async addLike(beep: Neode.Node<BeepInterface>, liker: Neode.Node<UserInterface>) {
        return await liker.relateTo(beep, "likedBeep").then((relationship) => { this.auxLogger.log("Beep and liker connected."); return relationship })
    }
}