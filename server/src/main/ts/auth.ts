import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export interface RequestWithUserPayload extends Request
{
    user: string | JwtPayload;
}

export const authMiddleware = (req: RequestWithUserPayload, res: Response, next: NextFunction) =>
{
    // allows token to be sent via req.body, req.query, or headers
    const token = req.headers.authorization?.substring("Bearer ".length);

    if ( ! token)
    {
      return req;
    }

    // if token can be verified, add the decoded user's data to the request so it can be accessed in the resolver
    try
    {
      req.user = jwt.verify(token, process.env.JWT_SECRET!);
      next();
    }
    catch(error)
    {
      console.error("%s\n\nAuth error", error);
      res.status(401).json({message: "Auth error"});
    }

    // return the request object so it can be passed to the resolver as `context`
    return req;
};

export const signToken = (_id: string, username: string) =>
{
    const user = { _id, username };
    return jwt.sign({ user }, process.env.JWT_SECRET!);
};
