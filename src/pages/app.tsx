import { createContext, useMemo, useState } from "react";
import { useAdaptiveLayout } from "@/hooks/useAdaptiveFontSize/useAdaptiveFontSize";
import { createTheme, StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import { HelmetProvider } from "react-helmet-async";
import { useRoutes } from "react-router-dom";
import routes from "../routes";
const ColorModeContext = createContext({ toggleColorMode: () => {} });

const App = () => {
  const [mode, setMode] = useState<"light" | "dark">("light");
  const routing = useRoutes(routes)
  useAdaptiveLayout();
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );
  return (
    <>
      <StyledEngineProvider injectFirst>
        <ColorModeContext.Provider value={colorMode}>
          <ThemeProvider theme={theme}>
            <HelmetProvider>{routing} </HelmetProvider>
          </ThemeProvider>
        </ColorModeContext.Provider>
      </StyledEngineProvider>
    </>
  );
};
App.whyDidYouRender = true;
export default App;
