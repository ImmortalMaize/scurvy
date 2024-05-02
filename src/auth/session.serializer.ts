import { Inject } from "@nestjs/common";
import { PassportSerializer } from "@nestjs/passport";
import { UserInterface, UserService } from "src/content/user";

export class SessionSerializer extends PassportSerializer {
    constructor(@Inject(UserService) private readonly userService: UserService) {
        super();
    }

    serializeUser(user: UserInterface, done: (err: Error, user: any) => void) {
        console.log('serializeUser');
        done(null, user);
    }

    async deserializeUser(user: UserInterface, done: (err: Error, user: UserInterface) => void) {
        console.log('deserializeUser');
        done(null, user);
    }
}