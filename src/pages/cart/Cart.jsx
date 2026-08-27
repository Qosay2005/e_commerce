import { Link } from "react-router-dom";
import {
  Alert,
  AlertTitle,
  Button,
  Card,
  CardContent,
  CircularProgress,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import {
  AddRounded,
  DeleteOutlineRounded,
  RemoveRounded,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import useCart from "../../hocks/useCart";
import useUpdateCart from "../../hocks/useUpdateCart";
import useRemoveFromCart from "../../hocks/useRemoveFromCart";
import useClearCart from "../../hocks/useClearCart";
import PageTransition from '../../PageTransition'
const PRIMARY_COLOR = "#DB4444";
const PRIMARY_HOVER = "#C53636";
const primaryButtonSx = {
  borderRadius: "12px",
  backgroundColor: PRIMARY_COLOR,
  textTransform: "none",
  fontWeight: 700,
  boxShadow: "none",
  "&:hover": {
    backgroundColor: PRIMARY_HOVER,
    boxShadow: "none",
  },
};

const outlinedButtonSx = {
  borderRadius: "12px",
  borderColor: PRIMARY_COLOR,
  color: PRIMARY_COLOR,
  textTransform: "none",
  fontWeight: 700,
  "&:hover": {
    borderColor: PRIMARY_COLOR,
    backgroundColor: "rgba(219,68,68,0.06)",
  },
};

const formatPrice = (price) => `$${Number(price ?? 0).toFixed(2)}`;

export default function Cart() {
  const { data, isLoading, isError } = useCart();
  const { mutate: updateCart, isPending: isUpdating } = useUpdateCart();
  const { mutate: removeFromCart, isPending: isRemoving } = useRemoveFromCart();
  const { mutate: clearCart, isPending: isClearing } = useClearCart();
  const { t } = useTranslation();

  const cartItems = data?.items || [];
  const cartTotal = data?.cartTotal || 0;

  const itemsCount = cartItems.reduce(
    (sum, item) => sum + Number(item.count ?? 0),
    0,
  );

  const handleQuantityChange = (item, count) => {
    if (count < 1) return;

    updateCart({
      productId: item.productId,
      count,
    });
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center px-4">
        <CircularProgress sx={{ color: PRIMARY_COLOR }} />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          Failed to fetch cart items. Please try again later.
        </Alert>
      </div>
    );
  }

  {
    console.log(data);
  }
  {
    console.log(cartTotal);
  }

  return (
    <PageTransition>
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <Typography
            variant="h5"
            component="h1"
            className="font-bold text-zinc-900"
          >
            {t("cart.title")}
          </Typography>

          <Typography variant="body2" className="mt-1 text-zinc-500">
            {t("cart.subtitle")}
          </Typography>
        </div>

        {cartItems.length > 0 && (
          <Button
            variant="outlined"
            onClick={() => clearCart()}
            disabled={isClearing}
            sx={outlinedButtonSx}
          >
            {isClearing ? (
              <CircularProgress size={18} sx={{ color: PRIMARY_COLOR }} />
            ) : (
              t("cart.clear")
            )}
          </Button>
        )}
      </div>

      {cartItems.length === 0 ? (
        <div className="rounded-[26px] border border-dashed border-zinc-200 bg-white p-8 text-center shadow-sm sm:p-10">
          <div className="flex flex-col items-center justify-center gap-3">
            <ShoppingCartOutlined
              sx={{ fontSize: 40 }}
              className="text-zinc-300"
            />

            <Typography variant="body1" className="font-medium text-zinc-500">
              {t("cart.empty")}
            </Typography>

            <Button
              component={Link}
              to="/shop"
              variant="contained"
              sx={{ ...primaryButtonSx, mt: 1 }}
            >
              {t("cart.continueShopping")}
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.6fr_0.8fr]">
          <TableContainer
            component={Paper}
            elevation={0}
            className="h-fit rounded-[22px] border border-zinc-200"
            sx={{ overflowX: "auto" }}
          >
            <Table sx={{ minWidth: 600 }}>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#fafafa" }}>
                  <TableCell sx={{ fontWeight: 700 }}>
                    {t("cart.product")}
                  </TableCell>

                  <TableCell sx={{ fontWeight: 700 }}>
                    {t("cart.price")}
                  </TableCell>

                  <TableCell align="center" sx={{ fontWeight: 700 }}>
                    {t("cart.quantity")}
                  </TableCell>

                  <TableCell sx={{ fontWeight: 700 }}>
                    {t("cart.itemTotal")}
                  </TableCell>

                  <TableCell align="center" sx={{ fontWeight: 700 }}>
                    {t("cart.actions")}
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {cartItems.map((item) => (
                  <TableRow
                    key={item.productId}
                    sx={{
                      "&:last-child td": {
                        borderBottom: 0,
                      },
                      "&:hover": {
                        backgroundColor: "#fafafa",
                      },
                    }}
                  >
                    <TableCell
                      sx={{
                        fontWeight: 600,
                        color: "#18181b",
                      }}
                    >
                      {item.productName}
                    </TableCell>

                    <TableCell>{formatPrice(item.price)}</TableCell>

                    <TableCell align="center">
                      <div className="inline-flex items-center gap-1 rounded-xl border border-zinc-200 bg-white p-0.5">
                        <IconButton
                          size="small"
                          onClick={() =>
                            handleQuantityChange(item, item.count - 1)
                          }
                          disabled={isUpdating || item.count <= 1}
                          sx={{
                            color: PRIMARY_COLOR,
                            "&:hover": {
                              backgroundColor: "rgba(219,68,68,0.08)",
                            },
                          }}
                        >
                          <RemoveRounded fontSize="small" />
                        </IconButton>

                        <Typography
                          variant="body2"
                          className="w-7 text-center font-semibold text-zinc-800"
                        >
                          {item.count}
                        </Typography>

                        <IconButton
                          size="small"
                          onClick={() =>
                            handleQuantityChange(item, item.count + 1)
                          }
                          disabled={isUpdating}
                          sx={{
                            color: PRIMARY_COLOR,
                            "&:hover": {
                              backgroundColor: "rgba(219,68,68,0.08)",
                            },
                          }}
                        >
                          <AddRounded fontSize="small" />
                        </IconButton>
                      </div>
                    </TableCell>

                    <TableCell sx={{ fontWeight: 700 }}>
                      {formatPrice(item.totalPrice)}
                    </TableCell>

                    <TableCell align="center">
                      <IconButton
                        size="small"
                        onClick={() => removeFromCart(item.productId)}
                        disabled={isRemoving}
                        sx={{
                          color: "#a1a1aa",
                          "&:hover": {
                            color: PRIMARY_COLOR,
                            backgroundColor: "rgba(219,68,68,0.08)",
                          },
                        }}
                      >
                        <DeleteOutlineRounded fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Card
            elevation={0}
            className="h-fit rounded-[24px] border border-zinc-200 bg-white shadow-sm"
          >
            <CardContent className="space-y-5 p-5 sm:p-6">
              <Typography variant="h6" className="font-bold text-zinc-900">
                {t("cart.orderSummary")}
              </Typography>

              <div className="flex items-center justify-between text-sm text-zinc-500">
                <span>
                  {itemsCount} {itemsCount === 1 ? "قطعة" : "قطع"}
                </span>

                <span>{formatPrice(cartTotal)}</span>
              </div>

              <div className="border-t border-dashed border-zinc-200 pt-4">
                <div className="flex items-center justify-between">
                  <Typography
                    variant="subtitle1"
                    className="font-bold text-zinc-900"
                  >
                    {t("cart.total")}
                  </Typography>

                  <Typography
                    variant="h6"
                    className="font-extrabold text-[#DB4444]"
                  >
                    {formatPrice(cartTotal)}
                  </Typography>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <Button
                  component={Link}
                  to="/checkout"
                  fullWidth
                  variant="contained"
                  sx={{
                    ...primaryButtonSx,
                    py: 1.2,
                  }}
                >
                  {t("cart.checkout")}
                </Button>

                <Link
                  to="/shop"
                  className="block text-center text-sm font-semibold text-[#DB4444] no-underline transition-opacity hover:opacity-70"
                >
                  {t("cart.continueShopping")}
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </section>
    </PageTransition>
  );
}
