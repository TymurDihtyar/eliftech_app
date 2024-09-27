import {FC, PropsWithChildren} from 'react';
import {IEvent} from "@/interface/event.interfaces.ts";
import {OneEvent} from "@/components/Events/OneEvent.tsx";

interface IProps extends PropsWithChildren {
    events: IEvent[]
}

const EventsContainer: FC<IProps> = ({ events }) => {
    return (
        <div className="grid grid-cols-4 grid-rows-3 gap-8 h-full w-full p-8">
            {events.map((event) => (
                <OneEvent key={event.id} event={event} />
            ))}
        </div>
    );
};

export { EventsContainer };
