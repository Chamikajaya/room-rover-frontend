import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationForSearchProps {
    totalPages: number | undefined;
    currentPage: number;
    onPageChange: (page: number) => void;
}

export default function PaginationForSearch({totalPages, currentPage, onPageChange}: PaginationForSearchProps) {

    //  called whenever a page number or navigation button is clicked.
    const handlePageChange = (page: number) => {
        // checks if the requested page number is within the valid range
        if (page >= 1 && page <= totalPages!) {
            onPageChange(page);  // calls the onPageChange callback function with the new page number. (Refer search page.tsx - This will update the state for the current page number)
        }
    };

    // renders the page numbers and ellipses based on the current page number and total number of pages.
    const renderPageNumbers = () => {
        if (!totalPages) return null;

        const pages = [];  // array to store the page numbers and ellipses
        const maxPageNumbers = 3; // Max number of page numbers to display before adding ellipses

        // Add the first page -  first page number (1) is always added to the pages array.
        pages.push(
            <PaginationItem key={1}>
                <PaginationLink onClick={() => handlePageChange(1)} className={currentPage === 1 ? "active" : ""}>
                    1
                </PaginationLink>
            </PaginationItem>
        );

        if (totalPages <= maxPageNumbers + 2) {
            // If total pages are less than or equal to maxPageNumbers + first and last page, display all pages
            for (let i = 2; i <= totalPages - 1; i++) {
                pages.push(
                    <PaginationItem key={i}>
                        <PaginationLink href="#" onClick={() => handlePageChange(i)}
                                        className={currentPage === i ? "active" : ""}>
                            {i}
                        </PaginationLink>
                    </PaginationItem>
                );
            }
        } else {
            // If total pages are more than maxPageNumbers, display truncated page numbers with ellipses

            if (currentPage > 2) {
                // Add an ellipsis if currentPage is greater than 2
                pages.push(
                    <PaginationItem key="start-ellipsis">
                        <PaginationEllipsis/>
                    </PaginationItem>
                );
            }

            const startPage = Math.max(2, currentPage - 1);
            const endPage = Math.min(totalPages - 1, currentPage + 1);

            for (let i = startPage; i <= endPage; i++) {
                pages.push(
                    <PaginationItem key={i}>
                        <PaginationLink href="#" onClick={() => handlePageChange(i)}
                                        className={currentPage === i ? "active" : ""}>
                            {i}
                        </PaginationLink>
                    </PaginationItem>
                );
            }

            if (currentPage < totalPages - 1) {
                // Add an ellipsis if currentPage is less than totalPages - 1
                pages.push(
                    <PaginationItem key="end-ellipsis">
                        <PaginationEllipsis/>
                    </PaginationItem>
                );
            }
        }

        // Add the last page
        pages.push(
            <PaginationItem key={totalPages}>
                <PaginationLink href="#" onClick={() => handlePageChange(totalPages)}
                                className={currentPage === totalPages ? "active" : ""}>
                    {totalPages}
                </PaginationLink>
            </PaginationItem>
        );

        return pages;
    };

    return (
        <Pagination className="mt-10">
            <PaginationContent>
                <PaginationItem>
                    {currentPage !== 1 && (
                        <PaginationPrevious onClick={() => handlePageChange(currentPage - 1)}/>
                    )}

                </PaginationItem>
                {renderPageNumbers()}
                <PaginationItem>
                    {currentPage !== totalPages && (
                        <PaginationNext onClick={() => handlePageChange(currentPage + 1)}/>
                    )}
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}
