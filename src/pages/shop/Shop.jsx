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
import useProducts from "../../hocks/useProducts";
import Filter from "../../components/shop/Filter";
import PageTransition from "../../PageTransition";

export default function Shop() {
  const { data = [], isLoading, isError, error, refetch } = useProducts();

  const [filters, setFilters] = useState({
    maxPrice: 500,
    minPrice:0,
    search:"",
    sortBy:"price",
    order:"ascending"

  });

  const filteredProducts = useMemo(() => {
  let result = [...data];

  if (filters.search) {
    result = result.filter((product) =>
      product.name
        .toLowerCase()
        .includes(filters.search.toLowerCase())
    );
  }
  if (filters.minPrice !== "") {
    result = result.filter(
      (product) => product.price >= Number(filters.minPrice)
    );
  }
  if (filters.maxPrice !== "") {
    result = result.filter(
      (product) => product.price <= Number(filters.maxPrice)
    );
  }

  result.sort((a, b) => {
    const direction =
      filters.order === "ascending" ? 1 : -1;

    if (filters.sortBy === "name") {
      return a.name.localeCompare(b.name) * direction;
    }

    return (a[filters.sortBy] - b[filters.sortBy]) * direction;
  });

  return result;
}, [data, filters]);

  if (isLoading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <CircularProgress />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-8">
        <Alert
          severity="error"
          action={
            <Button color="inherit" size="small" onClick={refetch}>
              Retry
            </Button>
          }
        >
          {error?.message || "Unable to load products."}
        </Alert>
      </div>
    );
  }

  return (
    <PageTransition>
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Typography
            variant="h4"
            className="font-semibold text-slate-800"
          >
            Shop
          </Typography>

          <Typography variant="body2" className="text-slate-500">
            Browse all products and find what you need.
          </Typography>
        </div>

        <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        
          <Filter filters={filters} setFilters={setFilters} />
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredProducts.length === 0 ? (
              <div className="col-span-full rounded-[24px] border border-dashed border-slate-200 bg-white p-8 text-center text-slate-500">
                No products match the selected filters.
              </div>
            ) : (
              filteredProducts.map((product) => (
                <Card
                  key={product.id}
                  className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm"
                >
                  <Link to={`/products/${product.id}`} className="block">
                    <img
                      src={product.image}
                      alt={product.name}
                       className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    <CardContent className="space-y-3 p-5">
                      <Typography
                        variant="h6"
                        className="font-semibold text-slate-800"
                      >
                        {product.name}
                      </Typography>

                      <Rating
                        value={product.rate}
                        readOnly
                        size="small"
                      />

                      <Typography
                        variant="subtitle1"
                        className="font-semibold text-[#091E27]"
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
    </PageTransition>
  );
}