import { Injectable } from '@nestjs/common';
import { ContentServiceHost } from 'src/generators';
import { CreqInterface, CreqDto } from './models/creq.model';

@Injectable()
export class CreqService extends ContentServiceHost<CreqInterface, CreqDto>('Critique_Request', "discordId") {}
