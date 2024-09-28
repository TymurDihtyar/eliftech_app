import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import { PaginationComponent } from "@/components/Pagination/PaginationComponent.tsx";
import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { IUsers } from "@/interface/user.interfaces.ts";
import { UsersContainer } from "@/components/Users/UsersContainer.tsx";
import { userService } from "@/services/userService.ts";
import { ArrowLeft } from "lucide-react";

const UsersPage = () => {
    const [usersData, setUsersData] = useState<IUsers>();
    const [query, setQuery] = useSearchParams({ page: '1', sortBy: 'name' });
    const page = query.get('page') || '1';
    const sortBy = query.get('sortBy') || 'name';
    const { id } = useParams<string>();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            setQuery({ page, sortBy });
            userService.getAllByEventId(+id, +page, sortBy).then((res) => {
                setUsersData(res.data);
            });
        }
    }, [sortBy, page, id]);

    const handleSortChange = (value: string) => {
        setQuery({ sortBy: value });
    };

    return (
        <div className="flex flex-col w-[100vw] h-[100vh] justify-start items-center">
            <div className="flex w-full justify-between items-center px-5">
                <div className="flex items-center justify-center cursor-pointer w-10 h-10 border-2 rounded-md hover:bg-gray-100"
                     onClick={() => navigate('/')}>
                    <ArrowLeft color="black" size={24} />
                </div>
                <div className="flex w-full justify-end items-center h-20 gap-4">
                    <div>Sort by</div>
                    <Select defaultValue={sortBy} onValueChange={handleSortChange}>
                        <SelectTrigger className="w-[150px]">
                            <SelectValue placeholder="Select sort by" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="name">Name</SelectItem>
                            <SelectItem value="email">Email</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <Separator />
            {usersData ? (
                <>
                    <UsersContainer users={usersData.users} />
                    <Separator />
                    <PaginationComponent meta={usersData.meta} />
                </>
            ) : (
                <div>Loading events...</div>
            )}
        </div>
    );
};

export { UsersPage };
