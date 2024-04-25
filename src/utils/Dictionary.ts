export const ResponseDictionary = {
    // GENERAL
    OK: {
        message: "OK",
        status: 200,
    },
    CREATED: {
        message: "CREATED",
        status: 201,
    },
    UPDATED: {
        message: "UPDATED",
        status: 200,
    },
    DELETED: {
        message: "DELETED",
        status: 200,
    },
    CANNOT_CREATE: {
        message: "CANNOT_CREATE",
        status: 500,
    },
    INVALID_TOKEN: {
        message: "INVALID_TOKEN",
        status: 401,
    },
    AUTHORIZATION_REQUIRED: {
        message: "AUTHORIZATION_REQUIRED",
        status: 403,
    },
    MISSING_TOKEN: {
        message: "MISSING_TOKEN",
        status: 401,
    },
    SERVER_ERROR: {
        message: "SERVER_ERROR",
        status: 500,
    },
    NOT_AUTHORIZED: {
        message: "NOT_AUTHORIZED",
        status: 401,
    },
    EMAIL_ALREADY_EXIST: {
        message: "EMAIL_ALREADY_EXIST",
        status: 409,
    },
    // ROOM
    ROOM_NOT_FOUND: {
        message: "ROOM_NOT_FOUND",
        status: 404,
    },
    ROOM_NOT_UPDATED: {
        message: "ROOM_NOT_UPDATED",
        status: 400,
    },
    // BOOKING
    BOOKING_NOT_FOUND: {
        message: "BOOKING_NOT_FOUND",
        status: 404,
    },
    BOOKING_NOT_UPDATED: {
        message: "BOOKING_NOT_UPDATED",
        status: 400,
    },
}
