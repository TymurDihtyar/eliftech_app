import {urls} from "../constants/urls.ts";
import {apiService} from "./apiService.ts";
import {IRes} from "../types/IRes.ts";
import {IUser, IUsers} from "../interface/user.interfaces.ts";

const userService = {
    getAllByEventId: (eventId: number, page: number, sortBy: string): IRes<IUsers> => apiService.get(urls.usersByEventId(eventId), {params: {page, sortBy}}),
    createUser: (data: IUser): IRes<IUser> => apiService.post(urls.users, data)
}

export {userService}