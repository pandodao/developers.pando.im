import { placeOrderMixpay } from "../services/botastic";

export function usePayment() {
  const payWithMixpay = async (amount: string) => {
    const resp = await placeOrderMixpay(amount)
    const paymentLink = 'https://mixpay.me/code/' + resp.code;
    window.location.href = paymentLink;
  };

  return {
    payWithMixpay
  };
}
