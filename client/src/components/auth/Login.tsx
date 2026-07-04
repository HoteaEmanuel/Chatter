import React, { useState } from "react";
import {
  Stack,
  Typography,
  TextField,
  Button,
  Link as MUILink,
} from "@mui/material";
import { error } from "console";
import { Link } from "react-router-dom";
import { useCreateUser } from "../../hooks/useCreateUser";

const Login = () => {
  const [createUser] = useCreateUser();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const handleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      await createUser({
        variables: {
          createUserInput: {
            email,
            name,
            password,
          },
        },
      });
    } catch (error) {
      setError("Failed to signup");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Stack
      spacing={4}
      direction={"column"}
      sx={{
        height: "100vh",
        maxWidth: {
          xs: "70%",
          md: "50%",
        },
        margin: "0 auto",
        justifyContent: "center",
      }}
    >
      <Typography
        variant="h3"
        sx={{
          textAlign: "center",
        }}
      >
        Login
      </Typography>
      {error && <Typography sx={{ color: "red" }}>{error}</Typography>}
      <TextField
        type="text"
        label="Name"
        variant="outlined"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <TextField
        type="email"
        label="Email"
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        type="password"
        label="Password"
        variant="outlined"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button variant="contained" onClick={handleLogin} disabled={loading}>
        {!loading ? "Log in" : "Logging in..."}
      </Button>

      <Link to={"/signup"}>
        <MUILink
          sx={{
            alignSelf: "center",
          }}
        >
          Don&apos;t have an account? - Signup
        </MUILink>
      </Link>
    </Stack>
  );
};

export default Login;
