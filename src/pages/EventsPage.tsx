import {EventsContainer} from "@/components/Events/EventsContainer.tsx";
import {PaginationComponent} from "@/components/Pagination/PaginationComponent.tsx";
import {Separator} from "@/components/ui/separator"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {useEffect, useState} from "react";
import {IEvents} from "@/interface/event.interfaces.ts";
import {eventService} from "@/services/eventService.ts";
import {useSearchParams} from "react-router-dom";


const EventsPage = () => {
    const [eventsData, setEventsData] = useState<IEvents>()
    const [query, setQuery] = useSearchParams({page: '1', sortBy: 'title'});
    const page = query.get('page') || '1'
    const sortBy = query.get('sortBy') || 'title'

    useEffect(() => {
        setQuery({page, sortBy})
        eventService.getAll(+page, sortBy).then((res) => {
            setEventsData(res.data)
        })
    }, [sortBy, page]);

    const handleSortChange = (value: string) => {
        setQuery({ sortBy: value });
    };

    return (
        <div className="flex flex-col w-[100vw] h-[100vh] justify-start items-center">
            <div className="flex w-full justify-end items-center h-20 px-5 gap-4">
                <div>Sort by</div>
                <Select defaultValue={sortBy} onValueChange={handleSortChange}>
                    <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="Select sort by"/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="title">Title</SelectItem>
                        <SelectItem value="date">Date</SelectItem>
                        <SelectItem value="organizer">Organizer</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <Separator/>
            {eventsData ? (
                <>
                    <EventsContainer events={eventsData.events} />
                    <Separator />
                    <PaginationComponent meta={eventsData.meta} />
                </>
            ) : (
                <div>Loading events...</div>
            )}
        </div>
    );
};

export {EventsPage};