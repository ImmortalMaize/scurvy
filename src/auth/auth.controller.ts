/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Get, UseGuards, Request, Session, UnauthorizedException, Response, Redirect } from '@nestjs/common';
import { DiscordAuthGuard } from './guards/discord-auth.guard';
import { AuthenticatedGuard } from './guards/authenticated.guard';
import { AuthService } from './auth.service';
import { Public } from './public.decorator';

@Controller('me')
export class AuthController {
    constructor(private authService: AuthService) { }

    async tryWithDiscordToken(@Request() req, fun: (token: string) => Promise<any>) {
            const { accessToken } = req.user
            try {
                return await fun(accessToken)
            } catch {
                await this.authService.refreshDiscordToken(req.user)
                return await fun(req.user.accessToken).catch(() => { throw new UnauthorizedException() })
            }
        }
    
    @UseGuards(DiscordAuthGuard)
    @Public()
    @Get('login')
    async login(@Request() req) {
        console.log('login')
        return req.user
    }

    @Get('logout')
    async logout(@Session() session: Record<string, any>) {
        console.log(session)
        return await session.destroy()
    
    }

    @Public()
    @UseGuards(DiscordAuthGuard)
    @Redirect('http://localhost:5173/login')
    @Get('redirect')
    async redirect(@Request() req) {
        console.log(req.user)
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
        this.tryWithDiscordToken(req, this.authService.getDiscordProfile)
    }

    @Get('sessions')
    async getSessions(@Session() session: Record<string, any>) {
        return 
    }
}

