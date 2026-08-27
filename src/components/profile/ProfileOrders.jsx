
import React from "react";
import PropTypes from "prop-types";

import {
  Chip,
  CircularProgress,
  Divider,
  Typography,
} from "@mui/material";

import {
  CalendarTodayOutlined,
  CheckCircleOutlineOutlined,
  PaymentsOutlined,
  ReceiptLongOutlined,
} from "@mui/icons-material";

import { useTranslation } from "react-i18next";
import useThemeStore from "../../hocks/useThemeStore";

const PRIMARY_COLOR = "#DB4444";

export default function ProfileOrders({ orders, isRefreshing }) {
  const { t } = useTranslation();

  const mode = useThemeStore((state) => state.mode);
  const isDark = mode === "dark";

  // ترتيب الطلبات من الأحدث إلى الأقدم
  const sortedOrders = [...orders].sort((a, b) => {
    return new Date(b.orderDate) - new Date(a.orderDate);
  });

  // تنسيق التاريخ
  const formatDate = (date) => {
    if (!date) return "—";

    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(date));
  };

  // تحديد لون حالة الطلب
  const getOrderStatusColor = (status) => {
    const normalizedStatus = status?.toLowerCase();

    if (normalizedStatus === "active") {
      return "success";
    }

    if (normalizedStatus === "pending") {
      return "warning";
    }

    if (normalizedStatus === "cancelled") {
      return "error";
    }

    return "default";
  };

  // تحديد لون حالة الدفع
  const getPaymentStatusColor = (status) => {
    const normalizedStatus = status?.toLowerCase();

    if (normalizedStatus === "paid") {
      return "success";
    }

    if (normalizedStatus === "unpaid") {
      return "error";
    }

    if (normalizedStatus === "pending") {
      return "warning";
    }

    return "default";
  };

  // النص الذي سيظهر لحالة الدفع
  const getPaymentStatusLabel = (status) => {
    if (!status) {
      return "Not specified";
    }

    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <Typography
            variant="h6"
            className={`font-bold ${
              isDark ? "text-slate-100" : "text-zinc-900"
            }`}
          >
            {t("profile.orders.title", {
              defaultValue: "My Orders",
            })}
          </Typography>

          <Typography
            variant="body2"
            className={`mt-1 ${
              isDark ? "text-slate-400" : "text-zinc-500"
            }`}
          >
            {t("profile.orders.description", {
              defaultValue: "View your order history and payment details",
            })}
          </Typography>
        </div>

        {/* عدد الطلبات */}
        <Chip
          label={`${orders.length} ${
            orders.length === 1 ? "Order" : "Orders"
          }`}
          sx={{
            fontWeight: 700,
            backgroundColor: isDark
              ? "rgba(219, 68, 68, 0.15)"
              : "rgba(219, 68, 68, 0.08)",
            color: PRIMARY_COLOR,
          }}
        />
      </div>

      <Divider
        sx={{
          borderColor: isDark ? "#334155" : "#e4e4e7",
        }}
      />

      {/* Loading */}
      {isRefreshing && orders.length === 0 ? (
        <div className="flex justify-center py-12">
          <CircularProgress sx={{ color: PRIMARY_COLOR }} />
        </div>
      ) : sortedOrders.length === 0 ? (
        /* Empty State */
        <div
          className={`flex flex-col items-center justify-center rounded-xl border py-14 text-center ${
            isDark
              ? "border-slate-700 bg-slate-800/50"
              : "border-zinc-200 bg-zinc-50/70"
          }`}
        >
          <ReceiptLongOutlined
            sx={{
              fontSize: 52,
              color: isDark ? "#64748b" : "#a1a1aa",
            }}
          />

          <Typography
            variant="h6"
            className={`mt-4 font-bold ${
              isDark ? "text-slate-200" : "text-zinc-800"
            }`}
          >
            {t("profile.orders.emptyTitle", {
              defaultValue: "No orders yet",
            })}
          </Typography>

          <Typography
            variant="body2"
            className={`mt-1 ${
              isDark ? "text-slate-400" : "text-zinc-500"
            }`}
          >
            {t("profile.orders.emptyDescription", {
              defaultValue:
                "Your orders will appear here once you make a purchase.",
            })}
          </Typography>
        </div>
      ) : (
        /* Orders List */
        <div
          className={`space-y-3 transition-opacity ${
            isRefreshing ? "opacity-70" : ""
          }`}
        >
          {sortedOrders.map((order) => (
            <div
              key={order.id}
              className={`rounded-xl border p-4 ${
                isDark
                  ? "border-slate-700 bg-slate-800/50"
                  : "border-zinc-200 bg-zinc-50/70"
              }`}
            >
              {/* الجزء العلوي من الطلب */}
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-full ${
                      isDark ? "bg-slate-700" : "bg-red-50"
                    }`}
                  >
                    <ReceiptLongOutlined sx={{ color: PRIMARY_COLOR }} />
                  </div>

                  <div>
                    <Typography
                      variant="subtitle1"
                      className={`font-bold ${
                        isDark ? "text-slate-100" : "text-zinc-900"
                      }`}
                    >
                      Order #{order.id}
                    </Typography>

                    <div className="mt-1 flex items-center gap-1">
                      <CalendarTodayOutlined
                        sx={{
                          fontSize: 14,
                          color: isDark ? "#94a3b8" : "#71717a",
                        }}
                      />

                      <Typography
                        variant="caption"
                        className={
                          isDark ? "text-slate-400" : "text-zinc-500"
                        }
                      >
                        {formatDate(order.orderDate)}
                      </Typography>
                    </div>
                  </div>
                </div>

                {/* حالة الطلب */}
                <Chip
                  icon={<CheckCircleOutlineOutlined />}
                  label={order.status || "Unknown"}
                  color={getOrderStatusColor(order.status)}
                  size="small"
                  sx={{ fontWeight: 700 }}
                />
              </div>

              <Divider
                sx={{
                  my: 2,
                  borderColor: isDark ? "#334155" : "#e4e4e7",
                }}
              />

              {/* تفاصيل الدفع */}
              <div className="grid gap-4 sm:grid-cols-2">
                {/* المبلغ المدفوع */}
                <div className="flex items-center gap-3">
                  <PaymentsOutlined
                    sx={{
                      color: isDark ? "#94a3b8" : "#71717a",
                    }}
                  />

                  <div>
                    <Typography
                      variant="caption"
                      className={`block ${
                        isDark ? "text-slate-400" : "text-zinc-500"
                      }`}
                    >
                      {t("profile.orders.amountPaid", {
                        defaultValue: "Amount Paid",
                      })}
                    </Typography>

                    <Typography
                      variant="body1"
                      className={`font-bold ${
                        isDark ? "text-slate-100" : "text-zinc-900"
                      }`}
                    >
                      {order.amountPaid ?? 0}
                    </Typography>
                  </div>
                </div>

                {/* حالة الدفع */}
                <div className="flex items-center justify-between gap-3">
                  <Typography
                    variant="body2"
                    className={isDark ? "text-slate-400" : "text-zinc-500"}
                  >
                    {t("profile.orders.paymentStatus", {
                      defaultValue: "Payment Status",
                    })}
                  </Typography>

                  <Chip
                    label={getPaymentStatusLabel(order.paymentStatus)}
                    color={getPaymentStatusColor(order.paymentStatus)}
                    size="small"
                    variant="outlined"
                    sx={{ fontWeight: 700 }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

ProfileOrders.propTypes = {
  orders: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      amountPaid: PropTypes.number,
      paymentStatus: PropTypes.string,
      status: PropTypes.string,
      orderDate: PropTypes.string,
    })
  ),
  isRefreshing: PropTypes.bool,
};

ProfileOrders.defaultProps = {
  orders: [],
  isRefreshing: false,
};
