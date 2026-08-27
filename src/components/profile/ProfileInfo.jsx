import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  CircularProgress,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";

import {
  EditOutlined,
  EmailOutlined,
  PersonOutlineOutlined,
  PhoneOutlined,
} from "@mui/icons-material";

import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { useUpdateProfile } from "../../hocks/useProfile";
import useThemeStore from "../../hocks/useThemeStore";

const PRIMARY_COLOR = "#DB4444";

function ProfileField({ label, value, icon: Icon, isDark }) {
  return (
    <div
      className={`rounded-xl border p-4 transition-colors ${
        isDark
          ? "border-slate-700 bg-slate-800/50"
          : "border-zinc-200 bg-zinc-50/70"
      }`}
    >
      <div className="flex items-start gap-3">
        <Icon
          sx={{
            color: isDark ? "#94a3b8" : "#71717a",
            fontSize: 21,
            mt: 0.2,
          }}
        />

        <div className="min-w-0 flex-1">
          <Typography
            variant="caption"
            className={`block font-semibold ${
              isDark ? "text-slate-400" : "text-zinc-500"
            }`}
          >
            {label}
          </Typography>

          <Typography
            variant="body1"
            className={`mt-1 break-words font-semibold ${
              isDark ? "text-slate-100" : "text-zinc-900"
            }`}
          >
            {value || "—"}
          </Typography>
        </div>
      </div>
    </div>
  );
}

ProfileField.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  icon: PropTypes.elementType.isRequired,
  isDark: PropTypes.bool.isRequired,
};

ProfileField.defaultProps = {
  value: "",
};

