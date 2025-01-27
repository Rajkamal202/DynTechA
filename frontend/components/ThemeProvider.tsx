// File: components/ThemeProvider.tsx
import { ThemeProvider as NextThemesProvider } from "next-themes";

interface ThemeProviderProps {
  children: React.ReactNode;
  attribute: string;
  defaultTheme: string;
  enableSystem?: boolean;
  forcedTheme?: string;
}

export const ThemeProvider = ({
  children,
  attribute,
  defaultTheme,
  enableSystem = true,
  forcedTheme,
}: ThemeProviderProps) => {
  return (
    <NextThemesProvider
      attribute={attribute}
      defaultTheme={defaultTheme}
      enableSystem={enableSystem}
      forcedTheme={forcedTheme}
    >
      {children}
    </NextThemesProvider>
  );
};
