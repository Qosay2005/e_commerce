import React, { useState } from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import {
  Button,
  CircularProgress,
  TextField,
  InputAdornment,
} from "@mui/material";

import {
  Email,
  Lock,
} from "@mui/icons-material";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginSchema } from "../../validation/LoginSchema";
import axiosInstance from "../../api/axiosinstans";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuthStore from "../../hocks/authStore";
import useThemeStore from "../../hocks/useThemeStore";
import { useTranslation } from "react-i18next";

export default function Login() {
  const [serverErrors, setServerErrors] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();
  const redirectPath = location.state?.from?.pathname || "/";

  const setToken = useAuthStore((state) => state.setToken);

  const mode = useThemeStore((state) => state.mode);
  const isDark = mode === "dark";

  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(LoginSchema),
  });

  const textColor = isDark ? "#ffffff" : "#091E27";
  const secondaryTextColor = isDark ? "#d1d5db" : "#6b7280";

  const inputStyles = {
    borderRadius: 2,
    backgroundColor: isDark ? "#1e293b" : "#eef7fb",
    color: textColor,

    "& fieldset": {
      borderColor: isDark ? "#475569" : "#cbd9e1",
    },

    "&:hover fieldset": {
      borderColor: isDark ? "#94a3b8" : "#9db4c5",
    },

    "&.Mui-focused fieldset": {
      borderColor: isDark ? "#ffffff" : "#091E27",
    },
  };

  const LoginForm = async (data) => {
    try {
      setServerErrors([]);

      const response = await axiosInstance.post(
        "/auth/Account/Login",
        data
      );

      setToken(response.data.accessToken);

      navigate(redirectPath, { replace: true });
    } catch (error) {
      setServerErrors(
        error.response?.data?.errors || ["Login failed"]
      );
    }
  };

  return (
    <Box
      className={
        isDark
          ? "min-h-screen bg-slate-900 px-4 py-6 sm:px-6 flex flex-col justify-between"
          : "min-h-screen bg-white px-4 py-6 sm:px-6 flex flex-col justify-between"
      }
    >
      <Box className="flex flex-1 items-center justify-center">
        <Box className="w-full max-w-[390px]">
          <Box
            className={
              isDark
                ? "rounded-[28px] bg-slate-800 p-5 shadow-[0_10px_35px_rgba(0,0,0,0.25)] sm:p-6"
                : "rounded-[28px] bg-white p-5 shadow-[0_10px_35px_rgba(9,30,39,0.08)] sm:p-6"
            }
          >
            <Box className="mb-4">
              <Typography
                sx={{
                  color: textColor,
                  fontWeight: 700,
                  fontSize: "1.1rem",
                  mb: 0.5,
                }}
              >
                {t("auth.login.title")}
              </Typography>

              <Typography
                sx={{
                  color: secondaryTextColor,
                  fontSize: "0.72rem",
                }}
              >
                {t("auth.login.subtitle")}
              </Typography>
            </Box>

            {serverErrors?.map((error, index) => (
              <Typography
                key={index}
                sx={{
                  color: "#ef5350",
                  fontSize: "0.75rem",
                  mb: 1,
                }}
              >
                {typeof error === "string"
                  ? error
                  : JSON.stringify(error)}
              </Typography>
            ))}

            <Box
              component="form"
              className="flex flex-col gap-3"
              onSubmit={handleSubmit(LoginForm)}
            >
              <TextField
                {...register("email")}
                label={t("auth.login.email")}
                variant="outlined"
                size="small"
                error={Boolean(errors.email)}
                helperText={errors.email?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email
                        sx={{
                          color: isDark ? "#ffffff" : "#6b7280",
                          fontSize: 18,
                        }}
                      />
                    </InputAdornment>
                  ),
                  sx: inputStyles,
                }}
                sx={{
                  "& .MuiInputLabel-root": {
                    color: secondaryTextColor,
                  },

                  "& .MuiInputLabel-root.Mui-focused": {
                    color: textColor,
                  },

                  "& .MuiInputBase-input": {
                    color: textColor,
                  },

                  "& .MuiFormHelperText-root": {
                    marginLeft: 0,
                    marginRight: 0,
                    fontSize: "0.7rem",
                  },
                }}
              />

              <TextField
                {...register("password")}
                label={t("auth.login.password")}
                variant="outlined"
                type="password"
                size="small"
                error={Boolean(errors.password)}
                helperText={errors.password?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock
                        sx={{
                          color: isDark ? "#ffffff" : "#6b7280",
                          fontSize: 18,
                        }}
                      />
                    </InputAdornment>
                  ),
                  sx: inputStyles,
                }}
                sx={{
                  "& .MuiInputLabel-root": {
                    color: secondaryTextColor,
                  },

                  "& .MuiInputLabel-root.Mui-focused": {
                    color: textColor,
                  },

                  "& .MuiInputBase-input": {
                    color: textColor,
                  },

                  "& .MuiFormHelperText-root": {
                    marginLeft: 0,
                    marginRight: 0,
                    fontSize: "0.7rem",
                  },
                }}
              />

              <Button
                type="submit"
                variant="contained"
                disabled={isSubmitting}
                sx={{
                  minHeight: 40,
                  borderRadius: 2,
                  backgroundColor: "#091E27",
                  color: "#ffffff",
                  textTransform: "none",
                  fontWeight: 700,
                  boxShadow: "none",

                  "&:hover": {
                    backgroundColor: "#0f2d3a",
                  },
                }}
              >
                {isSubmitting ? (
                  <Box className="flex items-center gap-2">
                    <CircularProgress
                      size={16}
                      sx={{ color: "#ffffff" }}
                    />
                    <span>{t("status.loading")}</span>
                  </Box>
                ) : (
                  t("auth.login.submit")
                )}
              </Button>
            </Box>

            <Box className="mt-4 text-center">
              <Typography
                sx={{
                  color: secondaryTextColor,
                  fontSize: "0.72rem",
                }}
              >
                {t("auth.login.noAccount")}{" "}
                <Box
                  component="span"
                  sx={{
                    color: textColor,
                    fontWeight: 700,
                  }}
                >
                  <Link
                    to="/register"
                    style={{
                      color: textColor,
                      textDecoration: "none",
                    }}
                  >
                    {t("auth.login.registerLink")}
                  </Link>
                </Box>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}