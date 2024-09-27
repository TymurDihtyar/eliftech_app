import {urls} from "../constants/urls.ts";
import {apiService} from "./apiService.ts";
import {IEvents} from "../interface/event.interfaces.ts";
import {IRes} from "../types/IRes.ts";

const eventService = {
    getAll: (page: number, sortBy: string): IRes<IEvents> => apiService.get(urls.events, {params: {page, sortBy}}),
}

export {eventService}