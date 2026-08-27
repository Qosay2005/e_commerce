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
import { EmailOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useSendResetCode } from "../../hocks/useResetPassword";
import useThemeStore from "../../hocks/useThemeStore";
import PageTransition from '../../PageTransition'
const PRIMARY_COLOR = "#DB4444";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const mode = useThemeStore((state) => state.mode);
  const isDark = mode === "dark";

  const sendCodeMutation = useSendResetCode();

  const getErrorMessage = (error) =>
    error?.response?.data?.message ||
    error?.response?.data?.errors?.[0] ||
    error?.message ||
    "Unable to send the verification code. Please try again.";

  const handleSubmit = (event) => {
    event.preventDefault();

    const formattedEmail = email.trim();

    if (!formattedEmail) return;

    sendCodeMutation.mutate(formattedEmail, {
      onSuccess: () => {
        navigate("/reset-password", {
          state: {
            email: formattedEmail,
          },
        });
      },
    });
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
              Enter your email address and we'll send you a verification code.
            </Typography>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <TextField
              type="email"
              label="Email Address"
              placeholder="example@email.com"
              value={email}
              onChange={(event) => {
                sendCodeMutation.reset();
                setEmail(event.target.value);
              }}
              required
              fullWidth
              autoComplete="email"
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

            {sendCodeMutation.isError && (
              <Alert
                severity="error"
                onClose={() => sendCodeMutation.reset()}
              >
                {getErrorMessage(sendCodeMutation.error)}
              </Alert>
            )}

            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={sendCodeMutation.isPending || !email.trim()}
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
              {sendCodeMutation.isPending ? (
                <CircularProgress size={22} sx={{ color: "#fff" }} />
              ) : (
                "Send Code"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </section>
    </PageTransition>
  );
}