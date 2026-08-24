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
  Person,
  Phone,
} from "@mui/icons-material";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../../validation/RegisterSchema";
import axiosInstance from "../../api/axiosinstans";
import { Link } from "react-router-dom";
import useThemeStore from "../../hocks/useThemeStore";

export default function Register() {
  const [serverErrors, setServerErrors] = useState([]);

  const mode = useThemeStore((state) => state.mode);
  const isDark = mode === "dark";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(registerSchema),
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

  const textFieldStyles = {
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
  };

  const RegisterForm = async (data) => {
    try {
      setServerErrors([]);

      const response = await axiosInstance.post(
        "/auth/Account/Register",
        data
      );

      console.log(response.data);
    } catch (error) {
      setServerErrors(
        error.response?.data?.errors || ["Registration failed"]
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
        <Box className="w-full max-w-[24rem]">
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
                Create Your Account
              </Typography>

              <Typography
                sx={{
                  color: secondaryTextColor,
                  fontSize: "0.72rem",
                }}
              >
                Start your journey into engineering excellence today.
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
              onSubmit={handleSubmit(RegisterForm)}
            >
              <TextField
                {...register("fullName")}
                label="Full Name"
                variant="outlined"
                size="small"
                error={Boolean(errors.fullName)}
                helperText={errors.fullName?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person
                        sx={{
                          color: isDark ? "#ffffff" : "#6b7280",
                          fontSize: 18,
                        }}
                      />
                    </InputAdornment>
                  ),
                  sx: inputStyles,
                }}
                sx={textFieldStyles}
              />

              <TextField
                {...register("userName")}
                label="Username"
                variant="outlined"
                size="small"
                error={Boolean(errors.userName)}
                helperText={errors.userName?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person
                        sx={{
                          color: isDark ? "#ffffff" : "#6b7280",
                          fontSize: 18,
                        }}
                      />
                    </InputAdornment>
                  ),
                  sx: inputStyles,
                }}
                sx={textFieldStyles}
              />

              <TextField
                {...register("email")}
                label="Email"
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
                sx={textFieldStyles}
              />

              <TextField
                {...register("password")}
                label="Password"
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
                sx={textFieldStyles}
              />

              <TextField
                {...register("phoneNumber")}
                label="Phone Number"
                variant="outlined"
                size="small"
                error={Boolean(errors.phoneNumber)}
                helperText={errors.phoneNumber?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Phone
                        sx={{
                          color: isDark ? "#ffffff" : "#6b7280",
                          fontSize: 18,
                        }}
                      />
                    </InputAdornment>
                  ),
                  sx: inputStyles,
                }}
                sx={textFieldStyles}
              />

              <Button
                type="submit"
                variant="contained"
                disabled={isSubmitting}
                sx={{
                  minHeight: 40,
                  borderRadius: 2,
                  backgroundColor: "#DB4444",
                  color: "#ffffff",
                  textTransform: "none",
                  fontWeight: 700,
                  boxShadow: "none",

                  
                }}
              >
                {isSubmitting ? (
                  <Box className="flex items-center gap-2">
                    <CircularProgress
                      size={16}
                      sx={{ color: "#ffffff" }}
                    />
                    <span>Creating Account...</span>
                  </Box>
                ) : (
                  "Create Account"
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
                Already have an account?{" "}
                <Box
                  component="span"
                  sx={{
                    color: textColor,
                    fontWeight: 700,
                  }}
                >
                  <Link
                    to="/login"
                    style={{
                      color: textColor,
                      textDecoration: "none",
                    }}
                  >
                    Login
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