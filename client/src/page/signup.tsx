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

export const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [usernameErrorMsg, setUsernameErrorMsg] = useState("");
  const [passwordErrorMsg, setPasswordErrorMsg] = useState("");

  const signupBtnClickHandler = async () => {
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

    // Registration logic

    // If registration is successful, you can reset the form and clear errors
    setUsername("");
    setPassword("");
    setUsernameErrorMsg("");
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
          <Typography variant="h5">Sign Up</Typography>
          <Box sx={{ mt: 3 }}>
              <Typography color="error" variant="body2" sx={usernameErrorMsg ? {} : {display: "none"}}>
                {usernameErrorMsg}
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
                    setUsernameErrorMsg(""); // Clear error when typing in the username field
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography color="error" variant="body2" sx={passwordErrorMsg ? {} : {display: "none"}}>
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
                    setPasswordErrorMsg(""); // Clear error when typing in the password field
                  }}
                />
                <Typography color="error" variant="body2" sx={passwordConfirm.length !== 0 && passwordConfirm !== password ? {} : {display: "none"}}>
                  Passwords do not match
                </Typography>
                <TextField
                  required
                  fullWidth
                  sx={{mt: 1}}
                  name="passwordConfirm"
                  label="Confirm Password"
                  type="password"
                  id="passwordConfirm"
                  value={passwordConfirm}
                  onChange={(e) => {
                    setPasswordConfirm(e.currentTarget.value);
                  }}
                />
              </Grid>
            </Grid>
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={signupBtnClickHandler}
            >
              Register
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/">Already have an account? Login</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Signup;
