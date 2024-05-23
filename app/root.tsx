import { NextUIProvider } from '@nextui-org/react';
import stylesheet from './tailwind.css';
import type { LinksFunction } from '@remix-run/node';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: stylesheet },
];

export default function App() {
  return (
    <html lang='en' style={{ backgroundColor: 'unset' }}>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <Meta />
        <Links />
      </head>
      <body>
        <NextUIProvider>
          <NextThemesProvider attribute='class' defaultTheme='dark'>
            <Outlet />
            <ScrollRestoration />
            <Scripts />
            <LiveReload />
          </NextThemesProvider>
        </NextUIProvider>
      </body>
    </html>
  );
}
