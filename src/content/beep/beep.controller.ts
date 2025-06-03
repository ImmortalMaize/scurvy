import { Body, Controller, HttpException, Inject, Param, Post, Put, Request, Response, UseGuards } from '@nestjs/common';
import { BeepService } from './beep.service';
import { UserService } from '../user';
import Neode from 'neode';
import { SheetService } from '../sheet';
import { SauceService } from '../sauce';
import { ContentControllerHost } from 'src/generators/content.controller.host';
import { BeepDto } from './models/beep.model';
import { AuthenticatedGuard } from 'src/auth/guards/authenticated.guard';

interface SheetSubmission {
    name: string,
    caption: string,
}
//@ts-ignore
export class BeepController extends ContentControllerHost<BeepInterface>(BeepService, '') {}
