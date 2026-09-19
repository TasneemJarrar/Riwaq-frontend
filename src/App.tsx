import { useEffect, useState } from 'react';
import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useTranslation } from 'react-i18next';
import useThemeStore from './hooks/useThemeStore';
import './i18next';
import { router } from './Router';
import { CacheProvider } from '@emotion/react';
import { cacheRtl, cacheLtr } from './rtlCache';
import { useAuthTokenSync } from './hooks/useAuthTokenSync';


export default function App() {
  useAuthTokenSync();
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const mode = useThemeStore((state) => state.mode);

  const [queryClient] = useState(() => new QueryClient());

  // Handle dark mode 
  useEffect(() => {
    const root = document.documentElement;
    if (mode === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [mode]);

  // Handle direction 
  useEffect(() => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
  }, [isRTL, i18n.language]);

  return (
    <CacheProvider value={isRTL ? cacheRtl : cacheLtr}>

      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </CacheProvider>

  );
}