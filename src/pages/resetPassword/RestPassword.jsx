
import React, { useState } from "react";
import {
  Alert,
  Button,
  Card,
  CardContent,
  CircularProgress,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import {
  LockOutlined,
  VpnKeyOutlined,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import { useResetPassword } from "../../hocks/useResetPassword";
import useThemeStore from "../../hocks/useThemeStore";
import PageTransition from '../../PageTransition'
const PRIMARY_COLOR = "#DB4444";

export default function RestPassword() {
  const location = useLocation();
  const navigate = useNavigate();

  const mode = useThemeStore((state) => state.mode);
  const isDark = mode === "dark";

  const email = location.state?.email || "";

  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const mutation = useResetPassword();

  const passwordMismatch =
    Boolean(confirmPassword) && newPassword !== confirmPassword;

  const getErrorMessage = (error) =>
    error?.response?.data?.message ||
    error?.response?.data?.errors?.[0] ||
    error?.message ||
    "Unable to reset your password. Please try again.";

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!email || !code.trim() || !newPassword || passwordMismatch) {
      return;
    }

    mutation.mutate(
      {
        email,
        code: code.trim(),
        newPassword,
        confirmNewPassword: confirmPassword,
      },
      {
        onSuccess: () => {
          setCode("");
          setNewPassword("");
          setConfirmPassword("");

          setTimeout(() => {
            navigate("/login");
          }, 1500);
        },
      }
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

  const iconColor = isDark ? "#64748b" : "#71717a";

  const visibilityButtonSx = {
    color: isDark ? "#94a3b8" : "#71717a",

    "&:hover": {
      backgroundColor: isDark
        ? "rgba(148, 163, 184, 0.08)"
        : "rgba(0, 0, 0, 0.04)",
    },
  };

  if (!email) {
    return (
      <PageTransition>
      <section className="flex min-h-[70vh] items-center justify-center px-4 py-10">
        <Card
          className={`w-full max-w-[530px] rounded-[20px] border shadow-lg ${
            isDark
              ? "border-slate-700 bg-slate-900"
              : "border-zinc-200 bg-white"
          }`}
        >
          <CardContent className="p-7 text-center sm:p-10">
            <Typography
              variant="h5"
              className={`font-bold ${
                isDark ? "text-slate-100" : "text-slate-800"
              }`}
            >
              Invalid Request
            </Typography>

            <Typography
              variant="body2"
              className={`mt-3 ${
                isDark ? "text-slate-400" : "text-slate-500"
              }`}
            >
              Please request a new verification code.
            </Typography>

            <Button
              variant="contained"
              onClick={() => navigate("/forgot-password")}
              sx={{
                mt: 3,
                minHeight: 44,
                borderRadius: "8px",
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
              Back to Forgot Password
            </Button>
          </CardContent>
        </Card>
      </section>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
    <section className="flex min-h-[70vh] items-center justify-center px-4 py-10">
      <Card
        className={`w-full max-w-[530px] rounded-[20px] border shadow-lg ${
          isDark
            ? "border-slate-700 bg-slate-900"
            : "border-zinc-200 bg-white"
        }`}
      >
        <CardContent className="p-7 sm:p-10">
          <div className="text-center">
            <Typography
              component="h1"
              variant="h4"
              className={`font-bold tracking-tight ${
                isDark ? "text-slate-100" : "text-slate-800"
              }`}
            >
              Reset Password
            </Typography>

            <Typography
              variant="body1"
              className={`mt-4 ${
                isDark ? "text-slate-400" : "text-slate-500"
              }`}
            >
              Enter the verification code sent to your email and choose a new
              password.
            </Typography>

            <Typography
              variant="body2"
              className={`mt-2 break-all font-semibold ${
                isDark ? "text-slate-200" : "text-slate-700"
              }`}
            >
              {email}
            </Typography>
          </div>

          {mutation.isSuccess && (
            <Alert severity="success" className="mt-6">
              Password reset successfully. Redirecting to login...
            </Alert>
          )}

          {mutation.isError && (
            <Alert
              severity="error"
              className="mt-6"
              onClose={() => mutation.reset()}
            >
              {getErrorMessage(mutation.error)}
            </Alert>
          )}

          {passwordMismatch && (
            <Alert severity="warning" className="mt-6">
              New password and confirmation do not match.
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <TextField
              label="Verification Code"
              placeholder="Enter the code sent to your email"
              value={code}
              onChange={(event) => {
                mutation.reset();
                setCode(event.target.value);
              }}
              required
              fullWidth
              autoComplete="one-time-code"
              sx={textFieldSx}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <VpnKeyOutlined sx={{ color: iconColor }} />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              type={showPassword ? "text" : "password"}
              label="New Password"
              value={newPassword}
              onChange={(event) => {
                mutation.reset();
                setNewPassword(event.target.value);
              }}
              required
              fullWidth
              autoComplete="new-password"
              sx={textFieldSx}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlined sx={{ color: iconColor }} />
                  </InputAdornment>
                ),

                endAdornment: (
                  <InputAdornment position="end">
                    <Button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      sx={visibilityButtonSx}
                      aria-label="Toggle new password visibility"
                    >
                      {showPassword ? (
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
              type={showConfirmPassword ? "text" : "password"}
              label="Confirm New Password"
              value={confirmPassword}
              onChange={(event) => {
                mutation.reset();
                setConfirmPassword(event.target.value);
              }}
              required
              fullWidth
              autoComplete="new-password"
              error={passwordMismatch}
              helperText={
                passwordMismatch ? "Passwords do not match" : ""
              }
              sx={textFieldSx}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlined sx={{ color: iconColor }} />
                  </InputAdornment>
                ),

                endAdornment: (
                  <InputAdornment position="end">
                    <Button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword((prev) => !prev)
                      }
                      sx={visibilityButtonSx}
                      aria-label="Toggle confirm password visibility"
                    >
                      {showConfirmPassword ? (
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
              fullWidth
              disabled={
                mutation.isPending ||
                !code.trim() ||
                !newPassword ||
                !confirmPassword ||
                passwordMismatch
              }
              sx={{
                minHeight: 48,
                borderRadius: "8px",
                backgroundColor: PRIMARY_COLOR,
                textTransform: "none",
                fontWeight: 700,
                fontSize: "0.95rem",
                boxShadow: "none",

                "&:hover": {
                  backgroundColor: "#c53d3d",
                  boxShadow: "none",
                },

                "&.Mui-disabled": {
                  backgroundColor: isDark ? "#475569" : "#d4d4d8",
                },
              }}
            >
              {mutation.isPending ? (
                <span className="flex items-center gap-2">
                  <CircularProgress size={20} sx={{ color: "#fff" }} />
                  Resetting...
                </span>
              ) : (
                "Reset Password"
              )}
            </Button>

            <Button
              type="button"
              fullWidth
              onClick={() => navigate("/forgot-password")}
              sx={{
                minHeight: 44,
                borderRadius: "8px",
                color: isDark ? "#cbd5e1" : "#52525b",
                textTransform: "none",
                fontWeight: 600,
              }}
            >
              Request a New Code
            </Button>
          </form>
        </CardContent>
      </Card>
    </section>
    </PageTransition>
  )
}

