import React, { useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'
import router from './Router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import useThemeStore from './hocks/useThemeStore'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
export default function App() {
  const queryClient = new QueryClient()
  const { i18n } = useTranslation()
  const mode = useThemeStore((state) => state.mode)

  useEffect(() => {
    const isArabic = i18n.language?.startsWith('ar')
    document.documentElement.dir = isArabic ? 'rtl' : 'ltr'
    document.documentElement.lang = isArabic ? 'ar' : 'en'
  }, [i18n.language])

  useEffect(() => {
    if (mode === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [mode])

  const theme = createTheme({
    palette: {
      mode,
      primary: { main: '#091E27' },
      secondary: { main: '#5B8C9C' },
      background: {
        default: mode === 'dark' ? '#09090B' : '#dbe7ee',
        paper: mode === 'dark' ? '#18181B' : '#ffffff',
      },
      text: {
        primary: mode === 'dark' ? '#FFFFFF' : '#091E27',
        secondary: mode === 'dark' ? '#D4D4D8' : '#4b5563',
      },
    },
    typography: {
      fontFamily: 'Roboto, sans-serif',
    },
  })

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryClientProvider>
  )
}
