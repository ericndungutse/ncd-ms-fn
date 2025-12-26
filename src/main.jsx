import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';

export const queryClient = new QueryClient({});

// Ensure only one root is created
const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <Toaster
        position='top-right'
        gutter={12}
        containerClassName='mt-4 mr-4'
        toastOptions={{
          className:
            'rounded-xl border border-slate-200 bg-white text-slate-900 shadow-lg shadow-sky-100/80 backdrop-blur-lg',
          style: {
            padding: '12px 16px',
            fontSize: '14px',
            lineHeight: '20px',
            fontWeight: 500,
          },
          success: { style: { borderColor: '#bae6fd' } },
          error: { style: { borderColor: '#fecdd3' } },
        }}
      />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
);
