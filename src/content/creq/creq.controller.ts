/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller } from '@nestjs/common';
import { ContentControllerHost } from 'src/generators';
import { CreqDto, CreqInterface } from './models/creq.model';
import { CreqService } from './creq.service';

@Controller()
//@ts-ignore
export class CreqController extends ContentControllerHost<CreqInterface, CreqDto>(CreqService) {}
