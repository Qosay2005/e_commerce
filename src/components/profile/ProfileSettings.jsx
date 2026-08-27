
import React, { useState } from "react";

import {
  Alert,
  Box,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";

import {
  EmailOutlined,
  LockOutlined,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";

import PropTypes from "prop-types";

import {
  useChangeEmail,
  useChangePassword,
} from "../../hocks/useProfile";

import useThemeStore from "../../hocks/useThemeStore";
import PageTransition from '../../PageTransition'
const PRIMARY_COLOR = "#DB4444";


function PasswordField({
  field,
  label,
  autoComplete,
  value,
  onChange,
  visible,
  onToggle,
  iconColor,
  textFieldSx,
  visibilityButtonSx,
  error = false,
  helperText = "",
}) {
  return (
  <PageTransition>
    <TextField
      type={visible ? "text" : "password"}
      label={label}
      value={value}
      onChange={onChange}
      required
      fullWidth
      autoComplete={autoComplete}
      error={error}
      helperText={helperText}
      sx={textFieldSx}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <LockOutlined sx={{ color: iconColor }} />
          </InputAdornment>
        ),

        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              edge="end"
              type="button"
              onClick={onToggle}
              sx={visibilityButtonSx}
              aria-label={`Toggle ${label.toLowerCase()} visibility`}
            >
              {visible ? (
                <VisibilityOff fontSize="small" />
              ) : (
                <Visibility fontSize="small" />
              )}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
    </PageTransition>
  );
}

PasswordField.propTypes = {
  field: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  autoComplete: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  iconColor: PropTypes.string.isRequired,
  textFieldSx: PropTypes.object.isRequired,
  visibilityButtonSx: PropTypes.object.isRequired,
  error: PropTypes.bool,
  helperText: PropTypes.string,
};

export default function ProfileSettings({
  profile,
  onProfileUpdated,
}) {
  const mode = useThemeStore((state) => state.mode);
  const isDark = mode === "dark";

  const [activeTab, setActiveTab] = useState(0);

  const [email, setEmail] = useState("");

  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [visiblePasswords, setVisiblePasswords] = useState({
    currentPassword: false,
    newPassword: false,
    confirmNewPassword: false,
  });

  const emailMutation = useChangeEmail();
  const passwordMutation = useChangePassword();

  const iconColor = isDark ? "#64748b" : "#71717a";

  const textFieldSx = {
    "& .MuiInputLabel-root": {
      color: isDark ? "#94a3b8" : "#71717a",
    },

    "& .MuiInputLabel-root.Mui-focused": {
      color: PRIMARY_COLOR,
    },

    "& .MuiOutlinedInput-root": {
      borderRadius: "12px",
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

    "& .MuiInputBase-input": {
      color: isDark ? "#f8fafc" : "#18181b",
    },

    "& .MuiFormHelperText-root": {
      marginLeft: 0,
      marginRight: 0,
    },
  };

  const visibilityButtonSx = {
    color: isDark ? "#94a3b8" : "#71717a",

    "&:hover": {
      backgroundColor: isDark
        ? "rgba(148, 163, 184, 0.08)"
        : "rgba(0, 0, 0, 0.04)",
    },
  };

  const getErrorMessage = (error, fallback) =>
    error?.response?.data?.message ||
    error?.response?.data?.errors?.[0] ||
    error?.message ||
    fallback;

  const handleTabChange = (_, value) => {
    setActiveTab(value);

    emailMutation.reset();
    passwordMutation.reset();
  };

  // =========================
  // EMAIL
  // =========================

  const handleEmailChange = (event) => {
    emailMutation.reset();
    setEmail(event.target.value);
  };

  const handleEmailSubmit = (event) => {
    event.preventDefault();

    const newEmail = email.trim();
    const currentEmail = profile?.email?.trim();

    if (
      !newEmail ||
      newEmail.toLowerCase() === currentEmail?.toLowerCase()
    ) {
      return;
    }

    emailMutation.mutate(
      {
        NewEmail: newEmail,
      },
      {
        onSuccess: async () => {
          setEmail("");
          await onProfileUpdated?.();
        },
      }
    );
  };

  // =========================
  // PASSWORD
  // =========================

  const handlePasswordChange = (field) => (event) => {
    passwordMutation.reset();

    setPasswords((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  const togglePasswordVisibility = (field) => {
    setVisiblePasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handlePasswordSubmit = (event) => {
    event.preventDefault();

    if (
      passwords.newPassword !==
      passwords.confirmNewPassword
    ) {
      return;
    }

    passwordMutation.mutate(
      {
        CurrentPassword: passwords.currentPassword,
        NewPassword: passwords.newPassword,
        ConfirmNewPassword: passwords.confirmNewPassword,
      },
      {
        onSuccess: () => {
          setPasswords({
            currentPassword: "",
            newPassword: "",
            confirmNewPassword: "",
          });

          setVisiblePasswords({
            currentPassword: false,
            newPassword: false,
            confirmNewPassword: false,
          });
        },
      }
    );
  };

  const passwordMismatch =
    Boolean(passwords.confirmNewPassword) &&
    passwords.newPassword !== passwords.confirmNewPassword;

  const sameEmail =
    Boolean(email.trim()) &&
    email.trim().toLowerCase() ===
      profile?.email?.trim().toLowerCase();

  return (
    <div className="space-y-6">

      {/* ================= HEADER ================= */}

      <div>
        <Typography
          variant="h6"
          className={`font-bold ${
            isDark ? "text-slate-100" : "text-zinc-900"
          }`}
        >
          Settings
        </Typography>

        <Typography
          variant="body2"
          className={`mt-1 ${
            isDark ? "text-slate-400" : "text-zinc-500"
          }`}
        >
          Manage your account security and preferences.
        </Typography>
      </div>

      {/* ================= TABS ================= */}

      <Box
        sx={{
          borderBottom: 1,
          borderColor: isDark ? "#334155" : "#e4e4e7",
        }}
      >
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="fullWidth"
          sx={{
            minHeight: 52,

            "& .MuiTab-root": {
              textTransform: "none",
              fontWeight: 700,
              color: isDark ? "#94a3b8" : "#71717a",
              minHeight: 52,
              fontSize: {
                xs: "0.8rem",
                sm: "0.9rem",
              },
            },

            "& .Mui-selected": {
              color: `${PRIMARY_COLOR} !important`,
            },

            "& .MuiTabs-indicator": {
              backgroundColor: PRIMARY_COLOR,
              height: 3,
              borderRadius: "3px 3px 0 0",
            },
          }}
        >
          <Tab
            icon={<EmailOutlined fontSize="small" />}
            iconPosition="start"
            label="Email"
          />

          <Tab
            icon={<LockOutlined fontSize="small" />}
            iconPosition="start"
            label="Password"
          />
        </Tabs>
      </Box>

      {/* ================= EMAIL TAB ================= */}

      {activeTab === 0 && (
        <div className="space-y-5">

          <div>
            <Typography
              variant="subtitle1"
              className={`font-bold ${
                isDark ? "text-slate-100" : "text-zinc-900"
              }`}
            >
              Change Email Address
            </Typography>

            <Typography
              variant="body2"
              className={`mt-1 ${
                isDark ? "text-slate-400" : "text-zinc-500"
              }`}
            >
              Update the email address associated with your account.
            </Typography>
          </div>

          {/* Current Email */}

          <div
            className={`rounded-xl border p-4 ${
              isDark
                ? "border-slate-700 bg-slate-800/50"
                : "border-zinc-200 bg-zinc-50/70"
            }`}
          >
            <div className="flex items-center gap-3">

              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                  isDark ? "bg-slate-700/70" : "bg-white"
                }`}
              >
                <EmailOutlined
                  sx={{
                    color: PRIMARY_COLOR,
                    fontSize: 21,
                  }}
                />
              </div>

              <div className="min-w-0">

                <Typography
                  variant="caption"
                  className={`block font-medium ${
                    isDark
                      ? "text-slate-400"
                      : "text-zinc-500"
                  }`}
                >
                  Current Email
                </Typography>

                <Typography
                  variant="body1"
                  className={`mt-0.5 break-all font-semibold ${
                    isDark
                      ? "text-slate-100"
                      : "text-zinc-900"
                  }`}
                >
                  {profile?.email || "—"}
                </Typography>

              </div>
            </div>
          </div>

          {/* Success */}

          {emailMutation.isSuccess && (
            <Alert
              severity="success"
              onClose={() => emailMutation.reset()}
            >
              Email changed successfully.
            </Alert>
          )}

          {/* Error */}

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

          {/* Same Email */}

          {sameEmail && (
            <Alert severity="info">
              This is already your current email address.
            </Alert>
          )}

          {/* Email Form */}

          <form
            onSubmit={handleEmailSubmit}
            className="space-y-4"
          >
            <TextField
              type="email"
              label="New Email Address"
              placeholder="example@email.com"
              value={email}
              onChange={handleEmailChange}
              required
              fullWidth
              autoComplete="email"
              sx={textFieldSx}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailOutlined
                      sx={{
                        color: iconColor,
                      }}
                    />
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              variant="contained"
              disabled={
                emailMutation.isPending ||
                !email.trim() ||
                sameEmail
              }
              sx={{
                borderRadius: "10px",
                backgroundColor: PRIMARY_COLOR,
                textTransform: "none",
                fontWeight: 700,
                px: 3,
                minHeight: 44,
                boxShadow: "none",

                "&:hover": {
                  backgroundColor: "#c53d3d",
                  boxShadow: "none",
                },
              }}
            >
              {emailMutation.isPending ? (
                <span className="flex items-center gap-2">
                  <CircularProgress
                    size={18}
                    sx={{ color: "#fff" }}
                  />
                  Updating...
                </span>
              ) : (
                "Update Email"
              )}
            </Button>
          </form>
        </div>
      )}

      {/* ================= PASSWORD TAB ================= */}

      {activeTab === 1 && (
        <div className="space-y-5">

          <div>
            <Typography
              variant="subtitle1"
              className={`font-bold ${
                isDark ? "text-slate-100" : "text-zinc-900"
              }`}
            >
              Change Password
            </Typography>

            <Typography
              variant="body2"
              className={`mt-1 ${
                isDark ? "text-slate-400" : "text-zinc-500"
              }`}
            >
              Choose a strong password to keep your account secure.
            </Typography>
          </div>

          {/* Success */}

          {passwordMutation.isSuccess && (
            <Alert
              severity="success"
              onClose={() => passwordMutation.reset()}
            >
              Password changed successfully.
            </Alert>
          )}

          {/* Error */}

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

          {/* Password mismatch */}

          {passwordMismatch && (
            <Alert severity="warning">
              New password and confirmation do not match.
            </Alert>
          )}

          {/* Password Form */}

          <form
            onSubmit={handlePasswordSubmit}
            className="space-y-4"
          >

            <PasswordField
              field="currentPassword"
              label="Current Password"
              autoComplete="current-password"
              value={passwords.currentPassword}
              onChange={handlePasswordChange("currentPassword")}
              visible={visiblePasswords.currentPassword}
              onToggle={() =>
                togglePasswordVisibility("currentPassword")
              }
              iconColor={iconColor}
              textFieldSx={textFieldSx}
              visibilityButtonSx={visibilityButtonSx}
            />

            <PasswordField
              field="newPassword"
              label="New Password"
              autoComplete="new-password"
              value={passwords.newPassword}
              onChange={handlePasswordChange("newPassword")}
              visible={visiblePasswords.newPassword}
              onToggle={() =>
                togglePasswordVisibility("newPassword")
              }
              iconColor={iconColor}
              textFieldSx={textFieldSx}
              visibilityButtonSx={visibilityButtonSx}
            />

            <PasswordField
              field="confirmNewPassword"
              label="Confirm New Password"
              autoComplete="new-password"
              value={passwords.confirmNewPassword}
              onChange={handlePasswordChange("confirmNewPassword")}
              visible={visiblePasswords.confirmNewPassword}
              onToggle={() =>
                togglePasswordVisibility("confirmNewPassword")
              }
              iconColor={iconColor}
              textFieldSx={textFieldSx}
              visibilityButtonSx={visibilityButtonSx}
              error={passwordMismatch}
              helperText={
                passwordMismatch
                  ? "Passwords do not match"
                  : ""
              }
            />

            <Button
              type="submit"
              variant="contained"
              disabled={
                passwordMutation.isPending ||
                !passwords.currentPassword ||
                !passwords.newPassword ||
                !passwords.confirmNewPassword ||
                passwordMismatch
              }
              sx={{
                borderRadius: "10px",
                backgroundColor: "#091E27",
                textTransform: "none",
                fontWeight: 700,
                px: 3,
                minHeight: 44,
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
      )}
    </div>
  );
}

ProfileSettings.propTypes = {
  profile: PropTypes.shape({
    email: PropTypes.string,
  }),
  onProfileUpdated: PropTypes.func,
};

ProfileSettings.defaultProps = {
  profile: null,
  onProfileUpdated: undefined,
};

