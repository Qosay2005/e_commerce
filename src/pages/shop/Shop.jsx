import React, { useMemo, useState } from 'react';
import { Alert, Button, Card, CardContent, CircularProgress, Chip, Rating, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import useProducts from '../../hocks/useProducts';
import Filter from '../../components/shop/Filter';
import PageTransition from '../../PageTransition'
export default function Shop() {
  const { data, isLoading, isError, error, refetch } = useProducts();
  const [filters, setFilters] = useState({ category: 'all', maxPrice: 500, minRating: 0 });

  const products = useMemo(() => {
    const source = Array.isArray(data?.response?.data)
      ? data.response.data
      : Array.isArray(data?.data)
        ? data.data
        : Array.isArray(data)
          ? data
          : [];

    return source.filter((product) => {
      const category = product?.category?.name || product?.categoryName || product?.category || '';
      const price = Number(product?.price || product?.priceValue || product?.currentPrice || product?.amount || 0);
      const rating = Number(product?.rating || product?.averageRating || product?.rate || 0);

      const matchesCategory = filters.category === 'all' || category.toString().toLowerCase() === filters.category.toLowerCase();
      const matchesPrice = price <= filters.maxPrice;
      const matchesRating = rating >= filters.minRating;

      return matchesCategory && matchesPrice && matchesRating;
    });
  }, [data, filters]);

  if (isLoading) {
    return <div className="flex min-h-[70vh] items-center justify-center"><CircularProgress /></div>;
  }

  if (isError) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-8">
        <Alert severity="error" action={<Button color="inherit" size="small" onClick={() => refetch()}>Retry</Button>}>
          {error?.message || 'Unable to load products.'}
        </Alert>
      </div>
    );
  }

  return (
    <PageTransition>
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6">
        <Typography variant="h4" className="font-semibold text-slate-800">Shop</Typography>
        <Typography variant="body2" className="text-slate-500">Browse all products and refine results by category, price, and rating.</Typography>
      </div>

      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <Filter filters={filters} setFilters={setFilters} />

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {products.length === 0 ? (
            <div className="col-span-full rounded-[24px] border border-dashed border-slate-200 bg-white p-8 text-center text-slate-500">No products match the selected filters.</div>
          ) : products.map((product, index) => {
            const imageUrl = product?.image || product?.imageUrl || product?.thumbnail || product?.coverImage;
            const categoryName = product?.category?.name || product?.categoryName || product?.category;
            const productName = product?.name || product?.title || product?.productName;
            const priceValue = product?.price || product?.priceValue || product?.currentPrice || product?.amount;
            const ratingValue = Number(product?.rating || product?.averageRating || product?.rate || 0);

            return (
              <Card key={product?.id || `${productName || 'product'}-${index}`} className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm">
                <Link to={`/products/${product?.id}`} className="block">
                  {imageUrl ? <img src={imageUrl} alt={productName || 'Product'} className="h-44 w-full object-cover" /> : <div className="flex h-44 items-center justify-center bg-slate-100 text-sm text-slate-400">No image</div>}
                  <CardContent className="space-y-3 p-5">
                    {categoryName ? <Chip label={categoryName} size="small" variant="outlined" className="w-fit" /> : null}
                    <Typography variant="h6" className="font-semibold text-slate-800">{productName}</Typography>
                    <div className="flex items-center gap-2">
                      <Rating value={ratingValue} precision={0.1} readOnly size="small" />
                    </div>
                    {priceValue != null ? <Typography variant="subtitle1" className="font-semibold text-[#091E27]">${priceValue}</Typography> : null}
                  </CardContent>
                </Link>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
    </PageTransition>
  );
}
