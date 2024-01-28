import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Link from '@mui/material/Link';
import { Box, Container, Grid, Typography } from "@mui/material";

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export const Footer = () =>
{
    return (
        <ThemeProvider theme={defaultTheme}>
 <CssBaseline />
        <Box
          component="footer"
          sx={{
            py: 3,
            px: 2,
            mt: 'auto',
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[200]
                : theme.palette.grey[800],
                position: 'fixed',
                bottom: 0,
                width: '100%',
          }}
        >
          <Container maxWidth="sm">
            <Typography variant="body1">
            <Grid item xs={12}>
            <Typography color="textSecondary" variant="subtitle1">
              {`${new Date().getFullYear()} | React | Material UI | React Router`}
            </Typography>
          </Grid>
            </Typography>
          </Container>
        </Box>
    </ThemeProvider>
    );
};

  export default Footer;