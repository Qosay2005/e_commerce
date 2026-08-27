
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
import useThemeStore from "../../hocks/useThemeStore";

import PageTransition from "../../PageTransition";

const PRIMARY_COLOR = "#DB4444";
const PRIMARY_HOVER = "#C53636";

const formatPrice = (price) => `$${Number(price ?? 0).toFixed(2)}`;

export default function Cart() {
  const { t } = useTranslation();

  const mode = useThemeStore((state) => state.mode);
  const isDark = mode === "dark";

  const { data, isLoading, isError } = useCart();

  const { mutate: updateCart, isPending: isUpdating } = useUpdateCart();
  const { mutate: removeFromCart, isPending: isRemoving } =
    useRemoveFromCart();
  const { mutate: clearCart, isPending: isClearing } = useClearCart();

  const cartItems = data?.items || [];
  const cartTotal = data?.cartTotal || 0;

  const itemsCount = cartItems.reduce(
    (sum, item) => sum + Number(item.count ?? 0),
    0,
  );

  // -----------------------------
  // Colors
  // -----------------------------

  const textPrimary = isDark ? "#f8fafc" : "#18181b";
  const textSecondary = isDark ? "#94a3b8" : "#71717a";

  const borderColor = isDark ? "#334155" : "#e4e4e7";

  const cardBackground = isDark ? "#111827" : "#ffffff";

  const tableHeaderBackground = isDark ? "#1e293b" : "#fafafa";

  const tableHoverBackground = isDark ? "#1e293b" : "#fafafa";

  // -----------------------------
  // Handlers
  // -----------------------------

  const handleQuantityChange = (item, count) => {
    if (count < 1) return;

    updateCart({
      productId: item.productId,
      count,
    });
  };

  // -----------------------------
  // Loading
  // -----------------------------

  if (isLoading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center px-4">
        <CircularProgress sx={{ color: PRIMARY_COLOR }} />
      </div>
    );
  }

  // -----------------------------
  // Error
  // -----------------------------

  if (isError) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Alert severity="error">
          <AlertTitle>{t("common.error")}</AlertTitle>
          {t("cart.loadError")}
        </Alert>
      </div>
    );
  }

  return (
    <PageTransition>
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Typography
              variant="h5"
              component="h1"
              sx={{
                color: textPrimary,
                fontWeight: 700,
              }}
            >
              {t("cart.title")}
            </Typography>

            <Typography
              variant="body2"
              sx={{
                color: textSecondary,
                marginTop: "4px",
              }}
            >
              {t("cart.subtitle")}
            </Typography>
          </div>

          {cartItems.length > 0 && (
            <Button
              variant="outlined"
              onClick={() => clearCart()}
              disabled={isClearing}
              sx={{
                borderRadius: "12px",
                borderColor: PRIMARY_COLOR,
                color: PRIMARY_COLOR,
                textTransform: "none",
                fontWeight: 700,

                "&:hover": {
                  borderColor: PRIMARY_COLOR,
                  backgroundColor: isDark
                    ? "rgba(219,68,68,0.12)"
                    : "rgba(219,68,68,0.06)",
                },
              }}
            >
              {isClearing ? (
                <CircularProgress
                  size={18}
                  sx={{ color: PRIMARY_COLOR }}
                />
              ) : (
                t("cart.clear")
              )}
            </Button>
          )}
        </div>

        {/* Empty Cart */}
        {cartItems.length === 0 ? (
          <div
            className="rounded-[26px] border border-dashed p-8 text-center shadow-sm sm:p-10"
            style={{
              borderColor,
              backgroundColor: cardBackground,
            }}
          >
            <div className="flex flex-col items-center justify-center gap-3">
              <ShoppingCartOutlined
                sx={{
                  fontSize: 40,
                  color: isDark ? "#475569" : "#d4d4d8",
                }}
              />

              <Typography
                variant="body1"
                sx={{
                  color: textSecondary,
                  fontWeight: 500,
                }}
              >
                {t("cart.empty")}
              </Typography>

              <Button
                component={Link}
                to="/shop"
                variant="contained"
                sx={{
                  mt: 1,
                  borderRadius: "12px",
                  backgroundColor: PRIMARY_COLOR,
                  textTransform: "none",
                  fontWeight: 700,
                  boxShadow: "none",

                  "&:hover": {
                    backgroundColor: PRIMARY_HOVER,
                    boxShadow: "none",
                  },
                }}
              >
                {t("cart.continueShopping")}
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.6fr_0.8fr]">
            {/* Cart Table */}
            <TableContainer
              component={Paper}
              elevation={0}
              sx={{
                overflowX: "auto",
                borderRadius: "22px",
                border: `1px solid ${borderColor}`,
                backgroundColor: cardBackground,
              }}
            >
              <Table sx={{ minWidth: 600 }}>
                {/* Table Head */}
                <TableHead>
                  <TableRow
                    sx={{
                      backgroundColor: tableHeaderBackground,
                    }}
                  >
                    <TableCell
                      sx={{
                        fontWeight: 700,
                        color: textPrimary,
                        borderBottomColor: borderColor,
                      }}
                    >
                      {t("cart.product")}
                    </TableCell>

                    <TableCell
                      sx={{
                        fontWeight: 700,
                        color: textPrimary,
                        borderBottomColor: borderColor,
                      }}
                    >
                      {t("cart.price")}
                    </TableCell>

                    <TableCell
                      align="center"
                      sx={{
                        fontWeight: 700,
                        color: textPrimary,
                        borderBottomColor: borderColor,
                      }}
                    >
                      {t("cart.quantity")}
                    </TableCell>

                    <TableCell
                      sx={{
                        fontWeight: 700,
                        color: textPrimary,
                        borderBottomColor: borderColor,
                      }}
                    >
                      {t("cart.itemTotal")}
                    </TableCell>

                    <TableCell
                      align="center"
                      sx={{
                        fontWeight: 700,
                        color: textPrimary,
                        borderBottomColor: borderColor,
                      }}
                    >
                      {t("cart.actions")}
                    </TableCell>
                  </TableRow>
                </TableHead>

                {/* Table Body */}
                <TableBody>
                  {cartItems.map((item) => (
                    <TableRow
                      key={item.productId}
                      sx={{
                        "&:last-child td": {
                          borderBottom: 0,
                        },

                        "&:hover": {
                          backgroundColor: tableHoverBackground,
                        },
                      }}
                    >
                      {/* Product */}
                      <TableCell
                        sx={{
                          fontWeight: 600,
                          color: textPrimary,
                          borderBottomColor: borderColor,
                        }}
                      >
                        {item.productName}
                      </TableCell>

                      {/* Price */}
                      <TableCell
                        sx={{
                          color: textSecondary,
                          borderBottomColor: borderColor,
                        }}
                      >
                        {formatPrice(item.price)}
                      </TableCell>

                      {/* Quantity */}
                      <TableCell
                        align="center"
                        sx={{
                          borderBottomColor: borderColor,
                        }}
                      >
                        <div
                          className="inline-flex items-center gap-1 rounded-xl border p-0.5"
                          style={{
                            borderColor,
                            backgroundColor: cardBackground,
                          }}
                        >
                          <IconButton
                            size="small"
                            onClick={() =>
                              handleQuantityChange(
                                item,
                                item.count - 1,
                              )
                            }
                            disabled={
                              isUpdating || item.count <= 1
                            }
                            sx={{
                              color: PRIMARY_COLOR,

                              "&:hover": {
                                backgroundColor:
                                  "rgba(219,68,68,0.08)",
                              },
                            }}
                          >
                            <RemoveRounded fontSize="small" />
                          </IconButton>

                          <Typography
                            variant="body2"
                            sx={{
                              width: 28,
                              textAlign: "center",
                              fontWeight: 600,
                              color: textPrimary,
                            }}
                          >
                            {item.count}
                          </Typography>

                          <IconButton
                            size="small"
                            onClick={() =>
                              handleQuantityChange(
                                item,
                                item.count + 1,
                              )
                            }
                            disabled={isUpdating}
                            sx={{
                              color: PRIMARY_COLOR,

                              "&:hover": {
                                backgroundColor:
                                  "rgba(219,68,68,0.08)",
                              },
                            }}
                          >
                            <AddRounded fontSize="small" />
                          </IconButton>
                        </div>
                      </TableCell>

                      {/* Item Total */}
                      <TableCell
                        sx={{
                          fontWeight: 700,
                          color: textPrimary,
                          borderBottomColor: borderColor,
                        }}
                      >
                        {formatPrice(item.totalPrice)}
                      </TableCell>

                      {/* Actions */}
                      <TableCell
                        align="center"
                        sx={{
                          borderBottomColor: borderColor,
                        }}
                      >
                        <IconButton
                          size="small"
                          onClick={() =>
                            removeFromCart(item.productId)
                          }
                          disabled={isRemoving}
                          sx={{
                            color: isDark ? "#64748b" : "#a1a1aa",

                            "&:hover": {
                              color: PRIMARY_COLOR,
                              backgroundColor:
                                "rgba(219,68,68,0.08)",
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

            {/* Order Summary */}
            <Card
              elevation={0}
              sx={{
                height: "fit-content",
                borderRadius: "24px",
                border: `1px solid ${borderColor}`,
                backgroundColor: cardBackground,
                boxShadow: isDark
                  ? "none"
                  : "0 1px 3px rgba(0,0,0,0.05)",
              }}
            >
              <CardContent className="space-y-5 p-5 sm:p-6">
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    color: textPrimary,
                  }}
                >
                  {t("cart.orderSummary")}
                </Typography>

                {/* Items Count */}
                <div
                  className="flex items-center justify-between text-sm"
                  style={{
                    color: textSecondary,
                  }}
                >
                  <span>
                    {t("cart.itemsCount", {
                      count: itemsCount,
                    })}
                  </span>

                  <span>{formatPrice(cartTotal)}</span>
                </div>

                {/* Total */}
                <div
                  className="border-t border-dashed pt-4"
                  style={{
                    borderColor,
                  }}
                >
                  <div className="flex items-center justify-between">
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: 700,
                        color: textPrimary,
                      }}
                    >
                      {t("cart.total")}
                    </Typography>

                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 800,
                        color: PRIMARY_COLOR,
                      }}
                    >
                      {formatPrice(cartTotal)}
                    </Typography>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex flex-col gap-4">
                  <Button
                    component={Link}
                    to="/checkout"
                    fullWidth
                    variant="contained"
                    sx={{
                      borderRadius: "12px",
                      backgroundColor: PRIMARY_COLOR,
                      textTransform: "none",
                      fontWeight: 700,
                      py: 1.2,
                      boxShadow: "none",

                      "&:hover": {
                        backgroundColor: PRIMARY_HOVER,
                        boxShadow: "none",
                      },
                    }}
                  >
                    {t("cart.checkout")}
                  </Button>

                  <Link
                    to="/shop"
                    className="block text-center text-sm font-semibold no-underline transition-opacity hover:opacity-70"
                    style={{
                      color: PRIMARY_COLOR,
                    }}
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

