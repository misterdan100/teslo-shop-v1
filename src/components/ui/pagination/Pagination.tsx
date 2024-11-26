import Link from "next/link";

interface Props {
    totalPages: number,
    currentPage: number
}

export const Pagination = ({ totalPages, currentPage }: Props) => {
    
  return (
    <div className="flex justify-center text-center mt-10 mb-32">
      <nav aria-label="Page navigation example">
        <ul className="flex list-style-none">
          <li className="page-item disabled">
          <Link
              className={`${currentPage === 1 ? 'text-gray-500' : 'text-gray-800'} page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300  hover:text-gray-800 hover:bg-gray-200 focus:shadow-none`}
              href={`?page=${currentPage - 1}`}
            >
              Prev
            </Link>
          </li>

          {
            (Array.from({length: totalPages}, (_, index) => index + 1)).map( page => (
                <li className="page-item">
                    <Link
                    className={`${ +page === +currentPage ? 'bg-blue-600 hover:bg-blue-400 text-white hover:text-gray-800' : 'hover:bg-gray-200 text-gray-800' } page-link relative block py-1.5 px-3 rounded border-0 outline-none transition-all duration-300 focus:shadow-none`}
                    href={`?page=${page}`}
                    >
                    {page}
                    </Link>
                </li>
            ))
          }
          
          
          <li className="page-item">
            <Link
                
              className={`${currentPage === totalPages ? 'text-gray-500' : 'text-gray-800'} page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300  hover:text-gray-800 hover:bg-gray-200 focus:shadow-none`}
              href={`?page=${currentPage + 1}`}
              
            >
              Next
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
