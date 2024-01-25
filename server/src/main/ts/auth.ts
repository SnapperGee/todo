import jwt, { JwtPayload } from "jsonwebtoken";
import { GraphQLError } from "graphql";
import type { Request, Response, NextFunction } from "express";

export interface RequestWithUserPayload extends Request
{
    user: string | JwtPayload;
}

export const authMiddleware = (req: RequestWithUserPayload, _res: Response, next: NextFunction) =>
{
    const token = req.headers.authorization?.substring("Bearer ".length);

    if ( ! token)
    {
      return req;
    }

    try
    {
        req.user = jwt.verify(token, process.env.JWT_SECRET!);
        next();
    }
    catch(error)
    {
        throw new GraphQLError("Auth error",
            {
                extensions: {
                code: 'UNAUTHENTICATED',
                http: { status: 401 },
                cause: error
                }
            }
        );
    }

    return req;
};

export const signToken = (_id: string, username: string) =>
{
    const user = { _id, username };
    return jwt.sign({ user }, process.env.JWT_SECRET!);
};
