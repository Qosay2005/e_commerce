import { useState } from "react";

import {
  Alert,
  AlertTitle,
  Button,
  Card,
  CardContent,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

import {
  CreditCardOutlined,
  LocationOnOutlined,
  ShoppingBagOutlined,
} from "@mui/icons-material";

import { Link } from "react-router-dom";

import useCheckout from "../../hocks/useCheckout";
import useCart from "../../hocks/useCart";
import PageTransition from '../../PageTransition'
const PRIMARY_COLOR = "#DB4444";
const PRIMARY_HOVER = "#C53636";

const PAYMENT_METHODS = [
  { value: "Visa", label: "Visa" },
  { value: "Cash on Delivery", label: "Cash on Delivery" }
];

const formatPrice = (price) => `$${Number(price ?? 0).toFixed(2)}`;

const inputSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "14px",
    backgroundColor: "#fff",
    transition: "0.2s",

    "&.Mui-focused fieldset": {
      borderColor: PRIMARY_COLOR,
    },
  },

  "& label.Mui-focused": {
    color: PRIMARY_COLOR,
  },
};

const primaryButtonSx = {
  borderRadius: "14px",
  backgroundColor: PRIMARY_COLOR,
  textTransform: "none",
  fontWeight: 700,
  py: 1.3,
  boxShadow: "none",
  transition: "0.2s",

  "&:hover": {
    backgroundColor: PRIMARY_HOVER,
    boxShadow: "none",
  },
};

const outlinedButtonSx = {
  borderRadius: "14px",
  borderColor: PRIMARY_COLOR,
  color: PRIMARY_COLOR,
  textTransform: "none",
  fontWeight: 700,
  py: 1.2,

  "&:hover": {
    borderColor: PRIMARY_COLOR,
    backgroundColor: "rgba(219, 68, 68, 0.05)",
  },
};

