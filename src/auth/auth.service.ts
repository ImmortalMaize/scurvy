/*
https://docs.nestjs.com/providers#services
*/

import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { catchError, firstValueFrom } from 'rxjs';
import { UserInterface, UserService } from 'src/content/user';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private httpService: HttpService) { }

    async validateDiscordUser(profile: { id: string, name: string }): Promise<UserInterface> {
        const user = (await this.userService.findByPrimary(profile.id)) ?? await this.userService.make({ discordId: profile.id, username: profile.name })
        if (!user) throw new UnauthorizedException()
        return await user.toJson() as UserInterface
    }

    async getDiscordProfile(accessToken: string) {
        console.log(accessToken)
        const { data } = await firstValueFrom(this.httpService.get('https://discord.com/api/v10/users/@me', {
            headers: { 'Authorization': `Bearer ${accessToken}` }
        }).pipe(catchError(err => { throw err })))
        return { data }
    }

    async refreshDiscordToken(user: { accessToken: string, refreshToken: string }): Promise<{ data: { access_token: string, refresh_token: string } }> {
        console.log("Refreshing Token")
        const { refreshToken } = user
        const { data } = await firstValueFrom(this.httpService.post('https://discord.com/api/v10/oauth2/token', {
            grant_type: 'refresh_token',
            refresh_token: refreshToken,
        }, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            auth: {username: process.env.DISCORD_CLIENT_ID, password: process.env.DISCORD_CLIENT_SECRET}
        }).pipe(catchError(err => { throw err })))
        user.accessToken = data.access_token
        user.refreshToken = data.refresh_token
        return { data }
    }
}
