import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { LoginUserProvider } from "@/contexts/LoginUserContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <LoginUserProvider>
      <Component {...pageProps} />;
    </LoginUserProvider>
  )
}
