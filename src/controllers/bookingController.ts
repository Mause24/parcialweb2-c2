import { Request, Response } from "express"
import {
    BookingNotFoundException,
    BookingNotUpdatedException,
    CannotCreateException,
} from "../errors"
import { BookingByIdParams, BookingModelInterface } from "../interfaces"
import {
    deleteBookingByIdService,
    getAllBookingService,
    getBookingByIdService,
    patchBookingByIdService,
    postBookingService,
} from "../services"
import { ResponseDictionary } from "../utils/Dictionary"

//GET ALL BOOKINGS
export const getAllBookings = async (_: Request, res: Response) => {
    try {
        const bookings = await getAllBookingService()
        res.status(ResponseDictionary.OK.status).json({
            message: ResponseDictionary.OK.message,
            data: bookings,
        })
    } catch (error) {
        console.error(error)
        res.status(ResponseDictionary.SERVER_ERROR.status).json({
            message: ResponseDictionary.SERVER_ERROR.message,
        })
    }
}

//GET BOOKING BY ID
export const getBookingById = async (
    req: Request<BookingByIdParams>,
    res: Response
) => {
    try {
        const body = req.params
        const booking = await getBookingByIdService(body.id)
        res.status(ResponseDictionary.OK.status).json({
            message: ResponseDictionary.OK.message,
            data: booking,
        })
    } catch (error) {
        console.error(error)
        if (error instanceof BookingNotFoundException) {
            res.status(ResponseDictionary.BOOKING_NOT_FOUND.status).json({
                message: ResponseDictionary.BOOKING_NOT_FOUND.message,
            })
            return
        }
        res.status(ResponseDictionary.SERVER_ERROR.status).json({
            message: ResponseDictionary.SERVER_ERROR.message,
        })
    }
}

//POST BOOKING
export const postBooking = async (
    req: Request<any, any, BookingModelInterface>,
    res: Response
) => {
    try {
        const body = req.body
        const bookingCreated = await postBookingService(body)
        res.status(ResponseDictionary.CREATED.status).json({
            message: ResponseDictionary.CREATED.message,
            data: bookingCreated,
        })
    } catch (error) {
        console.error(error)
        if (error instanceof CannotCreateException) {
            res.status(ResponseDictionary.CANNOT_CREATE.status).json({
                message: ResponseDictionary.CANNOT_CREATE.message,
            })
            return
        }

        res.status(ResponseDictionary.SERVER_ERROR.status).json({
            message: ResponseDictionary.SERVER_ERROR.message,
        })
    }
}

//PATCH BOOKING BY ID
export const patchBookingById = async (
    req: Request<BookingByIdParams, any, Partial<BookingModelInterface>>,
    res: Response
) => {
    try {
        const params = req.params
        const body = req.body
        const patchedBooking = await patchBookingByIdService(params.id, body)
        res.status(ResponseDictionary.UPDATED.status).json({
            message: ResponseDictionary.UPDATED.message,
            data: patchedBooking,
        })
    } catch (error) {
        console.error(error)
        if (error instanceof BookingNotUpdatedException) {
            res.status(ResponseDictionary.BOOKING_NOT_UPDATED.status).json({
                message: ResponseDictionary.BOOKING_NOT_UPDATED.message,
            })
            return
        }
        res.status(ResponseDictionary.SERVER_ERROR.status).json({
            message: ResponseDictionary.SERVER_ERROR.message,
        })
    }
}

//DELETE BOOKING BY ID
export const deleteBookingById = async (
    req: Request<BookingByIdParams>,
    res: Response
) => {
    try {
        const params = req.params

        await deleteBookingByIdService(params.id)
        res.status(ResponseDictionary.DELETED.status).json({
            message: ResponseDictionary.DELETED.message,
        })
    } catch (error) {
        console.error(error)
        if (error instanceof BookingNotFoundException) {
            res.status(ResponseDictionary.BOOKING_NOT_FOUND.status).json({
                message: ResponseDictionary.BOOKING_NOT_FOUND.message,
            })
            return
        }
        res.status(ResponseDictionary.SERVER_ERROR.status).json({
            message: ResponseDictionary.SERVER_ERROR.message,
        })
    }
}
