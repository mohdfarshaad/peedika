import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { User } from "../domains/user/user.types.ts";

declare global {
  namespace Express {
    interface Request<
      P = ParamsDictionary,
      ResBody = any,
      ReqBody = any,
      ReqQuery = ParsedQs,
    > {
      user?: User;

      cookies: {
        accessToken?: string;
        refreshToken?: string;
        [key: string]: string | undefined;
      };

      params: P;

      files?:
        | Express.Multer.File[]
        | {
            [fieldname: string]: Express.Multer.File[];
          };
    }
  }
}
