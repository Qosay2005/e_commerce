
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
import { useTranslation } from "react-i18next";
import useCheckout from "../../hocks/useCheckout";
import useCart from "../../hocks/useCart";
import useThemeStore from "../../hocks/useThemeStore";
import PageTransition from "../../PageTransition";

const PRIMARY_COLOR = "#DB4444";
const PRIMARY_HOVER = "#C53636";

const formatPrice = (price) => `$${Number(price ?? 0).toFixed(2)}`;

const getInputSx = (isDark) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: "14px",
    backgroundColor: isDark ? "#27272A" : "#fff",
    transition: "0.2s",

    "& input": {
      color: isDark ? "#FFFFFF" : "#18181b",
    },

    "& textarea": {
      color: isDark ? "#FFFFFF" : "#18181b",
    },

    "& fieldset": {
      borderColor: isDark ? "#3F3F46" : undefined,
    },

    "&.Mui-focused fieldset": {
      borderColor: PRIMARY_COLOR,
    },
  },

  "& .MuiInputLabel-root": {
    color: isDark ? "#D4D4D8" : "#71717a",
  },

  "& .MuiInputLabel-root.Mui-focused": {
    color: PRIMARY_COLOR,
  },

  "& .MuiSelect-select": {
    color: isDark ? "#FFFFFF" : "#18181b",
  },

  "& .MuiSelect-icon": {
    color: isDark ? "#D4D4D8" : "#71717a",
  },

  "& .MuiFormHelperText-root": {
    color: isDark ? "#A1A1AA" : undefined,
  },
});

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
  const { t } = useTranslation();
  const mode = useThemeStore((state) => state.mode);
  const isDark = mode === "dark";
  const inputSx = getInputSx(isDark);

  const { data, isLoading, isError } = useCart();
  const checkoutMutation = useCheckout();

  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Visa");
  const [touched, setTouched] = useState(false);

  const paymentMethods = [
    { value: "Visa", label: t("checkout.visa") },
    { value: "Cash on Delivery", label: t("checkout.cashOnDelivery") },
  ];

  const cartItems = data?.items || [];
  const cartTotal = data?.cartTotal || 0;

  const itemsCount = cartItems.reduce(
    (sum, item) => sum + Number(item?.count ?? 0),
    0,
  );

  const stripeCheckoutUrl =
    "https://checkout.stripe.com/c/pay/cs_test_a1Yn8gAhavW6ppvO79VLd2Z4LL67ZX8TTL4CL4HL1x9K5enOM4DLr0jJpf#fidnandhYHdWcXxpYCc%2FJ2FgY2RwaXEnKSdicGRmZGhqaWBTZHdsZGtxJz8nZmprcXdqaScpJ2R1bE5gfCc%2FJ3VuWnFgdnFaMDRWbFIxZ0ZhfDZxaUJfUzFtTXNnQktudEhmTlR1MXZmM3NqVWNTQGwzamExTE5CX003dEZ8f29sV0ZLMn90RGRfNH9JbXE2YmFod1MxaEpKclB3Zmd1Rkg1NUg8ZkZKVkFRJyknY3dqaFZgd3Ngdyc%2FcXdwYCknZ2RmbmJ3anBrYUZqaWp3Jz8nJmNjY2NjYycpJ2lkfGpwcVF8dWAnPyd2bGtiaWBabHFgaCcpJ2BrZGdpYFVpZGZgbWppYWB3dic%2FcXdwYHgl";

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
          <AlertTitle>{t("common.error")}</AlertTitle>
          {t("checkout.loadError")}
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
              {t("checkout.title")}
            </Typography>
          </div>

          <Typography
            variant="h4"
            component="h1"
            className="font-extrabold tracking-tight text-zinc-900 dark:text-white"
          >
            {t("checkout.confirmTitle")}
          </Typography>

          <Typography
            variant="body2"
            className="mt-2 text-zinc-500 dark:text-zinc-300"
          >
            {t("checkout.confirmSubtitle")}
          </Typography>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <Card
            elevation={0}
            className="rounded-[24px] border border-zinc-200 bg-white shadow-sm dark:border-zinc-700 dark:bg-zinc-900"
          >
            <CardContent className="space-y-8 p-5 sm:p-7">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 dark:bg-zinc-800">
                  <LocationOnOutlined className="text-[#DB4444]" />
                </div>

                <div>
                  <Typography
                    variant="h6"
                    className="font-bold text-zinc-900 dark:text-white"
                  >
                    {t("checkout.deliveryDetails")}
                  </Typography>

                  <Typography
                    variant="body2"
                    className="text-zinc-500 dark:text-zinc-300"
                  >
                    {t("checkout.deliveryQuestion")}
                  </Typography>
                </div>
              </div>

              <TextField
                label={t("checkout.deliveryAddress")}
                placeholder={t("checkout.addressPlaceholder")}
                fullWidth
                required
                multiline
                minRows={3}
                value={address}
                error={touched && !address.trim()}
                helperText={
                  touched && !address.trim() ? t("checkout.addressRequired") : ""
                }
                onChange={(event) => setAddress(event.target.value)}
                sx={inputSx}
              />

              <div className="border-t border-zinc-100 pt-6 dark:border-zinc-700">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 dark:bg-zinc-800">
                    <CreditCardOutlined className="text-[#DB4444]" />
                  </div>

                  <div>
                    <Typography
                      variant="subtitle1"
                      className="font-bold text-zinc-900 dark:text-white"
                    >
                      {t("checkout.paymentMethod")}
                    </Typography>

                    <Typography
                      variant="body2"
                      className="text-zinc-500 dark:text-zinc-300"
                    >
                      {t("checkout.paymentMethodSelect")}
                    </Typography>
                  </div>
                </div>

                <FormControl fullWidth sx={inputSx}>
                  <InputLabel id="payment-method-label">
                    {t("checkout.paymentMethod")}
                  </InputLabel>

                  <Select
                    labelId="payment-method-label"
                    label={t("checkout.paymentMethod")}
                    value={paymentMethod}
                    onChange={(event) =>
                      setPaymentMethod(event.target.value)
                    }
                    MenuProps={{
                      PaperProps: {
                        sx: {
                          backgroundColor: isDark ? "#18181B" : "#fff",
                          color: isDark ? "#FFFFFF" : "#18181b",
                        },
                      },
                    }}
                  >
                    {paymentMethods.map((method) => (
                      <MenuItem key={method.value} value={method.value}>
                        {method.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>

              <div className="border-t border-zinc-100 pt-6 dark:border-zinc-700">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 dark:bg-zinc-800">
                    <ShoppingBagOutlined className="text-[#DB4444]" />
                  </div>

                  <div>
                    <Typography
                      variant="subtitle1"
                      className="font-bold text-zinc-900 dark:text-white"
                    >
                      {t("checkout.orderItems")}
                    </Typography>

                    <Typography
                      variant="body2"
                      className="text-zinc-500 dark:text-zinc-300"
                    >
                      {t("checkout.reviewItems")}
                    </Typography>
                  </div>
                </div>

                <div className="max-h-[280px] space-y-3 overflow-y-auto pr-1">
                  {cartItems.map((item) => (
                    <div
                      key={item.productId}
                      className="flex items-center justify-between gap-4 rounded-xl bg-zinc-50 px-4 py-3 dark:bg-zinc-800"
                    >
                      <div className="min-w-0">
                        <Typography
                          variant="body2"
                          className="truncate font-semibold text-zinc-800 dark:text-white"
                        >
                          {item.productName || t("checkout.item")}
                        </Typography>

                        <Typography
                          variant="caption"
                          className="text-zinc-500 dark:text-zinc-300"
                        >
                          {t("productDetails.quantity")}: {item.count || 1}
                        </Typography>
                      </div>

                      <Typography
                        variant="body2"
                        className="shrink-0 font-bold text-zinc-800 dark:text-white"
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
            className="h-fit overflow-hidden rounded-[24px] border border-zinc-200 bg-white shadow-sm dark:border-zinc-700 dark:bg-zinc-900 lg:sticky lg:top-6"
          >
            <CardContent className="space-y-5 p-5 sm:p-6">
              <div className="flex items-center justify-between">
                <Typography
                  variant="h6"
                  className="font-bold text-zinc-900 dark:text-white"
                >
                  {t("checkout.orderSummary")}
                </Typography>

                <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-[#DB4444] dark:bg-zinc-800">
                  {itemsCount}{" "}
                  {itemsCount === 1
                    ? t("checkout.item")
                    : t("checkout.itemsLabel")}
                </span>
              </div>

              <Typography
                variant="body2"
                className="text-zinc-500 dark:text-zinc-300"
              >
                {t("checkout.reviewTotal")}
              </Typography>

              <div className="rounded-2xl bg-zinc-50 p-4 dark:bg-zinc-800">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-zinc-500 dark:text-zinc-300">
                    {itemsCount}{" "}
                    {itemsCount === 1
                      ? t("checkout.item")
                      : t("checkout.itemsLabel")}
                  </span>

                  <span className="font-semibold text-zinc-700 dark:text-white">
                    {formatPrice(cartTotal)}
                  </span>
                </div>

                <div className="my-4 border-t border-dashed border-zinc-300 dark:border-zinc-600" />

                <div className="flex items-center justify-between">
                  <Typography
                    variant="subtitle1"
                    className="font-bold text-zinc-900 dark:text-white"
                  >
                    {t("checkout.total")}
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
                  disabled={
                    checkoutMutation.isPending || cartItems.length === 0
                  }
                  sx={primaryButtonSx}
                >
                  {checkoutMutation.isPending ? (
                    <CircularProgress size={20} color="inherit" />
                  ) : (
                    t("checkout.confirmOrder")
                  )}
                </Button>

                <Button
                  component={Link}
                  to="/shop"
                  fullWidth
                  variant="outlined"
                  sx={outlinedButtonSx}
                >
                  {t("checkout.continueShopping")}
                </Button>
              </div>

              {cartItems.length === 0 && (
                <Typography
                  variant="body2"
                  className="text-center text-zinc-500 dark:text-zinc-300"
                >
                  {t("checkout.emptyCartMessage")}
                </Typography>
              )}

              {checkoutMutation.isError && (
                <Alert severity="error" className="rounded-xl">
                  {checkoutMutation.error?.response?.data?.message ||
                    checkoutMutation.error?.message ||
                    t("checkout.checkoutFailed")}
                </Alert>
              )}
            </CardContent>
          </Card>
        </div>
      </section>
    </PageTransition>
  );
}
