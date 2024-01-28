import jwt from "jsonwebtoken";
import { Types } from "mongoose";
import { GraphQLError } from "graphql";
import type { Request } from "express";

export interface Context
{
    user?: {
        readonly _id: Types.ObjectId;
    };
}

export const authMiddleware = async ({req}: {req: Request & Context}): Promise<Context> =>
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
        return req;
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
};

export const signToken = (_id: Types.ObjectId) =>
{
    const user = { _id };
    return jwt.sign({ user }, process.env.JWT_SECRET!);
};
