import { ContentControllerHost } from "src/generators/content.controller.host";
import { UserService } from "./user.service";
import { UserInterface } from "./models/user.model";
import { Inject, Post } from "@nestjs/common";
import { BeepService } from "../beep";

//@ts-ignore
export class UserController extends ContentControllerHost<UserInterface>(UserService) {
}