import { AuthService } from './auth.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { DiscordStrategy } from './strategies/discord.strategy';
import { UserModule, UserService } from 'src/content/user';
import { PassportModule } from '@nestjs/passport';
import { DiscordAuthGuard } from './guards/discord-auth.guard';
import { DatabaseModule, DatabaseService } from 'src/database';
import { AuthController } from './auth.controller';
import { SessionSerializer } from './session.serializer';
import { HttpModule } from '@nestjs/axios';
import { AuthenticatedGuard } from './guards/authenticated.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
    imports: [UserModule, PassportModule, DatabaseModule, HttpModule.register({
        timeout: 5000,
        maxRedirects: 5
    })],
    controllers: [AuthController],
    providers: [AuthService, DiscordStrategy, DiscordAuthGuard, UserService, DatabaseService, SessionSerializer,
      {
        provide: APP_GUARD,
        useClass: AuthenticatedGuard,
      },
      ]
})
export class AuthModule { }