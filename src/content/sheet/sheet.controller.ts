import { SheetService } from './sheet.service';
import { SheetInterface } from './models/sheet.model';
import { ContentControllerHost } from 'src/generators/content.controller.host';

//@ts-ignore
export class SheetController extends ContentControllerHost<SheetInterface>(SheetService) {}

