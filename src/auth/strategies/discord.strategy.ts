import { Strategy } from 'passport-discord'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { AuthService } from '../auth.service'

@Injectable()
export class DiscordStrategy extends PassportStrategy(Strategy, 'discord') {
    constructor(private authService: AuthService) {
        super({
            clientID: process.env.DISCORD_CLIENT_ID,
            clientSecret: process.env.DISCORD_CLIENT_SECRET,
            callbackURL: process.env.DISCORD_REDIRECT_URI,
            scope: ['identify', 'email'],
        })
    }


    async validate(accessToken: string, refreshToken: string, profile: any, done: Function) {
        try {
            const user = await this.authService.validateDiscordUser(profile)
            user.accessToken = accessToken
            user.refreshToken = refreshToken
            done(null, user)
        } catch (error) {
            console.log(error)
            throw new UnauthorizedException(error.message)
        }
    }
}