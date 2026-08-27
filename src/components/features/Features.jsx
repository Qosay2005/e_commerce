import React from "react";
import Icon_1 from "../../assets/features/icon_1.svg";
import Icon_2 from "../../assets/features/icon_2.svg";
import Icon_3 from "../../assets/features/icon_3.svg";
import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

export default function Features() {
  const { t } = useTranslation();

  const features = [
    {
      icon: Icon_1,
      title: t("features.delivery.title"),
      description: t("features.delivery.description"),
    },
    {
      icon: Icon_2,
      title: t("features.support.title"),
      description: t("features.support.description"),
    },
    {
      icon: Icon_3,
      title: t("features.guarantee.title"),
      description: t("features.guarantee.description"),
    },
  ];

  return (
    <section className="grid grid-cols-1 gap-8 justify-items-center md:grid-cols-2 lg:grid-cols-3">
      {features.map((feature) => (
        <div
          key={feature.title}
          className="flex flex-col items-center gap-2 text-center"
        >
          <div className="flex h-40 w-40 items-center justify-center rounded-full bg-gray-300 transition-colors duration-300 dark:bg-zinc-800">
            <div className="flex h-28 w-28 items-center justify-center rounded-full bg-black transition-colors duration-300 dark:bg-zinc-700">
              <img src={feature.icon} alt={feature.title} />
            </div>
          </div>

          <Typography
            variant="h6"
            className="text-zinc-900 transition-colors duration-300 dark:text-white"
            sx={{ fontSize: 18, fontWeight: "bold" }}
          >
            {feature.title}
          </Typography>

          <Typography
            variant="body2"
            className="text-gray-600 transition-colors duration-300 dark:text-zinc-300"
          >
            {feature.description}
          </Typography>
        </div>
      ))}
    </section>
  );
}
