import { useMemo, useState } from "react";

import {
  Alert,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Rating,
  Typography,
} from "@mui/material";

import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import useProducts from "../../hocks/useProducts";
import Filter from "../../components/shop/Filter";
import PageTransition from "../../PageTransition";

export default function Shop() {
  const { t } = useTranslation();
  const { data = [], isLoading, isError, error, refetch } = useProducts();

  const [filters, setFilters] = useState({
    maxPrice: 500,
    minPrice: 0,
    search: "",
    sortBy: "price",
    order: "ascending",
  });

  const filteredProducts = useMemo(() => {
    let result = [...data];

    // Search
    if (filters.search) {
      result = result.filter((product) =>
        product.name
          .toLowerCase()
          .includes(filters.search.toLowerCase())
      );
    }

    // Minimum Price
    if (filters.minPrice !== "") {
      result = result.filter(
        (product) => product.price >= Number(filters.minPrice)
      );
    }

    // Maximum Price
    if (filters.maxPrice !== "") {
      result = result.filter(
        (product) => product.price <= Number(filters.maxPrice)
      );
    }

    // Sorting
    result.sort((a, b) => {
      const direction =
        filters.order === "ascending" ? 1 : -1;

      if (filters.sortBy === "name") {
        return a.name.localeCompare(b.name) * direction;
      }

      return (
        (a[filters.sortBy] - b[filters.sortBy]) * direction
      );
    });

    return result;
  }, [data, filters]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white dark:bg-zinc-950">
        <CircularProgress />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-white px-4 py-8 dark:bg-zinc-950">
        <div className="mx-auto max-w-6xl">
          <Alert
            severity="error"
            action={
              <Button
                color="inherit"
                size="small"
                onClick={refetch}
              >
                {t("common.retry")}
              </Button>
            }
          >
            {error?.message || t("shop.loadError")}
          </Alert>
        </div>
      </div>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-white dark:bg-zinc-950">

        <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

          {/* Header */}
          <div className="mb-6">

            <Typography
              variant="h4"
              className="font-semibold text-slate-800 dark:text-white"
            >
              {t("shop.title")}
            </Typography>

            <Typography
              variant="body2"
              className="text-slate-500 dark:text-zinc-300"
            >
              {t("shop.subtitle")}
            </Typography>

          </div>

          <div className="grid gap-6 lg:grid-cols-[280px_1fr]">

            {/* Filter */}
            <Filter
              filters={filters}
              setFilters={setFilters}
            />

            {/* Products */}
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

              {filteredProducts.length === 0 ? (

                <div
                  className="
                    col-span-full
                    rounded-[24px]
                    border
                    border-slate-200
                    bg-white
                    p-8
                    text-center
                    text-slate-500
                    dark:border-zinc-700
                    dark:bg-zinc-900
                    dark:text-zinc-300
                  "
                >
                  {t("shop.noResults")}
                </div>

              ) : (

                filteredProducts.map((product) => (

                  <Card
                    key={product.id}
                    className="
                      group
                      overflow-hidden
                      rounded-[24px]
                      border
                      border-slate-200
                      bg-white
                      shadow-sm

                      dark:border-zinc-700
                      dark:!bg-zinc-900
                    "
                  >

                    <Link
                      to={`/products/${product.id}`}
                      className="block"
                    >

                      {/* Image */}
                      <img
                        src={product.image}
                        alt={product.name}
                        className="
                          w-full
                          object-cover
                          transition-transform
                          duration-700
                          group-hover:scale-105
                        "
                      />

                      <CardContent className="space-y-3 p-5">

                        {/* Product Name */}
                        <Typography
                          variant="h6"
                          className="
                            font-semibold
                            text-slate-800
                            dark:text-white
                          "
                        >
                          {product.name}
                        </Typography>

                        {/* Rating */}
                        <Rating
                          value={product.rate}
                          readOnly
                          size="small"
                        />

                        {/* Price */}
                        <Typography
                          variant="subtitle1"
                          className="
                            font-semibold
                            text-[#091E27]
                            dark:!text-white
                          "
                        >
                          ${product.price}
                        </Typography>

                      </CardContent>

                    </Link>

                  </Card>

                ))
              )}

            </div>

          </div>

        </section>

      </div>
    </PageTransition>
  );
}