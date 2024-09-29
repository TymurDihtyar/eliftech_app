import { FC, PropsWithChildren } from 'react';
import { IUser } from "@/interface/user.interfaces.ts";
import { OneUser } from "@/components/Users/OneUser.tsx";

interface IProps extends PropsWithChildren {
    users: IUser[];
}

const UsersContainer: FC<IProps> = ({ users }) => {
    return (
        <div className="grid grid-cols-4 grid-rows-3 gap-8 h-full w-full p-8">
            {users.length > 0 ? (
                users.map((user) => (
                    <OneUser key={user.email} user={user} />
                ))
            ) : (
                <p className="col-span-4 text-center text-xl">No users registered on this event yet</p>
            )}
        </div>
    );
};

export { UsersContainer };
