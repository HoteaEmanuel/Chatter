import {
  Container,
  createTheme,
  CssBaseline,
  Grid,
  ThemeProvider,
} from "@mui/material";
import { RouterProvider } from "react-router";

import router from "./components/Routes";
import client from "./constants/apollo-client";
import { ApolloProvider } from "@apollo/client/react";
import Guard from "./components/auth/Guard";
import Header from "./components/header/Header";
import Snackbar from "./components/snackbar/Snackbar";
import { ChatList } from "./components/chat-list/ChatList";
import { usePath } from "./hooks/usePath";
const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});
const App = () => {
  const { path } = usePath();

  const showChatList = path === "/" || path.includes("chats");
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Header />
        <Guard>
          {showChatList ? (
            <Grid container>
              <Grid size={{ md: 3 }} sx={{ minWidth: 0, overflow: "hidden" }}>
                <ChatList />
              </Grid>

              <Grid size={{ md: 9 }}>
                <Routes />
              </Grid>
            </Grid>
          ) : (
            <Routes />
          )}
        </Guard>

        <Snackbar />
      </ThemeProvider>
    </ApolloProvider>
  );
};

const Routes = () => {
  return (
    <Container sx={{height:'90vh'}}>
      <RouterProvider router={router}></RouterProvider>
    </Container>
  );
};

export default App;
