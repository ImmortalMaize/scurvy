import { ContentServiceHost } from "src/generators/content.service.host";
import { UserDto, UserInterface } from "./models/user.model";
import { DatabaseService } from "src/database";
import { Inject } from "@nestjs/common";
import { readFileSync } from "fs";
import { LadderEntries, picksLadder } from "../meta/classes/ladders";
export class UserService extends ContentServiceHost<UserInterface, UserDto>('User', "discordId") {
    @Inject(DatabaseService) private databaseService: DatabaseService
    public async calculateXPFromPicks(discordId: string) {
        const { table } = this.databaseService
        const script = readFileSync('src/content/user/scripts/get.picks.cyp', 'utf-8')

        const entries: LadderEntries = table(await this.databaseService.read(script, { discordId: discordId })) as LadderEntries
        picksLadder.entries = entries
        return picksLadder.reduceTiers()
    }
}
