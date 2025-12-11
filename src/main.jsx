import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import App from './App.jsx';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <Toaster
        position='top-right'
        gutter={12}
        containerClassName='mt-4 mr-4'
        toastOptions={{
          className: 'rounded-xl border border-slate-700 bg-slate-900 text-slate-100 shadow-2xl shadow-black/40',
          style: {
            padding: '12px 14px',
            fontSize: '14px',
            lineHeight: '20px',
            fontWeight: 500,
          },
          success: {
            iconTheme: {
              primary: '#14b8a6',
              secondary: '#0f172a',
            },
            style: {
              borderColor: '#14b8a6',
            },
          },
          error: {
            iconTheme: {
              primary: '#f43f5e',
              secondary: '#0f172a',
            },
            style: {
              borderColor: '#f43f5e',
            },
          },
        }}
      />
      <App />
    </QueryClientProvider>
  </StrictMode>
);
