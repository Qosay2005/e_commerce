import React, { useState } from "react";

import {
  Alert,
  Box,
  Button,
  CircularProgress,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

import {
  PersonOutlineOutlined,
  ReceiptLongOutlined,
  SettingsOutlined,
} from "@mui/icons-material";

import { useTranslation } from "react-i18next";

import useProfile from "../../hocks/useProfile";
import useThemeStore from "../../hocks/useThemeStore";

import ProfileInfo from "../../components/profile/ProfileInfo";
import ProfileOrders from "../../components/profile/ProfileOrders";
import ProfileSettings from "../../components/profile/ProfileSettings";
import PageTransition from '../../PageTransition'
const PRIMARY_COLOR = "#DB4444";

const MENU_ITEMS = [
  {
    id: "account",
    icon: PersonOutlineOutlined,
    label: "profile.menu.account",
    fallback: "Account Information",
  },
  {
    id: "orders",
    icon: ReceiptLongOutlined,
    label: "profile.menu.orders",
    fallback: "Orders",
  },
  {
    id: "settings",
    icon: SettingsOutlined,
    label: "profile.menu.settings",
    fallback: "Settings",
  },
];

export default function ProfileLayout() {
  const { t } = useTranslation();

  const mode = useThemeStore((state) => state.mode);
  const isDark = mode === "dark";

  const [activeTab, setActiveTab] = useState("account");

  const {
    data: profile,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useProfile();

  if (isLoading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <CircularProgress sx={{ color: PRIMARY_COLOR }} />
      </div>
    );
  }
  if (isError) {
    return (
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <Alert
          severity="error"
          action={
            <Button color="inherit" size="small" onClick={() => refetch()}>
              {t("common.retry", {
                defaultValue: "Retry",
              })}
            </Button>
          }
        >
          {error?.response?.data?.message ||
            error?.message ||
            "Failed to load profile"}
        </Alert>
      </section>
    );
  }

  return (
    <PageTransition>
    <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      <div className="mb-6 sm:mb-8">
        <Typography
          component="h1"
          variant="h4"
          className={`font-extrabold tracking-tight ${
            isDark ? "text-slate-100" : "text-zinc-900"
          }`}
        >
          {t("profile.title", {
            defaultValue: "Profile",
          })}
        </Typography>

        <Typography
          variant="body2"
          className={`mt-2 ${isDark ? "text-slate-400" : "text-zinc-500"}`}
        >
          {t("profile.subtitle", {
            defaultValue: "Manage your account and orders",
          })}
        </Typography>
      </div>

      <div className="grid gap-5 md:grid-cols-[220px_minmax(0,1fr)] md:gap-6">
        <Box
          className={`h-fit rounded-2xl border p-2 ${
            isDark
              ? "border-slate-700 bg-slate-900"
              : "border-zinc-200 bg-white"
          }`}
        >
          <List
            disablePadding
            className="flex min-w-max gap-1 overflow-x-auto md:block md:min-w-0"
          >
            {MENU_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <ListItemButton
                  key={item.id}
                  selected={isActive}
                  onClick={() => setActiveTab(item.id)}
                  sx={{
                    minHeight: 46,
                    borderRadius: "10px",
                    flexShrink: 0,
                    px: { xs: 1.5, md: 1.5 },
                    mb: { md: 0.5 },

                    "&.Mui-selected": {
                      backgroundColor: isDark
                        ? "rgba(219, 68, 68, 0.14)"
                        : "rgba(219, 68, 68, 0.08)",
                    },

                    "&.Mui-selected:hover": {
                      backgroundColor: isDark
                        ? "rgba(219, 68, 68, 0.20)"
                        : "rgba(219, 68, 68, 0.13)",
                    },

                    "&:hover": {
                      backgroundColor: isDark
                        ? "rgba(148, 163, 184, 0.08)"
                        : "rgba(0, 0, 0, 0.03)",
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: { xs: 30, md: 38 },
                      color: isActive
                        ? PRIMARY_COLOR
                        : isDark
                          ? "#94a3b8"
                          : "#71717a",
                    }}
                  >
                    <Icon fontSize="small" />
                  </ListItemIcon>

                  <ListItemText
                    primary={t(item.label, {
                      defaultValue: item.fallback,
                    })}
                    primaryTypographyProps={{
                      fontSize: {
                        xs: "0.82rem",
                        md: "0.875rem",
                      },
                      whiteSpace: "nowrap",
                      fontWeight: isActive ? 700 : 500,
                      color: isActive
                        ? PRIMARY_COLOR
                        : isDark
                          ? "#cbd5e1"
                          : "#52525b",
                    }}
                  />
                </ListItemButton>
              );
            })}
          </List>
        </Box>

        <Box
          className={`min-w-0 rounded-2xl border ${
            isDark
              ? "border-slate-700 bg-slate-900"
              : "border-zinc-200 bg-white"
          }`}
        >
          <div className="p-4 sm:p-6 lg:p-7">
            {activeTab === "account" && (
              <ProfileInfo
                profile={profile}
                isRefreshing={isFetching}
                onProfileUpdated={refetch}
              />
            )}

            {activeTab === "orders" && (
              <ProfileOrders
                orders={profile?.orders || []}
                isRefreshing={isFetching}
              />
            )}

            {activeTab === "settings" && (
              <ProfileSettings profile={profile} onProfileUpdated={refetch} />
            )}
          </div>
        </Box>
      </div>
    </section>
    </PageTransition>
  );
}
