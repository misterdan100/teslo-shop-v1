"use client";

import { paypalCheckPayment, setTransactionId } from "@/actions";
import { CreateOrderActions, CreateOrderData, OnApproveActions, OnApproveData } from "@paypal/paypal-js";
import {
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";

interface Props {
  orderId: string
  amount: number
}

export const PayPalButton = ({ orderId, amount }: Props) => {
  const [{ isPending }] = usePayPalScriptReducer();

  const roundedAmount =  ((Math.round( amount * 100)) / 100).toString()

  if (isPending) {
    return (
      <div className="mb-12 animate-pulse">
        <div className="bg-gray-300 rounded h-12"></div>
        <div className="bg-gray-300 mt-2 rounded h-12"></div>
      </div>
    );
  }

  const createOrder = async (data: CreateOrderData, actions: CreateOrderActions): Promise<string> => {
    const transactionId = await actions.order.create({
        
        intent: 'CAPTURE', // Add the intent here
        purchase_units: [
            {
              invoice_id: orderId,
              amount: {
                  currency_code: 'USD', // Add the currency code here
                  value: roundedAmount,
              }
            }
        ]
    })

    const { ok } = await setTransactionId(orderId, transactionId)

    if(!ok) {
      throw new Error("Order could't be updated")
    }

    return transactionId
  }

  const onApprove = async (data: OnApproveData, actions: OnApproveActions) => {
    const details = await actions.order?.capture()
    if(!details) {
      return
    }

    await paypalCheckPayment( details.id || '' )

  }

  return <PayPalButtons 
    createOrder={createOrder}
    onApprove={ onApprove }
  />;
};