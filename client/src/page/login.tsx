import { LOGIN } from "../graphql/mutations";
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
  import { useMutation } from "@apollo/client";

  export const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [usernameErrorMsg, setUsernameErrorMsg] = useState("");
    const [passwordErrorMsg, setPasswordErrorMsg] = useState("");
    const [usernamePasswordErrorMsg, setUsernamePasswordErrorMsg] = useState("");

    const [ login ] = useMutation(LOGIN);

    const loginBtnClickHandler = async () => {
      // Check if username is blank or contains white space characters
      if (!username) {
        setUsernameErrorMsg("Please enter a username.");
        return;
      }
      else if (/\s/.test(username)) {
        setUsernameErrorMsg("Username cannot contain whitespace.");
        return;
      }

      // Check if password is blank
      if (!password) {
        setPasswordErrorMsg("Please enter a password.");
        return;
      }

      // login logic
      try
      {
        const { data } = await login({
          variables: {username, password}
        });

        localStorage.setItem("token", data.login.token);
        window.location.href = "/tasks";
        return;
      }
      catch (error)
      {
        console.error(error);
      }

      setUsernamePasswordErrorMsg("Invalid username and password combination.");
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
              <Typography color="error" variant="body2" sx={usernameErrorMsg || usernamePasswordErrorMsg ? {mb: 1} : {display: "none"}}>
                {usernameErrorMsg ? usernameErrorMsg : usernamePasswordErrorMsg}
              </Typography>
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
                      setUsername(e.currentTarget.value);
                      setUsernamePasswordErrorMsg(""); // Clear error when typing in the password field
                      setUsernameErrorMsg(""); // Clear error when typing in the username field
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography color="error" variant="body2" sx={passwordErrorMsg ? {mb: 1} : {display: "none"}}>
                    {passwordErrorMsg}
                  </Typography>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.currentTarget.value);
                      setUsernamePasswordErrorMsg(""); // Clear error when typing in the password field
                      setPasswordErrorMsg(""); // Clear error when typing in the password field
                    }}
                  />
                </Grid>
              </Grid>
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={loginBtnClickHandler}
                disabled={    username.length === 0 || password.length === 0
                           || usernameErrorMsg.length !== 0 || passwordErrorMsg.length !== 0
                           || usernamePasswordErrorMsg.length !== 0 }
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
