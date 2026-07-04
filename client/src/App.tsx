import {
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider,
} from "@mui/material";
import Router from "./components/Routes";
import { RouterProvider } from "react-router";

import router from "./components/Routes";
import client from "./constants/apollo-client";
import { ApolloProvider } from "@apollo/client/react";
const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});
const App = () => {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Container>
          <RouterProvider router={router}></RouterProvider>
        </Container>
      </ThemeProvider>
    </ApolloProvider>
  );
};

export default App;
