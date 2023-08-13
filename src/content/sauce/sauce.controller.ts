import { SauceService } from './sauce.service';
import { ContentControllerHost } from 'src/generators/content.controller.host';
import { SauceInterface } from './models/sauce.model';

//@ts-ignore
export class SauceController extends ContentControllerHost<SauceInterface>(SauceService) {}