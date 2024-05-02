/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Get, UseGuards, Request, Session, UnauthorizedException } from '@nestjs/common';
import { DiscordAuthGuard } from './guards/discord-auth.guard';
import { AuthenticatedGuard } from './guards/authenticated.guard';
import { AuthService } from './auth.service';
import { Public } from './public.decorator';

@Controller('me')
export class AuthController {
    constructor(private authService: AuthService) { }

    
    @UseGuards(DiscordAuthGuard)
    @Public()
    @Get('login')
    async login(@Request() req) {
        console.log('login')
        return req.user
    }

    @Public()
    @UseGuards(DiscordAuthGuard)
    @Get('redirect')
    async redirect(@Request() req) {
        console.log('redirect')
        console.log(req.user)
        return req.user
    }

    @Get('session')
    async getAuthSession(@Session() session: Record<string, any>) {
        return session
    }

    @Get('')
    async getAuthStatus(@Request() req) {
        const { accessToken, refreshToken, ...notTokens } = req.user
        return notTokens
    }

    @Get('discord')
    async getDiscordAccount(@Request() req) {
        const { user } = req
        const { accessToken, refreshToken } = user
        try {
            return await this.authService.getDiscordProfile(accessToken)
        } catch {
            await this.authService.refreshDiscordToken(user)
            return await this.authService.getDiscordProfile(user.accessToken).catch(() => { throw new UnauthorizedException()})
        }
    }

    @Get('sessions')
    async getSessions(@Session() session: Record<string, any>) {
        return 
    }
}

