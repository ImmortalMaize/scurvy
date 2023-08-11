import { SauceModule } from './../sauce/sauce.module';
import { SheetModule } from './../sheets/sheet.module';
import { UserModule } from './../user/user.module';
import { BeepModule } from '../beep/beep.module';
import { DatabaseModule } from '../database/database.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseService } from 'src/database/database.service';
@Module({
  imports: [
        SauceModule, 
        SheetModule, 
    UserModule,
    BeepModule,
    DatabaseModule,
    ConfigModule.forRoot()
  ],
  controllers: [AppController],
  providers: [AppService, DatabaseService],
})
export class AppModule { }
