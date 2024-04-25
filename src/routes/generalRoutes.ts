import { Router } from "express"
import bookingRoutes from "./bookingRoutes"
import roomsRoutes from "./roomRoutes"

const generalRoutes = Router()

// ROUTES
generalRoutes.use("/rooms", roomsRoutes)
generalRoutes.use("/booking", bookingRoutes)

//DEFAULT
generalRoutes.use("/", (_, res) => {
    res.status(200).send("Succesfully connected to the server!")
})

export default generalRoutes
