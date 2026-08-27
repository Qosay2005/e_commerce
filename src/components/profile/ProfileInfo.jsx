
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

function ProfileField({ label, value, icon: Icon, isDark }) {
  return (
    <div
      className={`rounded-xl border p-4 ${
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

  // البيانات التي سيتم تعديلها
  const [form, setForm] = useState({
    fullName: profile?.fullName || "",
    phoneNumber: profile?.phoneNumber || "",
  });

  // تحديث الفورم عندما تصل بيانات جديدة من الـ API
  useEffect(() => {
    if (!isEditing) {
      setForm({
        fullName: profile?.fullName || "",
        phoneNumber: profile?.phoneNumber || "",
      });
    }
  }, [profile?.fullName, profile?.phoneNumber, isEditing]);

  // تغيير أي حقل داخل الفورم
  const handleChange = (field) => (event) => {
    reset();

    setForm((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  // الدخول إلى وضع التعديل
  const handleEdit = () => {
    reset();

    setForm({
      fullName: profile?.fullName || "",
      phoneNumber: profile?.phoneNumber || "",
    });

    setIsEditing(true);
  };

  // إلغاء التعديل وإرجاع القيم الأصلية
  const handleCancel = () => {
    reset();

    setForm({
      fullName: profile?.fullName || "",
      phoneNumber: profile?.phoneNumber || "",
    });

    setIsEditing(false);
  };

  // حفظ التعديلات
  const handleSubmit = (event) => {
    event.preventDefault();

    updateProfile(
      {
        fullName: form.fullName.trim(),
        phoneNumber: form.phoneNumber.trim(),
      },
      {
        onSuccess: async () => {
          // جلب البيانات الجديدة من السيرفر
          await onProfileUpdated?.();

          // الخروج من وضع التعديل
          setIsEditing(false);
        },
      },
    );
  };

  // تصميم حقول الإدخال
  const textFieldSx = {
    "& .MuiInputLabel-root": {
      color: isDark ? "#94a3b8" : "#71717a",
    },

    "& .MuiInputLabel-root.Mui-focused": {
      color: "#DB4444",
    },

    "& .MuiOutlinedInput-root": {
      borderRadius: "10px",
      backgroundColor: isDark ? "#0f172a" : "#fafafa",
      color: isDark ? "#f8fafc" : "#18181b",

      "& fieldset": {
        borderColor: isDark ? "#334155" : "#d4d4d8",
      },

      "&:hover fieldset": {
        borderColor: "#DB4444",
      },

      "&.Mui-focused fieldset": {
        borderColor: "#DB4444",
      },
    },
  };

  return (
    <div className="space-y-6">
      {/* Header */}
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
            className={`mt-1 ${
              isDark ? "text-slate-400" : "text-zinc-500"
            }`}
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
                borderColor: "#DB4444",
                color: "#DB4444",
              },
            }}
          >
            {t("profile.info.editProfile", {
              defaultValue: "Edit Profile",
            })}
          </Button>
        )}
      </div>

      {/* Success Message */}
      {isSuccess && !isEditing && (
        <Alert severity="success" onClose={reset}>
          {t("profile.info.changesSaved", {
            defaultValue: "Changes saved successfully",
          })}
        </Alert>
      )}

      {/* Error Message */}
      {isError && (
        <Alert severity="error" onClose={reset}>
          {error?.response?.data?.message ||
            error?.response?.data?.errors?.[0] ||
            error?.message ||
            "Failed to update profile"}
        </Alert>
      )}

      {/* Edit Mode */}
      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            {/* Full Name */}
            <TextField
              label={t("profile.info.fullName", {
                defaultValue: "Full Name",
              })}
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

            {/* Phone Number */}
            <TextField
              label={t("profile.info.phone", {
                defaultValue: "Phone Number",
              })}
              value={form.phoneNumber}
              onChange={handleChange("phoneNumber")}
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

          <div className="flex gap-3">
            {/* Save */}
            <Button
              type="submit"
              variant="contained"
              disabled={isPending || isRefreshing}
              sx={{
                borderRadius: "10px",
                backgroundColor: "#DB4444",
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
                t("profile.info.saveChanges", {
                  defaultValue: "Save Changes",
                })
              )}
            </Button>

            {/* Cancel */}
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
              {t("profile.info.cancel", {
                defaultValue: "Cancel",
              })}
            </Button>
          </div>
        </form>
      ) : (
        /* Information Mode */
        <div
          className={`grid gap-4 sm:grid-cols-2 ${
            isRefreshing ? "opacity-70" : ""
          }`}
        >
          {/* Name */}
          <ProfileField
            label={t("profile.info.fullName", {
              defaultValue: "Full Name",
            })}
            value={profile?.fullName}
            icon={PersonOutlineOutlined}
            isDark={isDark}
          />

          {/* Email - للعرض فقط، تعديله من Settings */}
          <ProfileField
            label={t("profile.info.email", {
              defaultValue: "Email",
            })}
            value={profile?.email}
            icon={EmailOutlined}
            isDark={isDark}
          />

          {/* Phone */}
          <ProfileField
            label={t("profile.info.phone", {
              defaultValue: "Phone Number",
            })}
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
  }).isRequired,

  isRefreshing: PropTypes.bool,
  onProfileUpdated: PropTypes.func,
};

ProfileInfo.defaultProps = {
  isRefreshing: false,
  onProfileUpdated: undefined,
};

