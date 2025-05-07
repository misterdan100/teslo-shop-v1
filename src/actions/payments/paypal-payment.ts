"use server";

import { Paypal, PaypalOrderStatusResponse } from "@/interfaces";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const paypalCheckPayment = async (paypalTransactionId: string) => {
  try {
    console.log(paypalTransactionId);
    const authToken = await getPaypalBearerToken();

    console.log({ authToken });

    if (!authToken) {
      return {
        ok: false,
        message: "Verification token not found",
      };
    }

    const res = await verifyPaypalPayment( paypalTransactionId, authToken)

    if( !res ) {
        return {
            ok: false,
            message: "Error verifiying payment"
        }
    }

    const { status, purchase_units } = res
    const { invoice_id: orderId } = purchase_units[0]

    console.log({status, purchase_units})

    if( status !== 'COMPLETED') {
        return {
            ok: false,
            message: "Order isn't still paid on PayPal"
        }
    }

    //Todo: update payment in db
    try {
      console.log({status, purchase_units})

      const res = await prisma.order.update({
        where: {id: orderId},
        data: {
          isPaid: true,
          paidAt: new Date()
        }
      })

      console.log(res)

      //Todo: Revalidar un path with next.js
      revalidatePath(`/orders/${orderId}`)

      return {
        ok: true
      }

      
    } catch (error) {
      console.log(error)
      return {
        ok: false,
        message: "Payment couldn't be possible"
      }
    }

  } catch (error) {}
};

const getPaypalBearerToken = async (): Promise<string | null> => {
  const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const PAYPAL_SECRET = process.env.PAYPAL_SECRET;
  const oauth2Url = process.env.PAYPAL_OAUTH_URL ?? "";

  // Generate basic string to hidde paypal keys
  const base64Token = Buffer.from(
    `${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`,
    "utf-8"
  ).toString("base64");

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  myHeaders.append("Authorization", `Basic ${base64Token}`);

  const urlencoded = new URLSearchParams();
  urlencoded.append("grant_type", "client_credentials");

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
  };

  try {
    const res = await fetch(oauth2Url, {
      ...requestOptions,
      cache: 'no-store'
    }).then((r) => r.json());

    return res.access_token;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const verifyPaypalPayment = async (
  paypalTransactionId: string,
  bearerToken: string
): Promise<PaypalOrderStatusResponse|null> => {

  const paypalOrderUrl = `${process.env.PAYPAL_ORDERS_URL}/${paypalTransactionId}`

  const myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    `Bearer ${bearerToken}`
  );

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    // redirect: "follow",
  };

  try {
    const res = await fetch(paypalOrderUrl, {
      ...requestOptions,
      cache: 'no-store'
    }).then( r => r.json())
    
    return res
    
  } catch (error) {
    console.log(error)
    return null
  }
};
