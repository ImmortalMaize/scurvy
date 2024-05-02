import { DatabaseModule, DatabaseService } from 'src/database';
import { BeepController, BeepService } from '.';
import { Module } from '@nestjs/common';
import {  } from 'src/database/database.service';
import { UserModule, UserService } from 'src/content/user';
import { SheetModule, SheetService } from 'src/content/sheet';
import { SauceModule, SauceService } from 'src/content/sauce';

@Module({
    imports: [DatabaseModule, UserModule, SheetModule, SauceModule],
    controllers: [
        BeepController
    ],
    providers: [
        DatabaseService, BeepService, UserService, SheetService, SauceService],
})
export class BeepModule { }
