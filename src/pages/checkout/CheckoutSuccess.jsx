import React from 'react';
import { Button, Card, CardContent, Typography } from '@mui/material';
import { CheckCircleOutlineRounded } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function CheckoutSuccess() {
  const { t } = useTranslation();

  return (
    <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <Card elevation={0} className="rounded-[24px] border border-zinc-200/80 bg-white shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
        <CardContent className="flex flex-col items-center gap-4 p-10 text-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#DB4444]/10">
            <CheckCircleOutlineRounded sx={{ fontSize: 40 }} className="text-[#DB4444]" />
          </span>

          <Typography variant="h4" className="text-2xl font-extrabold tracking-tight text-zinc-900 dark:text-white sm:text-3xl">
            {t('checkoutSuccess.title')}
          </Typography>

          <Typography variant="body1" className="max-w-md text-zinc-500 dark:text-zinc-300">
            {t('checkoutSuccess.message')}
          </Typography>

          <Button
            component={Link}
            to="/"
            variant="contained"
            sx={{
              mt: 1,
              borderRadius: '12px',
              backgroundColor: '#DB4444',
              textTransform: 'none',
              fontWeight: 700,
              px: 4,
              py: 1.2,
              boxShadow: 'none',
              '&:hover': { backgroundColor: '#c23a3a' },
            }}
          >
            {t('checkoutSuccess.shopMore')}
          </Button>
        </CardContent>
      </Card>
    </section>
  );
}
