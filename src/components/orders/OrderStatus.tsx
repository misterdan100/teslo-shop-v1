import clsx from "clsx";
import { IoCardOutline } from "react-icons/io5";

interface Props {
    isPaid: boolean
}

export const OrderStatus = ({isPaid}: Props) => {
  return (
    <div
      className={clsx(
        "flex items-center mb-5 px-3.5 py-2 rounded-lg font-bold text-white text-xs",
        {
          "bg-red-500": !isPaid,
          "bg-green-700": isPaid,
        }
      )}
    >
      <IoCardOutline size={30} />
      {/* <span className="mx-2">Pending payment</span> */}
      <span className="mx-2">{isPaid ? 'Order Paid' : 'Order not Paid'}</span>
    </div>
  );
};
