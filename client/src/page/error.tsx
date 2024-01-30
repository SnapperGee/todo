import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function Error() {
    const logoutClickHandler = () => {
        localStorage.removeItem("token");
        window.location.href = "/";
    };
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                minHeight: "100vh"
            }}
        >
            <Typography variant="h1">
                404
            </Typography>
            <Typography variant="h5" mb={2}>
                The page you&#39;re looking for doesn&#39;t exist.
            </Typography>
            <Typography variant="h6">
                Use the below buttons to navigate to a page.
            </Typography>
            {
                localStorage.getItem("token")
                ? <div style={{display: "flex", justifyContent: "space-around", width: 400}}>
                    <Button variant="contained" component={Link} to="/tasks">Tasks</Button>
                    <Button variant="contained" onClick={logoutClickHandler}>
                        Logout
                    </Button>
                    </div>
                : <div style={{display: "flex", justifyContent: "space-around", width: 400}}>
                    <Button variant="contained" component={Link} to="/">Login</Button>
                    <Button variant="contained" component={Link} to="/signup">Signup</Button>
                  </div>
            }
        </Box>
    );
}
