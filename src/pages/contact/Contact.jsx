import React from "react";
import { Button, TextField, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import PageTransition from '../../PageTransition'

export default function Contact() {
  const { t } = useTranslation();

  return (
    <PageTransition>
      <section className="flex min-h-screen justify-items-center bg-white px-4 py-10 dark:bg-zinc-950 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8">
            <Typography
              variant="h4"
              className="font-bold text-slate-900 dark:text-white"
            >
              {t("contact.title")}
            </Typography>

            <Typography
              variant="body2"
              className="mt-2 text-slate-500 dark:text-zinc-300"
            >
              {t("contact.subtitle")}
            </Typography>
          </div>

          <div className="max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 shadow-md dark:border-zinc-700 dark:bg-zinc-900 sm:p-8">
            <form className="space-y-5">
              <TextField
                fullWidth
                label={t("contact.fullName")}
                placeholder={t("contact.namePlaceholder")}
                size="small"
                variant="outlined"
                className="text-zinc-900 dark:text-zinc-100"
              />

              <TextField
                fullWidth
                label={t("contact.email")}
                type="email"
                placeholder={t("contact.emailPlaceholder")}
                size="small"
                variant="outlined"
                className="text-zinc-900 dark:text-zinc-100"
              />

              <TextField
                fullWidth
                label={t("contact.phone")}
                type="tel"
                placeholder={t("contact.phonePlaceholder")}
                size="small"
                variant="outlined"
                className="text-zinc-900 dark:text-zinc-100"
              />

              <TextField
                fullWidth
                label={t("contact.message")}
                placeholder={t("contact.messagePlaceholder")}
                multiline
                rows={5}
                variant="outlined"
                className="text-zinc-900 dark:text-zinc-100"
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                className="!mt-2 !py-3 !font-semibold"
                sx={{
                  backgroundColor: "#D94343",

                  "&:hover": {
                    backgroundColor: "#C93636",
                  },
                }}
              >
                {t("contact.sendMessage")}
              </Button>
            </form>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