export default function ProfileInfo({
  profile,
  isRefreshing,
  onProfileUpdated,
}) {
  const { t } = useTranslation();

  const mode = useThemeStore((state) => state.mode);
  const isDark = mode === "dark";

  const {
    mutate: updateProfile,
    isPending,
    isSuccess,
    isError,
    error,
    reset,
  } = useUpdateProfile();

  const [isEditing, setIsEditing] = useState(false);

  const [form, setForm] = useState({
    fullName: profile?.fullName || "",
    phone: profile?.phoneNumber || "",
  });

  useEffect(() => {
    if (!isEditing) {
      setForm({
        fullName: profile?.fullName || "",
        phone: profile?.phoneNumber || "",
      });
    }
  }, [profile?.fullName, profile?.phoneNumber, isEditing]);

  const handleChange = (field) => (event) => {
    reset();

    setForm((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  const handleEdit = () => {
    reset();

    setForm({
      fullName: profile?.fullName || "",
      phone: profile?.phoneNumber || "",
    });

    setIsEditing(true);
  };

  const handleCancel = () => {
    reset();

    setForm({
      fullName: profile?.fullName || "",
      phone: profile?.phoneNumber || "",
    });

    setIsEditing(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    updateProfile(
      {
        fullName: form.fullName.trim(),
        phoneNumber: form.phone.trim(),
      },
      {
        onSuccess: async () => {
          await onProfileUpdated?.();
          setIsEditing(false);
        },
      },
    );
  };

  const textFieldSx = {
    "& .MuiInputLabel-root": {
      color: isDark ? "#94a3b8" : "#71717a",
    },

    "& .MuiInputLabel-root.Mui-focused": {
      color: PRIMARY_COLOR,
    },

    "& .MuiOutlinedInput-root": {
      borderRadius: "10px",
      backgroundColor: isDark ? "#0f172a" : "#fafafa",
      color: isDark ? "#f8fafc" : "#18181b",

      "& fieldset": {
        borderColor: isDark ? "#334155" : "#d4d4d8",
      },

      "&:hover fieldset": {
        borderColor: PRIMARY_COLOR,
      },

      "&.Mui-focused fieldset": {
        borderColor: PRIMARY_COLOR,
      },
    },
  };

  return (
    <div className="space-y-6">

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <Typography
            variant="h6"
            className={`font-bold ${
              isDark ? "text-slate-100" : "text-zinc-900"
            }`}
          >
            {t("profile.info.title", {
              defaultValue: "Personal Details",
            })}
          </Typography>

          <Typography
            variant="body2"
            className={`mt-1 ${isDark ? "text-slate-400" : "text-zinc-500"}`}
          >
            {t("profile.info.description", {
              defaultValue: "View and manage your personal information",
            })}
          </Typography>
        </div>

        {!isEditing && (
          <Button
            variant="outlined"
            startIcon={<EditOutlined fontSize="small" />}
            onClick={handleEdit}
            disabled={isRefreshing}
            sx={{
              borderRadius: "10px",
              borderColor: isDark ? "#475569" : "#d4d4d8",
              color: isDark ? "#f8fafc" : "#18181b",
              textTransform: "none",
              fontWeight: 700,

              "&:hover": {
                borderColor: PRIMARY_COLOR,
                color: PRIMARY_COLOR,
              },
            }}
          >
            Edit Profile
          </Button>
        )}
      </div>

      {isSuccess && !isEditing && (
        <Alert severity="success" onClose={reset}>
          Changes saved successfully.
        </Alert>
      )}

      {isError && (
        <Alert severity="error" onClose={reset}>
          {error?.response?.data?.message ||
            error?.response?.data?.errors?.[0] ||
            error?.message ||
            "Failed to update profile"}
        </Alert>
      )}

      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField
              label="Full Name"
              value={form.fullName}
              onChange={handleChange("fullName")}
              fullWidth
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonOutlineOutlined
                      sx={{
                        color: isDark ? "#64748b" : "#71717a",
                      }}
                    />
                  </InputAdornment>
                ),
              }}
              sx={textFieldSx}
            />

            <TextField
              label="Phone Number"
              value={form.phone}
              onChange={handleChange("phone")}
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PhoneOutlined
                      sx={{
                        color: isDark ? "#64748b" : "#71717a",
                      }}
                    />
                  </InputAdornment>
                ),
              }}
              sx={textFieldSx}
            />
          </div>

          <div className="flex flex-wrap gap-3">
            <Button
              type="submit"
              variant="contained"
              disabled={isPending || isRefreshing}
              sx={{
                borderRadius: "10px",
                backgroundColor: PRIMARY_COLOR,
                textTransform: "none",
                fontWeight: 700,
                px: 3,
                boxShadow: "none",

                "&:hover": {
                  backgroundColor: "#c53d3d",
                  boxShadow: "none",
                },
              }}
            >
              {isPending ? (
                <span className="flex items-center gap-2">
                  <CircularProgress size={16} sx={{ color: "#fff" }} />
                  Saving...
                </span>
              ) : (
                "Save Changes"
              )}
            </Button>

            <Button
              type="button"
              variant="outlined"
              onClick={handleCancel}
              disabled={isPending}
              sx={{
                borderRadius: "10px",
                borderColor: isDark ? "#475569" : "#d4d4d8",
                color: isDark ? "#f8fafc" : "#18181b",
                textTransform: "none",
                fontWeight: 700,
              }}
            >
              Cancel
            </Button>
          </div>
        </form>
      ) : (
        /* Information */
        <div
          className={`grid gap-4 sm:grid-cols-2 ${
            isRefreshing ? "opacity-70" : ""
          }`}
        >
          <ProfileField
            label="Full Name"
            value={profile?.fullName}
            icon={PersonOutlineOutlined}
            isDark={isDark}
          />

          <ProfileField
            label="Email"
            value={profile?.email}
            icon={EmailOutlined}
            isDark={isDark}
          />

          <ProfileField
            label="Phone Number"
            value={profile?.phoneNumber}
            icon={PhoneOutlined}
            isDark={isDark}
          />
        </div>
      )}
    </div>
  );
}

ProfileInfo.propTypes = {
  profile: PropTypes.shape({
    fullName: PropTypes.string,
    email: PropTypes.string,
    phoneNumber: PropTypes.string,
  }),
  isRefreshing: PropTypes.bool,
  onProfileUpdated: PropTypes.func,
};

ProfileInfo.defaultProps = {
  profile: null,
  isRefreshing: false,
  onProfileUpdated: undefined,
};
