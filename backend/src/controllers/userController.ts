import type { Request, Response } from "express"
import jwt from "jsonwebtoken"
import User, { IUser } from "../models/User"

const generateToken = (id: string): string => {
  return jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_EXPIRE,
  })
}

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password, dateOfBirth, role } = req.body
    const userExists = await User.findOne({ email })

    if (userExists) {
      res.status(400).json({ message: "User already exists" })
      return
    }

    const user = await User.create({
      name,
      email,
      password,
      dateOfBirth,
      role,
    })

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      dateOfBirth: user.dateOfBirth,
      role: user.role,
      token: generateToken(user._id),
    })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })

    if (user && (await user.comparePassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        dateOfBirth: user.dateOfBirth,
        role: user.role,
        token: generateToken(user._id),
      })
    } else {
      res.status(401).json({ message: "Invalid email or password" })
    }
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find({}).select("-password")
    res.json(users)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

export const getUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.params.id).select("-password")
    if (user) {
      res.json(user)
    } else {
      res.status(404).json({ message: "User not found" })
    }
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

export const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.params.id)

    if (user) {
      user.name = req.body.name || user.name
      user.email = req.body.email || user.email
      user.dateOfBirth = req.body.dateOfBirth || user.dateOfBirth
      user.role = req.body.role || user.role

      if (req.body.password) {
        user.password = req.body.password
      }

      const updatedUser = await user.save()

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        dateOfBirth: updatedUser.dateOfBirth,
        role: updatedUser.role,
      })
    } else {
      res.status(404).json({ message: "User not found" })
    }
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.params.id)

    if (user) {
      await user.remove()
      res.json({ message: "User removed" })
    } else {
      res.status(404).json({ message: "User not found" })
    }
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

