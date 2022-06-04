import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

export const authMiddelware = async (req: Request, res: Response, next: NextFunction) => {
    const authorization = req.headers.authorization;
    if (!authorization) {
        res.status(401).send({ message: "'Not authorized. Invalid token'" });
    } else {
        const token = authorization.split('Bearer ')[1];
        try {
            const payload = verify(token, process.env.JWT_SECRET as string) as { exp: number };
            console.log(payload);
            next();
        } catch (error) {
            res.status(401).send({ message: "'Not authorized. Invalid token'" });
        }
    }
};
