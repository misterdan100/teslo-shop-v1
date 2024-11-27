"use client";

import { generatePagination } from "@/utils";
import clsx from "clsx";
import Link from "next/link";
import { redirect, usePathname, useSearchParams } from "next/navigation";

interface Props {
  totalPages: number;
}

export const Pagination = ({ totalPages }: Props) => {
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const currentPage: number = Number(searchParams.get("page")) || 1;

  if(currentPage < 1) redirect(pathName)

  const allPagesArray = generatePagination(currentPage, totalPages);

  const createPageUrl = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (pageNumber === "...") {
      return `${pathName}?${params.toString()}`; // redirect to the same route
    }

    if (+pageNumber <= 0) {
      return `${pathName}`; // return to current page without pagination
    }

    if (+pageNumber > totalPages) {
      return `${pathName}?${params.toString()}`; // redirect to the same route
    }

    params.set("page", pageNumber.toString());
    return `${pathName}?${params.toString()}`;
  };

  return (
    <div className="flex justify-center text-center mt-10 mb-32">
      <nav aria-label="Page navigation example">
        <ul className="flex list-style-none">
          <li className="page-item disabled">
          {currentPage === 1 ? (
              <span
                className="page-link relative block py-1.5 px-3 border-0 outline-none transition-all duration-300 rounded text-gray-500  focus:shadow-none"
              >
                Prev
              </span>
            ) : (
              <Link
                className='text-gray-800 page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300  hover:text-gray-800 hover:bg-gray-100 focus:shadow-none'
                href={createPageUrl(currentPage + 1)}
              >
                Prev
              </Link>
            )}
          </li>

          {allPagesArray.map((page, index) => (
            <li key={`${page}${index}`} className="page-item">
              {page === "..." ? (
                <span
                  className="page-link relative block py-1.5 px-3 border-0 outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                >
                  {page}
                </span>
              ) : (
                <Link
                  className={clsx(
                    "page-link relative block py-1.5 px-3 border-0 outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-100 focus:shadow-none",
                    {
                      "bg-blue-600 shadow-sm text-white hover:text-white hover:bg-blue-700":
                        page === currentPage,
                    }
                  )}
                  href={createPageUrl(page)}
                >
                  {page}
                </Link>
              )}
            </li>
          ))}

          <li className="page-item">
            {currentPage === totalPages ? (
              <span
                className="page-link relative block py-1.5 px-3 border-0 outline-none transition-all duration-300 rounded text-gray-500  focus:shadow-none"
              >
                Next
              </span>
            ) : (
              <Link
                className='text-gray-800 page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300  hover:text-gray-800 hover:bg-gray-100 focus:shadow-none'
                href={createPageUrl(currentPage + 1)}
              >
                Next
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
};
