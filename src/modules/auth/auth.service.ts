import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as md5 from "md5";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "../user/user.entity";
import { Model } from "mongoose";

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {    
    const user = await this.userModel.findOne({ username });
    
    if(user && md5(password) === user.password) {
      const { id, name, email, username } = user;
      return {
        id,
        name,
        email,
        username,
      }
    }

    return null;
  }

  async login(user: any) {
    const { id, name, email, username } = user;
    const payload = { id, name, email, username };
    return {
      user,
      token: this.jwtService.sign(payload),
    }
  }
}
