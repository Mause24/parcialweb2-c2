import { Request, Response } from "express"
import {
    CannotCreateException,
    RoomNotFoundException,
    RoomNotUpdatedException,
} from "../errors"
import { RoomByCodeParams, RoomsModelInterface } from "../interfaces"
import {
    deleteRoomByCodeService,
    getAllRoomsService,
    getRoomByCodeService,
    patchRoomByCodeService,
    postRoomService,
} from "../services"
import { ResponseDictionary } from "../utils/Dictionary"

export const getAllRooms = async (_: Request, res: Response) => {
    try {
        const rooms = await getAllRoomsService()
        res.status(ResponseDictionary.OK.status).json({
            message: ResponseDictionary.OK.message,
            data: rooms,
        })
    } catch (error) {
        console.error(error)
        res.status(ResponseDictionary.SERVER_ERROR.status).json({
            message: ResponseDictionary.SERVER_ERROR.message,
        })
    }
}

//GET ROOM BY CODE
export const getRoomByCode = async (
    req: Request<RoomByCodeParams>,
    res: Response
) => {
    try {
        const body = req.params
        const room = await getRoomByCodeService(body.code)
        res.status(ResponseDictionary.OK.status).json({
            message: ResponseDictionary.OK.message,
            data: room,
        })
    } catch (error) {
        console.error(error)
        if (error instanceof RoomNotFoundException) {
            res.status(ResponseDictionary.ROOM_NOT_FOUND.status).json({
                message: ResponseDictionary.ROOM_NOT_FOUND.message,
            })
            return
        }
        res.status(ResponseDictionary.SERVER_ERROR.status).json({
            message: ResponseDictionary.SERVER_ERROR.message,
        })
    }
}

//POST ROOM
export const postRoom = async (
    req: Request<any, any, RoomsModelInterface>,
    res: Response
) => {
    try {
        const body = req.body
        const roomCreated = await postRoomService(body)
        res.status(ResponseDictionary.CREATED.status).json({
            message: ResponseDictionary.CREATED.message,
            data: roomCreated,
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

//PATCH ROOM BY CODE
export const patchRoomByCode = async (
    req: Request<RoomByCodeParams, any, Partial<RoomsModelInterface>>,
    res: Response
) => {
    try {
        const params = req.params
        const body = req.body
        const patchedRoom = await patchRoomByCodeService(params.code, body)
        res.status(ResponseDictionary.UPDATED.status).json({
            message: ResponseDictionary.UPDATED.message,
            data: patchedRoom,
        })
    } catch (error) {
        console.error(error)
        if (error instanceof RoomNotUpdatedException) {
            res.status(ResponseDictionary.ROOM_NOT_UPDATED.status).json({
                message: ResponseDictionary.ROOM_NOT_UPDATED.message,
            })
            return
        }
        res.status(ResponseDictionary.SERVER_ERROR.status).json({
            message: ResponseDictionary.SERVER_ERROR.message,
        })
    }
}

//DELETE ROOM BY CODE
export const deleteRoomByCode = async (
    req: Request<RoomByCodeParams>,
    res: Response
) => {
    try {
        const params = req.params

        await deleteRoomByCodeService(params.code)
        res.status(ResponseDictionary.DELETED.status).json({
            message: ResponseDictionary.DELETED.message,
        })
    } catch (error) {
        console.error(error)
        if (error instanceof RoomNotFoundException) {
            res.status(ResponseDictionary.ROOM_NOT_FOUND.status).json({
                message: ResponseDictionary.ROOM_NOT_FOUND.message,
            })
            return
        }
        res.status(ResponseDictionary.SERVER_ERROR.status).json({
            message: ResponseDictionary.SERVER_ERROR.message,
        })
    }
}
