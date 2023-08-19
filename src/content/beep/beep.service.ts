import { ContentServiceHost } from '../../generators/content.service.host';
import { BeepDto, BeepInterface } from './models/beep.model';

export class BeepService extends ContentServiceHost<BeepInterface, BeepDto>('Beep', "discordId") {}