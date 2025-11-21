// src/types/express.d.ts

export interface DecodedToken {
  userId: number;
  studentId: string;
  fullname: string;
  role: "user" | "admin";
  iat: number;
  exp: number;
}

declare global {
  namespace Express {
    export interface Request {
      user?: DecodedToken;
    }
  }
}
