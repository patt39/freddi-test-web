import "@/styles/globals.css";
import type { AppProps } from "next/app";
import "toastify-js/src/toastify.css";

import { ThemeProvider } from "@/components/util/theme-provider";
import {
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { ClientOnly } from "@/components/util/client-only";
// const queryClient = new QueryClient({
//   defaultOptions: { queries: { staleTime: 60_000, gcTime: 10 * (60 * 1000) } },
// });
const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ClientOnly fallback={"Loding..."}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <HydrationBoundary state={pageProps.dehydratedState}>
            <Component {...pageProps} />

            {Boolean(process.env.NEXT_PUBLIC_QUERY_DEV_TOOLS) && (
              <ReactQueryDevtools
                buttonPosition="bottom-right"
                initialIsOpen={false}
              />
            )}
          </HydrationBoundary>
        </ThemeProvider>
      </ClientOnly>
    </QueryClientProvider>
  );
}
