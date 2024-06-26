import type { AppProps } from 'next/app'
import type { Metadata } from "next";
import "../styles/globals.css";
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas, faCircleXmark, faCircleCheck, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

library.add(fas, faCircleXmark, faCircleCheck, faEye, faEyeSlash);

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Generated by create next app",
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Component {...pageProps} />
  )
}