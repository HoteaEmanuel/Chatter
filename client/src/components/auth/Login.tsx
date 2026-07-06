import React, { useEffect, useState } from "react";
import {
  Stack,
  Typography,
  TextField,
  Button,
  Link as MUILink,
} from "@mui/material";
import useLogin from "../../hooks/useLogin";
import { Link, useNavigate } from "react-router-dom";
import { useGetMe } from "../../hooks/useGetMe";

const Login = () => {
  const { error, login } = useLogin();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { data } = useGetMe();
  const navigate = useNavigate();
  useEffect(() => {
    if (data) navigate("/");
  }, [data, navigate]);

  const handleLogin = async () => {
    setLoading(true);
    try {
      await login({ email, password });
    } catch (error) {
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
        maxWidth: 360,

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
        type="email"
        label="Email"
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={!!error}
        helperText={error}
      />
      <TextField
        type="password"
        label="Password"
        variant="outlined"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={!!error}
        helperText={error}
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
