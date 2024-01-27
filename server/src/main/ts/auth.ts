import jwt from "jsonwebtoken";
import { Types } from "mongoose";
import { GraphQLError } from "graphql";
import type { Request, Response, NextFunction } from "express";

export interface Context
{
    user?: {
        readonly _id: Types.ObjectId;
        readonly username: string;
    };
}

export const authMiddleware = async (req: Request & Context, _res: Response, next: NextFunction): Promise<Request & Context> =>
{
    const token = req.headers.authorization?.substring("Bearer ".length);

    if ( ! token)
    {
      return req;
    }

    try
    {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as Context;
        req.user = decoded.user;
        next();
    }
    catch(error)
    {
        throw new GraphQLError("Auth error",
            {
                extensions: {
                    code: "UNAUTHENTICATED",
                    http: { status: 401 },
                    cause: error
                }
            }
        );
    }

    return req;
};

export const signToken = (_id: Types.ObjectId, username: string) =>
{
    const user = { _id, username };
    return jwt.sign({ user }, process.env.JWT_SECRET!);
};
