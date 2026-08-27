import React from "react";
import { Chip, Typography } from "@mui/material";

import {
  ReceiptLongOutlined,
  CalendarTodayOutlined,
} from "@mui/icons-material";

import PropTypes from "prop-types";
import useThemeStore from "../../hocks/useThemeStore";
import PageTransition from '../../PageTransition'
const formatDate = (date) => {
  if (!date) return "—";

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(date));
};

const getPaymentLabel = (paymentStatus) => {
  if (!paymentStatus) return "Paid";

  return paymentStatus.charAt(0).toUpperCase() + paymentStatus.slice(1);
};

export default function ProfileOrders({ orders }) {
  const mode = useThemeStore((state) => state.mode);
  const isDark = mode === "dark";

  if (!orders?.length) {
    return (
      <div className="py-12 text-center">
        <ReceiptLongOutlined
          sx={{
            fontSize: 50,
            color: isDark ? "#64748b" : "#a1a1aa",
          }}
        />

        <Typography
          variant="h6"
          className={`mt-3 font-bold ${
            isDark ? "text-slate-100" : "text-zinc-900"
          }`}
        >
          No Orders Yet
        </Typography>

        <Typography
          variant="body2"
          className={`mt-1 ${isDark ? "text-slate-400" : "text-zinc-500"}`}
        >
          Your orders will appear here once you place an order.
        </Typography>
      </div>
    );
  }

  return (
    <PageTransition>
    <div className="space-y-6">
      <div>
        <Typography
          variant="h6"
          className={`font-bold ${isDark ? "text-slate-100" : "text-zinc-900"}`}
        >
          My Orders
        </Typography>

        <Typography
          variant="body2"
          className={`mt-1 ${isDark ? "text-slate-400" : "text-zinc-500"}`}
        >
          View and track all your orders.
        </Typography>
      </div>

      <div
        className={`hidden overflow-hidden rounded-xl border md:block ${
          isDark ? "border-slate-700" : "border-zinc-200"
        }`}
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead
              className={
                isDark
                  ? "bg-slate-800 text-slate-300"
                  : "bg-zinc-50 text-zinc-500"
              }
            >
              <tr>
                <th className="px-5 py-4 text-left text-sm font-semibold">
                  Order ID
                </th>
                <th className="px-5 py-4 text-left text-sm font-semibold">
                  Date
                </th>
                <th className="px-5 py-4 text-left text-sm font-semibold">
                  Amount
                </th>
                <th className="px-5 py-4 text-left text-sm font-semibold">
                  Payment
                </th>
                <th className="px-5 py-4 text-left text-sm font-semibold">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr
                  key={order.id}
                  className={`border-t transition-colors ${
                    isDark
                      ? "border-slate-700 hover:bg-slate-800/60"
                      : "border-zinc-100 hover:bg-zinc-50"
                  }`}
                >
                  <td
                    className={`px-5 py-4 font-semibold ${
                      isDark ? "text-slate-100" : "text-zinc-900"
                    }`}
                  >
                    #{order.id}
                  </td>

                  <td
                    className={`px-5 py-4 text-sm ${
                      isDark ? "text-slate-400" : "text-zinc-500"
                    }`}
                  >
                    {formatDate(order.orderDate)}
                  </td>

                  <td
                    className={`px-5 py-4 font-semibold ${
                      isDark ? "text-slate-100" : "text-zinc-900"
                    }`}
                  >
                    {order.amountPaid} ₪
                  </td>

                  <td className="px-5 py-4">
                    <Chip
                      label={getPaymentLabel(order.paymentStatus)}
                      size="small"
                      color={
                        order.paymentStatus === "unpaid" ? "warning" : "success"
                      }
                    />
                  </td>

                  <td className="px-5 py-4">
                    <Chip
                      label={order.status || "Unknown"}
                      size="small"
                      color="primary"
                      variant="outlined"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="space-y-3 md:hidden">
        {orders.map((order) => (
          <div
            key={order.id}
            className={`rounded-xl border p-4 ${
              isDark
                ? "border-slate-700 bg-slate-800/50"
                : "border-zinc-200 bg-white"
            }`}
          >
            <div className="flex items-center justify-between gap-3">
              <div>
                <Typography
                  className={`font-bold ${
                    isDark ? "text-slate-100" : "text-zinc-900"
                  }`}
                >
                  Order #{order.id}
                </Typography>

                <div
                  className={`mt-1 flex items-center gap-1 text-sm ${
                    isDark ? "text-slate-400" : "text-zinc-500"
                  }`}
                >
                  <CalendarTodayOutlined sx={{ fontSize: 14 }} />
                  {formatDate(order.orderDate)}
                </div>
              </div>

              <Typography
                className={`font-bold ${
                  isDark ? "text-slate-100" : "text-zinc-900"
                }`}
              >
                {order.amountPaid} ₪
              </Typography>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <Chip
                label={getPaymentLabel(order.paymentStatus)}
                size="small"
                color={order.paymentStatus === "unpaid" ? "warning" : "success"}
              />

              <Chip
                label={order.status || "Unknown"}
                size="small"
                color="primary"
                variant="outlined"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
    </PageTransition>
  );
}

ProfileOrders.propTypes = {
  orders: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      amountPaid: PropTypes.number,
      paymentStatus: PropTypes.string,
      status: PropTypes.string,
      orderDate: PropTypes.string,
    }),
  ),
};

ProfileOrders.defaultProps = {
  orders: [],
};
