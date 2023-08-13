import { ContentServiceHost } from 'src/generators/content.service.host';
import { SheetDto, SheetInterface } from './models/sheet.model';

export class SheetService extends ContentServiceHost<SheetInterface, SheetDto>('Sheet', "name") {}
