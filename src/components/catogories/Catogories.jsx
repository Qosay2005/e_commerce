import React, { useRef } from "react";

import {
  Alert,
  Button,
  Card,
  CircularProgress,
  Typography,
} from "@mui/material";

import { CategoryOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useCatogories from "../../hocks/useCatogories";

export default function Catogories() {
  const { t } = useTranslation();
  const { data, isLoading, isError, error, refetch } = useCatogories();

  const scrollRef = useRef(null);

  if (isLoading) {
    return (
      <div className="flex justify-center py-6">
        <CircularProgress sx={{ color: "#DB4444" }} />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <Alert
          severity="error"
          action={
            <Button color="inherit" size="small" onClick={refetch}>
              {t("common.retry")}
            </Button>
          }
        >
          {error?.message || t("categories.loadError")}
        </Alert>
      </div>
    );
  }

  const scrollByAmount = (amount) => {
    scrollRef.current?.scrollBy({
      left: amount,
      behavior: "smooth",
    });
  };

  return (
    <section className="mx-auto max-w-7xl bg-white px-4 py-10 transition-colors duration-300 dark:bg-zinc-950 sm:px-6 lg:px-8">
      <div className="mb-3 flex items-center gap-3">
        <span className="h-7 w-4 rounded-[3px] bg-gradient-to-b from-[#FF6B6B] to-[#DB4444]" />

        <Typography
          variant="subtitle2"
          className="font-bold uppercase tracking-[0.12em] text-[#DB4444]"
        >
          {t("categories.label")}
        </Typography>
      </div>

      <div className="mb-8 flex items-end justify-between">
        <Typography
          variant="h4"
          className="text-2xl font-extrabold tracking-tight text-zinc-900 transition-colors duration-300 dark:text-white sm:text-3xl"
        >
          {t("categories.title")}
        </Typography>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-5 grid overflow-x-auto scroll-smooth pb-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        style={{ scrollbarWidth: "none" }}
      >
        {data.map((category) => (
          <Card
            key={category.id}
            component={Link}
            to="/shop"
            elevation={0}
            className="group flex min-w-[136px] flex-1 basis-[136px] flex-col items-center justify-center gap-4 rounded-2xl border border-zinc-200 bg-white py-8 no-underline shadow-lg transition-all duration-400 ease-out hover:shadow-[0_12px_30px_-8px_rgba(219,68,68,0.45)] dark:border-zinc-800 dark:bg-zinc-900 sm:min-w-[156px]"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-zinc-100 transition-all duration-400 ease-out group-hover:scale-105 group-hover:bg-[#DB4444] dark:bg-zinc-800">
              {category.image ? (
                <img
                  src={category.image}
                  alt={category.name}
                  className="h-8 w-8 rounded object-cover"
                />
              ) : (
                <CategoryOutlined
                  sx={{ fontSize: 26 }}
                  className="text-zinc-500 transition-colors duration-300 group-hover:text-white dark:text-zinc-400"
                />
              )}
            </span>

            <Typography
              variant="body2"
              className="font-semibold text-zinc-700 transition-colors duration-300 group-hover:text-[#DB4444] dark:text-white"
            >
              {category.name}
            </Typography>
          </Card>
        ))}
      </div>
    </section>
  );
}