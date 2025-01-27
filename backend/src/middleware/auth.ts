import type { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import User, { type IUser } from "../models/User"

interface DecodedToken {
  id: string
}

declare global {
  namespace Express {
    interface Request {
      user?: IUser
    }
  }
}

const auth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "")

    if (!token) {
      throw new Error()
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as DecodedToken
    const user = await User.findById(decoded.id)

    if (!user) {
      throw new Error()
    }

    req.user = user
    next()
  } catch (error) {
    res.status(401).send({ error: "Please authenticate." })
  }
}

export default auth

