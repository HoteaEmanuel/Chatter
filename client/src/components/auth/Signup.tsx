import React, { useState } from "react";
import { useCreateUser } from "../../hooks/useCreateUser";
import Stack from "@mui/material/Stack";
import { Typography, TextField, Button, Link as MUILink } from "@mui/material";
import { Link } from "react-router-dom";

const Signup = () => {
  const [createUser] = useCreateUser();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    if (
      name.trim.length < 3 ||
      email.trim.length < 3 ||
      password.trim.length < 8
    ) {
      setError(
        "Invalid data - Name needs at least 3 characters - Password needs at least 8, uppercase and lowercase and at least a special character",
      );
    }
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
        Signup
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
      <Button variant="contained" onClick={handleSubmit} disabled={loading}>
        {!loading ? "Sign up" : "Signing in..."}
      </Button>

      <Link to={"/login"}>
        <MUILink
          sx={{
            alignSelf: "center",
          }}
        >
          Already got an account? - Login
        </MUILink>
      </Link>
    </Stack>
  );
};

export default Signup;