export default function Checkout() {

  const { data, isLoading, isError } = useCart();
  const checkoutMutation = useCheckout();

  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Visa");
  const [touched, setTouched] = useState(false);

  const cartItems = data?.items || [];

  const cartTotal = data?.cartTotal || 0;
   
  const itemsCount = cartItems.reduce(
    (sum, item) => sum + Number(item?.count ?? 0),
    0,
  );

  const stripeCheckoutUrl ="https://checkout.stripe.com/c/pay/cs_test_a1Yn8gAhavW6ppvO79VLd2Z4LL67ZX8TTL4CL4HL1x9K5enOM4DLr0jJpf#fidnandhYHdWcXxpYCc%2FJ2FgY2RwaXEnKSdicGRmZGhqaWBTZHdsZGtxJz8nZmprcXdqaScpJ2R1bE5gfCc%2FJ3VuWnFgdnFaMDRWbFIxZ0ZhfDZxaUJfUzFtTXNnQktudEhmTlR1MXZmM3NqVWNTQGwzamExTE5CX003dEZ8f29sV0ZLMn90RGRfNH9JbXE2YmFod1MxaEpKclB3Zmd1Rkg1NUg8ZkZKVkFRJyknY3dqaFZgd3Ngdyc%2FcXdwYCknZ2RmbmJ3anBrYUZqaWp3Jz8nJmNjY2NjYycpJ2lkfGpwcVF8dWAnPyd2bGtiaWBabHFgaCcpJ2BrZGdpYFVpZGZgbWppYWB3dic%2FcXdwYHgl";
  const handleConfirmOrder = () => {
    setTouched(true);

    if (!address.trim() || cartItems.length === 0) return;

    checkoutMutation.mutate({
      address: address.trim(),
      PaymentMethod: paymentMethod,
    });
    window.location.href = stripeCheckoutUrl;
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <CircularProgress sx={{ color: PRIMARY_COLOR }} />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          Unable to load your cart for checkout.
        </Alert>
      </div>
    );
  }

  return (
    <PageTransition>
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      <div className="mb-8">
        <div className="mb-3 flex items-center gap-3">
          <span className="h-7 w-1 rounded-full bg-[#DB4444]" />

          <Typography
            variant="subtitle2"
            className="font-bold uppercase tracking-[0.12em] text-[#DB4444]"
          >
            Checkout
          </Typography>
        </div>

        <Typography
          variant="h4"
          component="h1"
          className="font-extrabold tracking-tight text-zinc-900"
        >
          Confirm Your Order
        </Typography>

        <Typography variant="body2" className="mt-2 text-zinc-500">
          Complete your delivery details and review your order.
        </Typography>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <Card
          elevation={0}
          className="rounded-[24px] border border-zinc-200 bg-white shadow-sm"
        >
          <CardContent className="space-y-8 p-5 sm:p-7">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50">
                <LocationOnOutlined className="text-[#DB4444]" />
              </div>

              <div>
                <Typography variant="h6" className="font-bold text-zinc-900">
                  Delivery Details
                </Typography>

                <Typography variant="body2" className="text-zinc-500">
                  Where should we deliver your order?
                </Typography>
              </div>
            </div>

            <TextField
              label="Delivery Address"
              placeholder="Enter your full delivery address"
              fullWidth
              required
              multiline
              minRows={3}
              value={address}
              error={touched && !address.trim()}
              helperText={
                touched && !address.trim() ? "Address is required" : ""
              }
              onChange={(event) => setAddress(event.target.value)}
              sx={inputSx}
            />

            <div className="border-t border-zinc-100 pt-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50">
                  <CreditCardOutlined className="text-[#DB4444]" />
                </div>

                <div>
                  <Typography
                    variant="subtitle1"
                    className="font-bold text-zinc-900"
                  >
                    Payment Method
                  </Typography>

                  <Typography variant="body2" className="text-zinc-500">
                    Select your preferred payment method.
                  </Typography>
                </div>
              </div>

              <FormControl fullWidth sx={inputSx}>
                <InputLabel id="payment-method-label">
                  Payment Method
                </InputLabel>

                <Select
                  labelId="payment-method-label"
                  label="Payment Method"
                  value={paymentMethod}
                  onChange={(event) => setPaymentMethod(event.target.value)}
                >
                  {PAYMENT_METHODS.map((method) => (
                    <MenuItem key={method.value} value={method.value}>
                      {method.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>

            <div className="border-t border-zinc-100 pt-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50">
                  <ShoppingBagOutlined className="text-[#DB4444]" />
                </div>

                <div>
                  <Typography
                    variant="subtitle1"
                    className="font-bold text-zinc-900"
                  >
                    Order Items
                  </Typography>

                  <Typography variant="body2" className="text-zinc-500">
                    Review the items in your order.
                  </Typography>
                </div>
              </div>

              <div className="max-h-[280px] space-y-3 overflow-y-auto pr-1">
                {cartItems.map((item) => (
                  <div
                    key={item.productId}
                    className="flex items-center justify-between gap-4 rounded-xl bg-zinc-50 px-4 py-3"
                  >
                    <div className="min-w-0">
                      <Typography
                        variant="body2"
                        className="truncate font-semibold text-zinc-800"
                      >
                        {item.productName || "Item"}
                      </Typography>

                      <Typography
                        variant="caption"
                        className="text-zinc-500"
                      >
                        Quantity: {item.count || 1}
                      </Typography>
                    </div>

                    <Typography
                      variant="body2"
                      className="shrink-0 font-bold text-zinc-800"
                    >
                      {formatPrice(item.totalPrice)}
                    </Typography>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card
          elevation={0}
          className="h-fit overflow-hidden rounded-[24px] border border-zinc-200 bg-white shadow-sm lg:sticky lg:top-6"
        >
          <CardContent className="space-y-5 p-5 sm:p-6">
            <div className="flex items-center justify-between">
              <Typography variant="h6" className="font-bold text-zinc-900">
                Order Summary
              </Typography>

              <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-[#DB4444]">
                {itemsCount} {itemsCount === 1 ? "Item" : "Items"}
              </span>
            </div>

            <Typography variant="body2" className="text-zinc-500">
              Review your total before confirming your order.
            </Typography>

            <div className="rounded-2xl bg-zinc-50 p-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-zinc-500">
                  {itemsCount} {itemsCount === 1 ? "Item" : "Items"}
                </span>

                <span className="font-semibold text-zinc-700">
                  {formatPrice(cartTotal)}
                </span>
              </div>

              <div className="my-4 border-t border-dashed border-zinc-300" />

              <div className="flex items-center justify-between">
                <Typography
                  variant="subtitle1"
                  className="font-bold text-zinc-900"
                >
                  Total
                </Typography>

                <Typography
                  variant="h5"
                  className="font-extrabold text-[#DB4444]"
                >
                  {formatPrice(cartTotal)}
                </Typography>
              </div>
            </div>
            
          <div className="flex flex-col gap-4">

            <Button
              fullWidth
              variant="contained"
              onClick={handleConfirmOrder}
              disabled={checkoutMutation.isPending || cartItems.length === 0}
              sx={primaryButtonSx}
            >
              {checkoutMutation.isPending ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                "Confirm Order"
              )}
            </Button>

            <Button
              component={Link}
              to="/shop"
              fullWidth
              variant="outlined"
              sx={outlinedButtonSx}
            >
              Continue Shopping
            </Button>

            </div>


            {cartItems.length === 0 && (
              <Typography
                variant="body2"
                className="text-center text-zinc-500"
              >
                Your cart is empty. Add products before checkout.
              </Typography>
            )}

            {checkoutMutation.isError && (
              <Alert severity="error" className="rounded-xl">
                {checkoutMutation.error?.response?.data?.message ||
                  checkoutMutation.error?.message ||
                  "Checkout failed. Please try again."}
              </Alert>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
    </PageTransition>
  );
}