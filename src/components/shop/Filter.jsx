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

export default function Filter({ filters, setFilters }) {
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
    <Card className="h-fit rounded-xl border border-slate-200 bg-white shadow-sm">
      <CardContent className="space-y-5 p-5">
        
        <Typography variant="h6" className="font-bold text-slate-800">
          Filters
        </Typography>

        <div>
          <Typography variant="caption" className="mb-2 block font-semibold">
            Search Products
          </Typography>

          <TextField
            fullWidth
            size="small"
            placeholder="What are you looking for?"
            value={localFilters.search}
            onChange={(event) =>
              updateFilter("search", event.target.value)
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
          />
        </div>

        <div>
          <Typography variant="caption" className="mb-2 block font-semibold">
            Price Range
          </Typography>

          <div className="grid grid-cols-2 gap-2">
            <TextField
              fullWidth
              size="small"
              type="number"
              placeholder="Min"
              value={localFilters.minPrice}
              onChange={(event) =>
                updateFilter("minPrice", event.target.value)
              }
            />

            <TextField
              fullWidth
              size="small"
              type="number"
              placeholder="Max"
              value={localFilters.maxPrice}
              onChange={(event) =>
                updateFilter("maxPrice", event.target.value)
              }
            />
          </div>
        </div>

        <div>
          <Typography variant="caption" className="mb-2 block font-semibold">
            Sort By
          </Typography>

          <Select
            fullWidth
            size="small"
            value={localFilters.sortBy}
            onChange={(event) =>
              updateFilter("sortBy", event.target.value)
            }
          >
            <MenuItem value="name">Name</MenuItem>
            <MenuItem value="price">Price</MenuItem>
            <MenuItem value="rate">Rating</MenuItem>
          </Select>
        </div>
        <div>
          <Typography variant="caption" className="mb-2 block font-semibold">
            Order
          </Typography>

          <Select
            fullWidth
            size="small"
            value={localFilters.order}
            onChange={(event) =>
              updateFilter("order", event.target.value)
            }
          >
            <MenuItem value="ascending">Ascending</MenuItem>
            <MenuItem value="descending">Descending</MenuItem>
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
          APPLY FILTERS
        </Button>
      </CardContent>
    </Card>
  );
}