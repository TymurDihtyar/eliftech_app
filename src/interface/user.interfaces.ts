import {EWhereHear} from "../enums/whereHear.enum.ts";

export interface IUser {
    event_id: number
    name: string
    email: string
    birthDate: Date
    whereHear: EWhereHear
}

export interface IUsers {
    users: IUser[]
    meta: {
        page: number
        total: number
    }
}