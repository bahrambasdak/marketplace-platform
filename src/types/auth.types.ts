import { JWTPayload } from "jose";

export interface UserResponse {
  accessToken: string;
  sessionId: string;
  sessionExpiry: number;
}

export interface JWT extends JWTPayload{
    username: string;
    fullName: string;
    pic: string;
    exp: number;
}


export interface UserSession extends JWT{
    sessionId: string;
    accessToken: string;
    sessionExpiry: number;
}

 