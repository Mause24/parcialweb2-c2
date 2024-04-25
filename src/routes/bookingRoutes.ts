import { Router } from "express"
import {
    deleteBookingById,
    getAllBookings,
    getBookingById,
    patchBookingById,
    postBooking,
} from "../controllers"
import { BookingByIdParams, BookingModelInterface } from "../interfaces"
import { validatorBody, validatorParams } from "../middlewares"
import {
    BookingBodyScheme,
    BookingByIdParamsScheme,
    BookingPartialBodyScheme,
} from "../schemas"

export const bookingRoutes = Router()

//GETS
bookingRoutes.get("/", getAllBookings)
bookingRoutes.get<any, BookingByIdParams>(
    "/:id",
    validatorParams(BookingByIdParamsScheme),
    getBookingById
)
//POSTS
bookingRoutes.post<any, BookingModelInterface>(
    "/",
    validatorBody(BookingBodyScheme),
    postBooking
)
//PATCHS
bookingRoutes.patch<any, Partial<BookingModelInterface>>(
    "/:id",
    validatorParams(BookingByIdParamsScheme),
    validatorBody(BookingPartialBodyScheme),
    patchBookingById
)
//DELETES
bookingRoutes.delete<any, BookingByIdParams>(
    "/:id",
    validatorParams(BookingByIdParamsScheme),
    deleteBookingById
)

export default bookingRoutes
