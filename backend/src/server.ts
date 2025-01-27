import express, { type Application } from "express"
import dotenv from "dotenv"
import cors from "cors"
import connectDB from "./config/database"
import userRoutes from "./routes/userRoutes"

dotenv.config()

const app: Application = express()

// Connect to MongoDB
connectDB()

// Middleware
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  }),
)
app.use(express.json())

// Routes
app.use("/api/users", userRoutes)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))

