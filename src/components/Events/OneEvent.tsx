import {FC, PropsWithChildren} from 'react';
import {IEvent} from "@/interface/event.interfaces.ts";
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {Button} from "@/components/ui/button.tsx";
import {useNavigate} from "react-router-dom";


interface IProps extends PropsWithChildren {
    event: IEvent
}

const OneEvent:FC<IProps> = ({event}) => {
    const navigate = useNavigate();

    return (
        <Card className="flex flex-col justify-between p-5">
            <CardHeader>
                <CardTitle>{event.title}</CardTitle>
                <CardDescription>{event.description}</CardDescription>
            </CardHeader>
            <CardFooter className="flex justify-between">
                <Button onClick={() => navigate(`/registration/${event.id}`)} variant="outline">Register</Button>
                <Button onClick={() => navigate(`/users/${event.id}`)}>View</Button>
            </CardFooter>
        </Card>

    );
};

export {OneEvent};