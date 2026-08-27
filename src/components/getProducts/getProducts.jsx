import {
  Alert,
  Button,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Rating,
  Typography,
} from "@mui/material";
import {
  ImageNotSupportedOutlined,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useProducts from "../../hocks/useProducts";

export default function GetProducts() {
  const { t } = useTranslation();
  const { data: products, isLoading, isError, error, refetch } = useProducts();

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-white dark:bg-zinc-950">
        <CircularProgress sx={{ color: "#DB4444" }} />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mx-auto max-w-7xl bg-white px-4 py-8 dark:bg-zinc-950 sm:px-6 lg:px-8">
        <Alert
          severity="error"
          action={
            <Button color="inherit" size="small" onClick={refetch}>
              {t("common.retry")}
            </Button>
          }
        >
          {error?.message || t("products.loadError")}
        </Alert>
      </div>
    );
  }

  return (
    <section className="bg-white dark:bg-zinc-950">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="mb-3 flex items-center gap-3">
            <span className="h-7 w-4 rounded-[3px] bg-gradient-to-b from-[#FF6B6B] to-[#DB4444]" />

            <Typography
              variant="subtitle2"
              className="font-bold uppercase tracking-[0.12em] text-[#DB4444]"
            >
              {t("products.ourProducts")}
            </Typography>
          </div>

          <Typography
            variant="h4"
            component="h2"
            className="text-2xl font-extrabold tracking-tight text-zinc-900 dark:text-white sm:text-3xl"
          >
            {t("products.title")}
          </Typography>
        </div>

        <div className="mx-auto flex max-w-7xl flex-wrap justify-start gap-3 px-4 sm:gap-4 md:justify-center md:gap-5">
          {products.map((product) => {
            const { id, name, price, rate, image } = product;
            const productUrl = `/products/${id}`;

            return (
              <Card
                key={id}
                elevation={0}
                className="group flex w-full max-w-[320px] flex-col overflow-hidden rounded-[30px] border border-gray-300 bg-white transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_10px_30px_-10px_rgba(219,68,78,0.30)] dark:border-zinc-700 dark:bg-zinc-900"
              >
                <Link to={productUrl} className="block no-underline">
                  <div className="overflow-hidden bg-zinc-50 dark:bg-zinc-800">
                    {image ? (
                      <CardMedia
                        component="img"
                        image={image}
                        alt={name}
                        loading="lazy"
                        className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-48 flex-col items-center justify-center gap-2 bg-zinc-100 text-zinc-400 dark:bg-zinc-800 dark:text-zinc-500">
                        <ImageNotSupportedOutlined sx={{ fontSize: 28 }} />
                        <span className="text-xs font-medium">
                          {t("productDetails.noImage")}
                        </span>
                      </div>
                    )}
                  </div>
                </Link>

                <CardContent className="flex flex-1 flex-col gap-3 p-5">
                  <Link to={productUrl} className="no-underline">
                    <Typography
                      variant="h6"
                      component="h3"
                      className="font-bold leading-snug text-zinc-900 transition-colors duration-200 group-hover:text-[#DB4444] dark:text-white"
                    >
                      {name}
                    </Typography>
                  </Link>

                  <div className="flex items-center gap-2">
                    <Rating
                      value={rate}
                      precision={0.5}
                      readOnly
                      size="small"
                    />

                    <span className="text-sm text-zinc-400 dark:text-zinc-500">({rate})</span>
                  </div>

                  <Typography
                    variant="h6"
                    className="font-extrabold text-zinc-900 dark:text-white"
                  >
                    ${price}
                  </Typography>

                  <Button
                    component={Link}
                    to={productUrl}
                    fullWidth
                    sx={{
                      mt: "auto",
                      borderRadius: "12px",
                      textTransform: "none",
                      fontWeight: 700,
                      py: 1,
                      color: "#DB4444",
                      border: "1.5px solid #DB4444",
                      "&:hover": {
                        backgroundColor: "#DB4444",
                        color: "#fff",
                      },
                    }}
                  >
                    {t("products.details")}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
