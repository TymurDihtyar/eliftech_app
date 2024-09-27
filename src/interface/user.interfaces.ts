import {EWhereHear} from "../enums/whereHear.enum.ts";

export interface IUser {
    event_id: number
    name: string
    email: string
    date_birth: Date
    where_hear: EWhereHear
}

export interface IUsers {
    data: IUser[]
    meta: {
        page: number
        total: number
    }
}