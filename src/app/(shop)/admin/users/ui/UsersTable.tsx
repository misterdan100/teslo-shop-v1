"use client";

import { changeUserRole } from "@/actions";
import { User } from "@/interfaces";
import Link from "next/link";
import { IoCardOutline } from "react-icons/io5";

interface Props {
    users: User[]
}

export const UsersTable = ({ users }: Props) => {



  return (
    <table className="shadow-md rounded-lg min-w-full overflow-hidden">
      <thead className="bg-gray-200 border-b">
        <tr>
          <th
            scope="col"
            className="px-6 py-4 font-medium text-gray-900 text-sm text-left"
          >
            E-mail
          </th>
          <th
            scope="col"
            className="px-6 py-4 font-medium text-gray-900 text-sm text-left"
          >
            Name
          </th>
          <th
            scope="col"
            className="px-6 py-4 font-medium text-gray-900 text-sm text-left"
          >
            Role
          </th>

        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr
            key={user.id}
            className="bg-white hover:bg-gray-100 border-b transition duration-300 ease-in-out"
          >
            <td className="px-6 py-4 font-medium text-gray-900 text-sm whitespace-nowrap">
              {user.email} 
            </td>
            <td className="px-6 py-4 font-light text-gray-900 text-sm whitespace-nowrap">
              {user.name} 
            </td>
            <td className="flex items-center px-6 py-4 font-light text-gray-900 text-sm whitespace-nowrap">
              
                <select 
                    className="p-2 w-full text-gray-900 text-sm"
                    value={user.role}
                    onChange={e => changeUserRole(user.id , e.target.value)}
                >
                    <option value='admin'>Admin</option>
                    <option value='user'>User</option>
                </select>

            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
