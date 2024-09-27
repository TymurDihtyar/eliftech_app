import { FC, PropsWithChildren } from 'react';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { useSearchParams } from "react-router-dom";

interface IProps extends PropsWithChildren {
    meta: {
        page: number;
        total: number;
    };
}

const PaginationComponent: FC<IProps> = ({ meta }) => {
    const { page, total } = meta;
    const [query, setQuery] = useSearchParams();

    const changePage = (newPage: number) => {
        setQuery({ ...Object.fromEntries(query.entries()), page: newPage.toString() });
    };

    const renderPaginationItems = () => {
        const items = [];
        for (let i = 1; i <= total; i++) {
            items.push(
                <PaginationItem key={i}>
                    <PaginationLink
                        onClick={() => changePage(i)}
                        active={i === page}
                    >
                        {i}
                    </PaginationLink>
                </PaginationItem>
            );
        }
        return items;
    };

    return (
        <Pagination className="my-6 cursor-pointer">
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        onClick={() => page > 1 && changePage(page - 1)}
                    />
                </PaginationItem>
                {renderPaginationItems()}
                <PaginationItem>
                    <PaginationNext
                        onClick={() => page < total && changePage(page + 1)}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
};

export { PaginationComponent };
