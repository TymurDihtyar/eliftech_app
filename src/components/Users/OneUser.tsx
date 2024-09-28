import {FC, PropsWithChildren} from 'react';
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {IUser} from "@/interface/user.interfaces.ts";


interface IProps extends PropsWithChildren {
    user: IUser
}

const OneUser:FC<IProps> = ({user}) => {

    return (
        <Card className="flex flex-col justify-between p-5">
            <CardHeader>
                <CardTitle>{user.name}</CardTitle>
                <CardDescription>{user.email}</CardDescription>
            </CardHeader>
        </Card>

    );
};

export {OneUser};