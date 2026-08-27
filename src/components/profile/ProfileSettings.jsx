import React, { useState } from "react";

import {
  Alert,
  Button,
  CircularProgress,
  Divider,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";

import {
  EmailOutlined,
  LockOutlined,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";

import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";

import {
  useChangeEmail,
  useChangePassword,
} from "../../hocks/useProfile";

import useThemeStore from "../../hocks/useThemeStore";

const PRIMARY_COLOR = "#DB4444";

export default function ProfileSettings({ onProfileUpdated }) {
  const { t } = useTranslation();

  const mode = useThemeStore((state) => state.mode);
  const isDark = mode === "dark";

  const [email, setEmail] = useState("");

  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const emailMutation = useChangeEmail();
  const passwordMutation = useChangePassword();

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

  const getErrorMessage = (error, fallback) => {
    return (
      error?.response?.data?.message ||
      error?.response?.data?.errors?.[0] ||
      error?.message ||
      fallback
    );
  };

  const handleEmailSubmit = (event) => {
    event.preventDefault();

    emailMutation.mutate(
      {
        NewEmail: email.trim(),
      },
      {
        onSuccess: async () => {
          setEmail("");
          await onProfileUpdated?.();
        },
      }
    );
  };

  const handlePasswordChange = (field) => (event) => {
    passwordMutation.reset();

    setPasswords((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  const handlePasswordSubmit = (event) => {
    event.preventDefault();

    if (
      passwords.newPassword !== passwords.confirmNewPassword
    ) {
      return;
    }

    passwordMutation.mutate({
      CurrentPassword: passwords.currentPassword,
      NewPassword: passwords.newPassword,
      ConfirmNewPassword: passwords.confirmNewPassword,
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <Typography
          variant="h6"
          className={`font-bold ${
            isDark ? "text-slate-100" : "text-zinc-900"
          }`}
        >
          {t("profile.settings.title", {
            defaultValue: "Settings",
          })}
        </Typography>

        <Typography
          variant="body2"
          className={`mt-1 ${
            isDark ? "text-slate-400" : "text-zinc-500"
          }`}
        >
          {t("profile.settings.description", {
            defaultValue:
              "Manage your email address and password",
          })}
        </Typography>
      </div>

      {/* Change Email */}
      <div className="space-y-4">
        <div>
          <Typography
            variant="subtitle1"
            className={`font-bold ${
              isDark ? "text-slate-100" : "text-zinc-900"
            }`}
          >
            {t("profile.settings.changeEmail", {
              defaultValue: "Change Email",
            })}
          </Typography>

          <Typography
            variant="body2"
            className={`mt-1 ${
              isDark ? "text-slate-400" : "text-zinc-500"
            }`}
          >
            Enter your new email address.
          </Typography>
        </div>

        {emailMutation.isSuccess && (
          <Alert
            severity="success"
            onClose={() => emailMutation.reset()}
          >
            Email changed successfully.
          </Alert>
        )}

        {emailMutation.isError && (
          <Alert
            severity="error"
            onClose={() => emailMutation.reset()}
          >
            {getErrorMessage(
              emailMutation.error,
              "Failed to change email."
            )}
          </Alert>
        )}

        <form
          onSubmit={handleEmailSubmit}
          className="flex flex-col gap-3 sm:flex-row sm:items-start"
        >
          <TextField
            type="email"
            label="New Email"
            value={email}
            onChange={(event) => {
              emailMutation.reset();
              setEmail(event.target.value);
            }}
            required
            fullWidth
            sx={textFieldSx}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailOutlined
                    sx={{
                      color: isDark ? "#64748b" : "#71717a",
                    }}
                  />
                </InputAdornment>
              ),
            }}
          />

          <Button
            type="submit"
            variant="contained"
            disabled={emailMutation.isPending}
            sx={{
              minWidth: 130,
              height: 56,
              borderRadius: "10px",
              backgroundColor: PRIMARY_COLOR,
              textTransform: "none",
              fontWeight: 700,
              boxShadow: "none",

              "&:hover": {
                backgroundColor: "#c53d3d",
                boxShadow: "none",
              },
            }}
          >
            {emailMutation.isPending ? (
              <CircularProgress
                size={20}
                sx={{ color: "#fff" }}
              />
            ) : (
              "Update Email"
            )}
          </Button>
        </form>
      </div>

      <Divider
        sx={{
          borderColor: isDark ? "#334155" : "#e4e4e7",
        }}
      />

      {/* Change Password */}
      <div className="space-y-4">
        <div>
          <Typography
            variant="subtitle1"
            className={`font-bold ${
              isDark ? "text-slate-100" : "text-zinc-900"
            }`}
          >
            {t("profile.settings.changePassword", {
              defaultValue: "Change Password",
            })}
          </Typography>

          <Typography
            variant="body2"
            className={`mt-1 ${
              isDark ? "text-slate-400" : "text-zinc-500"
            }`}
          >
            Make sure your new password is secure.
          </Typography>
        </div>

        {passwordMutation.isSuccess && (
          <Alert
            severity="success"
            onClose={() => passwordMutation.reset()}
          >
            Password changed successfully.
          </Alert>
        )}

        {passwordMutation.isError && (
          <Alert
            severity="error"
            onClose={() => passwordMutation.reset()}
          >
            {getErrorMessage(
              passwordMutation.error,
              "Failed to change password."
            )}
          </Alert>
        )}

        {passwords.newPassword &&
          passwords.confirmNewPassword &&
          passwords.newPassword !==
            passwords.confirmNewPassword && (
            <Alert severity="warning">
              New password and confirmation do not match.
            </Alert>
          )}

        <form
          onSubmit={handlePasswordSubmit}
          className="space-y-4"
        >
          <TextField
            type={showCurrent ? "text" : "password"}
            label="Current Password"
            value={passwords.currentPassword}
            onChange={handlePasswordChange(
              "currentPassword"
            )}
            required
            fullWidth
            sx={textFieldSx}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockOutlined
                    sx={{
                      color: isDark ? "#64748b" : "#71717a",
                    }}
                  />
                </InputAdornment>
              ),

              endAdornment: (
                <InputAdornment position="end">
                  <Button
                    type="button"
                    onClick={() =>
                      setShowCurrent((prev) => !prev)
                    }
                    sx={{
                      minWidth: 0,
                      color: isDark ? "#94a3b8" : "#71717a",
                    }}
                  >
                    {showCurrent ? (
                      <VisibilityOff fontSize="small" />
                    ) : (
                      <Visibility fontSize="small" />
                    )}
                  </Button>
                </InputAdornment>
              ),
            }}
          />

          <TextField
            type={showNew ? "text" : "password"}
            label="New Password"
            value={passwords.newPassword}
            onChange={handlePasswordChange("newPassword")}
            required
            fullWidth
            sx={textFieldSx}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockOutlined
                    sx={{
                      color: isDark ? "#64748b" : "#71717a",
                    }}
                  />
                </InputAdornment>
              ),

              endAdornment: (
                <InputAdornment position="end">
                  <Button
                    type="button"
                    onClick={() =>
                      setShowNew((prev) => !prev)
                    }
                    sx={{
                      minWidth: 0,
                      color: isDark ? "#94a3b8" : "#71717a",
                    }}
                  >
                    {showNew ? (
                      <VisibilityOff fontSize="small" />
                    ) : (
                      <Visibility fontSize="small" />
                    )}
                  </Button>
                </InputAdornment>
              ),
            }}
          />

          <TextField
            type={showConfirm ? "text" : "password"}
            label="Confirm New Password"
            value={passwords.confirmNewPassword}
            onChange={handlePasswordChange(
              "confirmNewPassword"
            )}
            required
            fullWidth
            sx={textFieldSx}
            error={
              Boolean(passwords.confirmNewPassword) &&
              passwords.newPassword !==
                passwords.confirmNewPassword
            }
            helperText={
              passwords.confirmNewPassword &&
              passwords.newPassword !==
                passwords.confirmNewPassword
                ? "Passwords do not match"
                : ""
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockOutlined
                    sx={{
                      color: isDark ? "#64748b" : "#71717a",
                    }}
                  />
                </InputAdornment>
              ),

              endAdornment: (
                <InputAdornment position="end">
                  <Button
                    type="button"
                    onClick={() =>
                      setShowConfirm((prev) => !prev)
                    }
                    sx={{
                      minWidth: 0,
                      color: isDark ? "#94a3b8" : "#71717a",
                    }}
                  >
                    {showConfirm ? (
                      <VisibilityOff fontSize="small" />
                    ) : (
                      <Visibility fontSize="small" />
                    )}
                  </Button>
                </InputAdornment>
              ),
            }}
          />

          <Button
            type="submit"
            variant="contained"
            disabled={
              passwordMutation.isPending ||
              passwords.newPassword !==
                passwords.confirmNewPassword
            }
            sx={{
              borderRadius: "10px",
              backgroundColor: "#091E27",
              textTransform: "none",
              fontWeight: 700,
              px: 3,
              boxShadow: "none",

              "&:hover": {
                backgroundColor: "#0f2d3a",
                boxShadow: "none",
              },
            }}
          >
            {passwordMutation.isPending ? (
              <span className="flex items-center gap-2">
                <CircularProgress
                  size={18}
                  sx={{ color: "#fff" }}
                />
                Updating...
              </span>
            ) : (
              "Update Password"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}

ProfileSettings.propTypes = {
  onProfileUpdated: PropTypes.func,
};

ProfileSettings.defaultProps = {
  onProfileUpdated: undefined,
};