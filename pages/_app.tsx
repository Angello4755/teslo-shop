import { CssBaseline, ThemeProvider } from "@mui/material";
import type { AppProps } from "next/app";
import { AuthProvider } from "src/view/context/auth/AuthProvider";
import { UIProvider } from "src/view/context/ui";
import { lightTheme } from "src/view/themes";
import { SWRConfig } from "swr";
import { CartProvider } from "../src/view/context/cart/CartProvider";
import { SessionProvider } from "next-auth/react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <PayPalScriptProvider
        options={{ "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT || "" }}
      >
        <SWRConfig
          value={{
            fetcher: (resource, init) =>
              fetch(resource, init).then((res) => res.json()),
          }}
        >
          <AuthProvider>
            <CartProvider>
              <UIProvider>
                <ThemeProvider theme={lightTheme}>
                  <CssBaseline />
                  <Component {...pageProps} />
                </ThemeProvider>
              </UIProvider>
            </CartProvider>
          </AuthProvider>
        </SWRConfig>
      </PayPalScriptProvider>
    </SessionProvider>
  );
}
