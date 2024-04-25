import { Router } from "express"
import {
    deleteRoomByCode,
    getAllRooms,
    getRoomByCode,
    patchRoomByCode,
    postRoom,
} from "../controllers"
import { RoomByCodeParams, RoomsModelInterface } from "../interfaces"
import { validatorBody, validatorParams } from "../middlewares"
import {
    RoomByCodeParamsScheme,
    RoomsBodyScheme,
    RoomsPartialBodyScheme,
} from "../schemas"

export const roomsRoutes = Router()

//GETS
roomsRoutes.get("/", getAllRooms)
roomsRoutes.get<any, RoomByCodeParams>(
    "/:code",
    validatorParams(RoomByCodeParamsScheme),
    getRoomByCode
)
//POSTS
roomsRoutes.post<any, RoomsModelInterface>(
    "/",
    validatorBody(RoomsBodyScheme),
    postRoom
)
//PATCHS
roomsRoutes.patch<any, Partial<RoomsModelInterface>>(
    "/:code",
    validatorParams(RoomByCodeParamsScheme),
    validatorBody(RoomsPartialBodyScheme),
    patchRoomByCode
)
//DELETES
roomsRoutes.delete<any, RoomByCodeParams>(
    "/:code",
    validatorParams(RoomByCodeParamsScheme),
    deleteRoomByCode
)

export default roomsRoutes
