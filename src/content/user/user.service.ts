import { ContentServiceHost } from "src/generators/content.service.host";
import { UserDto, UserInterface } from "./models/user.model";

export class UserService extends ContentServiceHost<UserInterface, UserDto>('User', "discordId") {}
