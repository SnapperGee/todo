import {
    Avatar,
    Box,
    Button,
    Container,
    CssBaseline,
    Grid,
    TextField,
    Typography,
  } from "@mui/material";
  
  import { useState } from "react";
  import { Link } from "react-router-dom";
  
  export const Login = () => {
    const [username, loginUser] = useState("");
    const [password, usePassword] = useState("");
    const [error, setError] = useState("");
  
    const handleRegister = async () => {
      // Check if username is blank or contains white space characters
      if (!username || /\s/.test(username)) {
        setError("Please enter a username.");
        return;
      }
  
      // Check if password is blank
      if (!password) {
        setError("Please enter a password.");
        return;
      }
  
      // login logic
  
      // If login is successful, you can reset the form and clear errors
      loginUser("");
      usePassword("");
      setError("");
    };
  
    return (
      <>
        <Container maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              mt: 20,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "primary.light" }}></Avatar>
            <Typography variant="h5">Login</Typography>
            <Box sx={{ mt: 3 }}>
              {error && (
                <Typography color="error" variant="body2">
                  {error}
                </Typography>
              )}
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    value={username}
                    onChange={(e) => {
                      loginUser(e.target.value);
                      setError(""); // Clear error when typing in the username field
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => {
                      usePassword(e.target.value);
                      setError(""); // Clear error when typing in the password field
                    }}
                  />
                </Grid>
              </Grid>
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleRegister}
              >
                Log In
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link to="/signup">Need an account? Join Now!</Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </>
    );
  };
  
  export default Login;
