import { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useTranslation } from "react-i18next";

export default function Filter({ filters, setFilters }) {
  const { t } = useTranslation();
  const [localFilters, setLocalFilters] = useState(filters);

  const updateFilter = (name, value) => {
    setLocalFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleApply = () => {
    setFilters(localFilters);
  };

  return (
    <Card className="h-fit rounded-xl border border-slate-200 bg-white shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
      <CardContent className="space-y-5 p-5">
        <Typography variant="h6" className="font-bold text-slate-800 dark:text-white">
          {t("shop.filters.title")}
        </Typography>

        <div>
          <Typography variant="caption" className="mb-2 block font-semibold text-zinc-700 dark:text-zinc-300">
            {t("shop.filters.searchProducts")}
          </Typography>

          <TextField
            fullWidth
            size="small"
            placeholder={t("navbar.search")}
            value={localFilters.search}
            onChange={(event) =>
              updateFilter("search", event.target.value)
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" className="text-zinc-500 dark:text-zinc-400" />
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "10px",
                backgroundColor: "transparent",
                color: "inherit",
              },
              "& .MuiInputBase-input": {
                color: "inherit",
              },
            }}
            className="text-zinc-900 dark:text-zinc-100"
          />
        </div>

        <div>
          <Typography variant="caption" className="mb-2 block font-semibold text-zinc-700 dark:text-zinc-300">
            {t("shop.filters.priceRange")}
          </Typography>

          <div className="grid grid-cols-2 gap-2">
            <TextField
              fullWidth
              size="small"
              type="number"
              placeholder={t("shop.filters.min")}
              value={localFilters.minPrice}
              onChange={(event) =>
                updateFilter("minPrice", event.target.value)
              }
              className="text-zinc-900 dark:text-zinc-100"
            />

            <TextField
              fullWidth
              size="small"
              type="number"
              placeholder={t("shop.filters.max")}
              value={localFilters.maxPrice}
              onChange={(event) =>
                updateFilter("maxPrice", event.target.value)
              }
              className="text-zinc-900 dark:text-zinc-100"
            />
          </div>
        </div>

        <div>
          <Typography variant="caption" className="mb-2 block font-semibold text-zinc-700 dark:text-zinc-300">
            {t("shop.filters.sortBy")}
          </Typography>

          <Select
            fullWidth
            size="small"
            value={localFilters.sortBy}
            onChange={(event) =>
              updateFilter("sortBy", event.target.value)
            }
            className="text-zinc-900 dark:text-zinc-100"
          >
            <MenuItem value="name">{t("shop.filters.name")}</MenuItem>
            <MenuItem value="price">{t("shop.filters.price")}</MenuItem>
            <MenuItem value="rate">{t("shop.filters.rating")}</MenuItem>
          </Select>
        </div>

        <div>
          <Typography variant="caption" className="mb-2 block font-semibold text-zinc-700 dark:text-zinc-300">
            {t("shop.filters.order")}
          </Typography>

          <Select
            fullWidth
            size="small"
            value={localFilters.order}
            onChange={(event) =>
              updateFilter("order", event.target.value)
            }
            className="text-zinc-900 dark:text-zinc-100"
          >
            <MenuItem value="ascending">{t("shop.filters.ascending")}</MenuItem>
            <MenuItem value="descending">{t("shop.filters.descending")}</MenuItem>
          </Select>
        </div>

        <Button
          fullWidth
          variant="contained"
          onClick={handleApply}
          sx={{
            backgroundColor: "#D94343",
            "&:hover": {
              backgroundColor: "#C93636",
            },
          }}
        >
          {t("shop.filters.apply")}
        </Button>
      </CardContent>
    </Card>
  );
}
