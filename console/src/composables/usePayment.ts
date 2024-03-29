import { placeOrderLemon, placeOrderMixpay } from "../services/botastic";

export function usePayment() {
  const payWithMixpay = async (amount: string) => {
    const resp = await placeOrderMixpay(amount, window.location.href)
    window.location.href = resp.payment_url;
  };
  const payWithLemon = async (varianId: number) => {
    const resp = await placeOrderLemon(varianId, window.location.href)
    window.location.href = resp.payment_url;
  };

  return {
    payWithMixpay,
    payWithLemon
  };
}
