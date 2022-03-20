import { UserPayload } from "@labcourseapp/common";
import jwt from 'jsonwebtoken'

export class TokenService {
    public static create(payload: UserPayload){
        return jwt.sign(payload, process.env.JWT_KEY!)
    }
}