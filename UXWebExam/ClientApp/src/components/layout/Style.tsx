import React from "react";
import {
    createTheme,
    ThemeOptions,
    ThemeProvider as MUIThemeProvider,
} from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";

const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const themeOptions: ThemeOptions = {
        palette: {
            primary: {
                main: "#2278d5",
            },
            secondary: {
                main: "#fbed00",
                dark: "#c7bc00",
            },
        },
        typography: {
            h1: {
                fontSize: 48,
            },
            h2: {
                fontSize: 40,
            },
            h3: {
                fontSize: 32,
            },
            h4: {
                fontSize: 24,
            },
            h5: {
                fontSize: 20,
            },
            h6: {
                fontSize: 14,
            },
        },
    };

    const theme = createTheme(themeOptions);

    return (
        <EmotionThemeProvider theme={theme}>
            <MUIThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </MUIThemeProvider>
        </EmotionThemeProvider>
    );
};

export default ThemeProvider;
