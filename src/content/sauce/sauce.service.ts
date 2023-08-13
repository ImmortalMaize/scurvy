import { ContentServiceHost } from 'src/generators/content.service.host';
import { SauceInterface } from './models/sauce.model';
import { SheetDto } from '../sheet/models/sheet.model';

export class SauceService extends ContentServiceHost<SauceInterface, SheetDto>('Sauce', "sauce") {}