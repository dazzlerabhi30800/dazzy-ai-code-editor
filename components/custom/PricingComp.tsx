import Lookup from "@/data/Lookup";
import { pricing } from "@/type";
import React from "react";
import { Button } from "../ui/button";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { useUserContext } from "@/context/UserContext";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

const PricingComp = () => {
  const { userDetail } = useUserContext();
  const updateToken = useMutation(api.users.updateToken);

  // NOTE: function to update token on payment success
  const onPaymentSuccess = async (option: pricing) => {
    const token = (userDetail?.token as number) + Number(option.value);
    await updateToken({
      token: token,
      userId: userDetail?._id as any,
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 mt-10 lg:grid-cols-3 xl:grid-cols-4 gap-10">
      {Lookup.PRICING_OPTIONS?.map((option: pricing, index: number) => (
        <div
          className="border rounded-sm p-4 flex flex-col gap-4 text-left justify-between"
          key={index}
        >
          <h2 className="font-bold text-2xl">{option.name}</h2>
          <h3 className="font-medium text-lg">{option.tokens}</h3>
          <p className="text-gray-400">{option.desc}</p>
          <h4 className="font-bold text-4xl mt-4">${option.price}</h4>
          {/* <Button>Uprade to {option.name}</Button> */}
          <PayPalButtons
            disabled={!userDetail}
            style={{ layout: "horizontal", tagline: false }}
            onApprove={() => onPaymentSuccess(option)}
            onCancel={() => alert("your payment is cancelled")}
            createOrder={(data, actions) => {
              return actions.order.create({
                intent: "CAPTURE",
                purchase_units: [
                  {
                    amount: {
                      value: String(option.price), // Force convert to string using String()
                      currency_code: "USD",
                    },
                  },
                ],
              });
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default PricingComp;
