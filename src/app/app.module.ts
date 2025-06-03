import { CreqService } from './../content/creq/creq.service';
import { CreqModule } from './../content/creq/creq.module';
import { CreqController } from './../content/creq/creq.controller';
import { CritiqueController } from './../content/critique/critique.controller';
import { AuthModule } from './../auth/auth.module';
import { ContentModule } from '../content';
import { SauceModule } from '../content/sauce';
import { SheetModule } from '../content/sheet';
import { UserModule } from '../content/user/user.module';
import { BeepModule } from '../content/beep'
import { DatabaseModule } from '../database/database.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseService } from 'src/database/database.service';
import { RouterModule } from '@nestjs/core';
import { BotModule } from 'src/bot/bot.module';
import { PassportModule } from '@nestjs/passport';
@Module({
  imports: [
    CreqModule,
    AuthModule,
    ContentModule,
    SauceModule,
    SheetModule,
    UserModule,
    BeepModule,
    DatabaseModule,
    BotModule,
    ConfigModule.forRoot(),
    PassportModule.register({ session: true }),
    RouterModule.register([
      {
        path: 'content',
        module: ContentModule,
        children: [
          {
            path: 'sauce',
            module: SauceModule
          },
          {
            path: 'sheet',
            module: SheetModule
          },
          {
            path: 'user',
            module: UserModule
          },
          {
            path: 'beep',
            module: BeepModule
          },
          {
            path: 'creq',
            module: CreqModule
          }
        ]
      },
      {
        path: 'bot',
        module: BotModule,
      }
    ])
  ],
  controllers: [AppController],
  providers: [
    CreqService, AppService, DatabaseService],
})
export class AppModule { }
