import express from "express"
import corss from "cors"
import {postRouter} from "./Router/PostRouter"
import { userRouter } from "./Router/UserRouter"
import dotenv from "dotenv"

dotenv.config()

const app = express()

app.use(corss())
app.use(express.json())

app.listen(Number(process.env.PORT), () => {
    console.log(`Servidor rodando na porta ${process.env.PORT}`)
})

app.use("/posts", postRouter)
app.use("/users", userRouter)



