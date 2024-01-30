import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const pages = localStorage.getItem("token") ? ["Tasks"] : ["Login", "Signup"];

const logoutClickHandler = () => {
  localStorage.removeItem("token");
  window.location.href = "/";
};

export const HeaderNav = () =>
{
  return (
    <AppBar position="static" sx={{ backgroundColor: "black" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            TODO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                sx={{ my: 2, color: "white", display: "block" }}
                component={Link}
                to={`/${page !== "Login" ? page.toLowerCase() : ""}`}
              >
                {page}
              </Button>
            ))}
            <Button
                sx={{ my: 2, color: "white", display: `${localStorage.getItem("token") ? "block" : "none"}` }}
                onClick={logoutClickHandler}
              >
                Logout
              </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default HeaderNav;
