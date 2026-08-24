import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Alert,
  Button,
  Chip,
  CircularProgress,
  Divider,
  Rating,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import {
  AddShoppingCartRounded,
  ArrowBackRounded,
  ImageNotSupportedOutlined,
} from "@mui/icons-material";

import useProduct from "../../hocks/useProduct";
import useAddToCart from "../../hocks/useAddToCart";
import useAddReview from "../../hocks/useAddReview";

const PRIMARY_COLOR = "#DB4444";
const PRIMARY_HOVER = "#C53636";

export default function ProductDetails() {
  const { id } = useParams();

  const [reviewForm, setReviewForm] = useState({
    rating: 5,
    comment: "",
  });

  const [isCartAlertOpen, setIsCartAlertOpen] = useState(false);

  const { data, isLoading, isError, error, refetch } = useProduct(id);

  const { mutate: addToCart, isPending: isAddingToCart } = useAddToCart();

  const addReviewMutation = useAddReview(id);

  const product = data?.response || data?.data || data;

  const {
    image,
    subImages = [],
    name,
    description,
    rate = 0,
    price,
    reviews = [],
  } = product || {};

  const handleAddToCart = () => {
    addToCart(
      {
        ProductId: id,
        Count: 1,
      },
      {
        onSuccess: () => {
          setIsCartAlertOpen(true);
        },
      },
    );
  };

  const handleReviewChange = (field, value) => {
    setReviewForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmitReview = () => {
    const comment = reviewForm.comment.trim();

    if (!comment) return;

    addReviewMutation.mutate(
      {
        rating: reviewForm.rating,
        comment,
      },
      {
        onSuccess: () => {
          setReviewForm({
            rating: 5,
            comment: "",
          });

          refetch();
        },
      },
    );
  };

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white">
        <CircularProgress size={32} sx={{ color: PRIMARY_COLOR }} />
      </main>
    );
  }

  if (isError) {
    return (
      <main className="min-h-screen bg-white px-4 py-10">
        <div className="mx-auto max-w-7xl">
          <Alert
            severity="error"
            action={
              <Button color="inherit" size="small" onClick={refetch}>
                Retry
              </Button>
            }
          >
            {error?.message || "Unable to load product details."}
          </Alert>
        </div>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="min-h-screen bg-white px-4 py-10">
        <div className="mx-auto max-w-7xl">
          <Alert severity="info">Product not found.</Alert>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Typography
            variant="h4"
            component="h1"
            className="text-2xl font-extrabold tracking-tight text-zinc-900 sm:text-3xl"
          >
            Product Details
          </Typography>

          <Button
            component={Link}
            to="/"
            variant="outlined"
            startIcon={<ArrowBackRounded />}
            className="w-fit rounded-xl"
            sx={{
              color: PRIMARY_COLOR,
              borderColor: PRIMARY_COLOR,
              fontWeight: 700,
              textTransform: "none",
              "&:hover": {
                color: "#fff",
                backgroundColor: PRIMARY_COLOR,
                borderColor: PRIMARY_COLOR,
              },
            }}
          >
            الرجوع للرئيسية
          </Button>
        </header>

        <section className="overflow-hidden rounded-[28px] border border-zinc-200 bg-white shadow-[0_15px_40px_-20px_rgba(0,0,0,0.18)]">
          <div className="grid lg:grid-cols-2">
            <div className="flex min-h-[320px] items-center justify-center bg-zinc-50 p-6 sm:min-h-[450px] sm:p-10 lg:min-h-[560px]">
              {image ? (
                <img
                  src={image}
                  alt={name || "Product"}
                  loading="lazy"
                  className="max-h-[520px] w-full object-contain transition-transform duration-500 hover:scale-105"
                />
              ) : (
                <div className="flex flex-col items-center justify-center gap-3 text-zinc-400">
                  <ImageNotSupportedOutlined sx={{ fontSize: 40 }} />

                  <Typography variant="body2" className="font-medium">
                    No image available
                  </Typography>
                </div>
              )}
            </div>

            <div className="flex flex-col justify-between p-6 sm:p-8 lg:p-10">
              <div>
                <Chip
                  label="Product"
                  size="small"
                  variant="outlined"
                  className="mb-4 rounded-lg"
                  sx={{
                    color: PRIMARY_COLOR,
                    borderColor: PRIMARY_COLOR,
                    fontWeight: 600,
                  }}
                />

                <Typography
                  variant="h4"
                  component="h2"
                  className="mb-5 text-2xl font-extrabold leading-tight text-zinc-900 sm:text-3xl"
                >
                  {name}
                </Typography>

                <div className="mb-5 flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Rating
                      value={Number(rate)}
                      precision={0.5}
                      readOnly
                      size="medium"
                      sx={{
                        color: PRIMARY_COLOR,
                      }}
                    />

                    <Typography
                      variant="body2"
                      className="font-semibold text-zinc-500"
                    >
                      {rate} / 5
                    </Typography>
                  </div>

                  <Divider
                    orientation="vertical"
                    flexItem
                    className="hidden sm:block"
                  />

                  <Typography
                    variant="h5"
                    className="font-extrabold"
                    sx={{
                      color: PRIMARY_COLOR,
                    }}
                  >
                    ${price}
                  </Typography>
                </div>

                <Divider className="mb-6" />

                {description && (
                  <Typography
                    variant="body1"
                    className="whitespace-pre-line text-sm leading-7 text-zinc-600 sm:text-base"
                  >
                    {description}
                  </Typography>
                )}

                {subImages.length > 0 && (
                  <div className="mt-6 flex flex-wrap gap-3">
                    {subImages.map((subImage, index) => (
                      <img
                        key={index}
                        src={subImage}
                        alt={`${name}-${index + 1}`}
                        loading="lazy"
                        className="h-16 w-16 rounded-xl border border-zinc-200 bg-zinc-50 object-contain p-1 transition hover:border-[#DB4444]"
                      />
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-8 rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
                <Button
                  variant="contained"
                  fullWidth
                  onClick={handleAddToCart}
                  disabled={isAddingToCart}
                  startIcon={!isAddingToCart && <AddShoppingCartRounded />}
                  className="min-h-12 rounded-xl font-bold normal-case shadow-none"
                  sx={{
                    backgroundColor: PRIMARY_COLOR,
                    color: "#fff",
                    "&:hover": {
                      backgroundColor: PRIMARY_HOVER,
                      boxShadow: "none",
                    },
                    "&:disabled": {
                      backgroundColor: "#e8a0a0",
                      color: "#fff",
                    },
                  }}
                >
                  {isAddingToCart ? (
                    <CircularProgress size={22} sx={{ color: "#fff" }} />
                  ) : (
                    "ADD TO CART"
                  )}
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-[28px] border border-zinc-200 bg-white p-5 shadow-sm sm:p-8">
          <div className="mb-8">
            <div className="flex flex-wrap items-center gap-3">
              <Typography
                variant="h5"
                component="h2"
                className="font-extrabold text-zinc-900"
              >
                المراجعات
              </Typography>

              <span className="rounded-full bg-red-50 px-3 py-1 text-sm font-bold text-[#DB4444]">
                {reviews.length}
              </span>
            </div>

            <Typography
              variant="body2"
              className="mt-1 font-semibold text-zinc-500"
            >
              آراء العملاء وتجاربهم مع المنتج
            </Typography>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="min-w-0">
              {reviews.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 p-8 text-center">
                  <Typography
                    variant="body1"
                    className="font-semibold text-zinc-500"
                  >
                    لا توجد مراجعات بعد.
                  </Typography>

                  <Typography variant="body2" className="mt-1 text-zinc-400">
                    كن أول من يضيف مراجعة لهذا المنتج.
                  </Typography>
                </div>
              ) : (
                <div className="space-y-4">
                  {reviews.map((review, index) => (
                    <article
                      key={review?.id || index}
                      className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4 transition-shadow duration-300 hover:shadow-sm sm:p-5"
                    >
                      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                        <Typography
                          variant="body1"
                          className="font-bold text-zinc-800"
                        >
                          {review?.userName || "User"}
                        </Typography>

                        <Rating
                          value={Number(review?.rating || 0)}
                          readOnly
                          size="small"
                          sx={{
                            color: PRIMARY_COLOR,
                          }}
                        />
                      </div>

                      <Typography
                        variant="body2"
                        className="whitespace-pre-line leading-6 text-zinc-600"
                      >
                        {review?.comment || "No comment provided."}
                      </Typography>
                    </article>
                  ))}
                </div>
              )}
            </div>

            <div className="h-fit rounded-2xl border border-zinc-200 bg-zinc-50 p-5 sm:p-6 lg:sticky lg:top-6">
              <Typography
                variant="h6"
                className="mb-5 font-extrabold text-zinc-900"
              >
                أضف مراجعتك
              </Typography>

              <div className="space-y-5">
                <div>
                  <Typography
                    variant="body2"
                    className="mb-2 font-semibold text-zinc-700"
                  >
                    التقييم
                  </Typography>

                  <div className="flex flex-wrap items-center gap-3">
                    <Rating
                      value={reviewForm.rating}
                      onChange={(event, value) => {
                        if (value !== null) {
                          handleReviewChange("rating", value);
                        }
                      }}
                      size="large"
                      sx={{
                        color: PRIMARY_COLOR,
                      }}
                    />

                    <Typography
                      variant="body2"
                      className="font-semibold text-zinc-500"
                    >
                      {reviewForm.rating} / 5
                    </Typography>
                  </div>
                </div>

                <TextField
                  label="Comment"
                  multiline
                  minRows={5}
                  value={reviewForm.comment}
                  onChange={(event) =>
                    handleReviewChange("comment", event.target.value)
                  }
                  fullWidth
                  placeholder="اكتب تجربتك مع المنتج..."
                  helperText={`${reviewForm.comment.length} characters`}
                  className="bg-white"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "14px",
                    },
                    "& .MuiOutlinedInput-root:hover fieldset": {
                      borderColor: PRIMARY_COLOR,
                    },
                    "& .MuiOutlinedInput-root.Mui-focused fieldset": {
                      borderColor: PRIMARY_COLOR,
                    },
                  }}
                />

                <Button
                  variant="contained"
                  fullWidth
                  onClick={handleSubmitReview}
                  disabled={
                    addReviewMutation.isPending || !reviewForm.comment.trim()
                  }
                  className="min-h-12 rounded-xl font-bold normal-case shadow-none"
                  sx={{
                    backgroundColor: PRIMARY_COLOR,
                    "&:hover": {
                      backgroundColor: PRIMARY_HOVER,
                    },
                    "&:disabled": {
                      backgroundColor: "#e8a0a0",
                      color: "#fff",
                    },
                  }}
                >
                  {addReviewMutation.isPending ? (
                    <CircularProgress size={21} sx={{ color: "#fff" }} />
                  ) : (
                    "إرسال المراجعة"
                  )}
                </Button>

                {addReviewMutation.isError && (
                  <Alert severity="error">
                    {addReviewMutation.error?.message ||
                      "Unable to submit review."}
                  </Alert>
                )}

                {addReviewMutation.isSuccess && (
                  <Alert severity="success">تم إرسال المراجعة بنجاح.</Alert>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>

      <Snackbar
        open={isCartAlertOpen}
        autoHideDuration={3000}
        onClose={() => setIsCartAlertOpen(false)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Alert
          onClose={() => setIsCartAlertOpen(false)}
          severity="success"
          variant="filled"
          className="w-full"
        >
          تم إضافة المنتج إلى السلة بنجاح
        </Alert>
      </Snackbar>
    </main>
  );
}
