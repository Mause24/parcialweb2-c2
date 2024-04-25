import cors from "cors"
import express from "express"
import morgan from "morgan"
import config from "./config"
import { onConnect } from "./database"
import generalRoutes from "./routes/generalRoutes"
//ROUTERS

const app = express()

//CONFIG
app.use(cors())
app.use(express.json())
app.use(morgan("dev"))
//ROUTES
app.use("/api", generalRoutes)
//CONNECTION
onConnect()
//LISTEN
app.listen(config.PORT, () => {
    console.log("App listen in port " + config.PORT)
})
