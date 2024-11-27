export const generatePagination = (currentPage: number, totalPages: number) => {

    // if totalPage is 7 or less show all pages
    if(totalPages <= 7 ) {
        return Array.from({length: totalPages}, (_, index) => index + 1)
    }

    // if totalPages is > 7 
    // if currentPage is between first 3 pages
    // show first 3 pages, "...", the last 2 pages
    if(currentPage < 4) {
        return [1,2,3,4,'...',totalPages-1, totalPages]
    }

    // if current page is between last 3 pages
    // show first 2 pages, '...', the las 3 pages
    if(currentPage >= totalPages -2) {
        return [1,2,'...', totalPages-2, totalPages-1, totalPages]
    }

    // if currentPage is far away from the begining and the end
    // show first page, '...', current page
    return [1,'...', currentPage-1, currentPage, currentPage+1, '...', totalPages]

}