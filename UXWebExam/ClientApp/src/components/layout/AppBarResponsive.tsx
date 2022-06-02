import React from "react";
import {
    AppBar,
    Box,
    Toolbar,
    IconButton,
    Typography,
    Container,
    Avatar,
    Button,
    Tooltip,
    Menu,
    MenuItem, Stack, useTheme,
} from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import MenuIcon from "@mui/icons-material/Menu";

import { Link } from "react-router-dom";
// @ts-ignore
import LogoImage from "../../resources/Logo.png";

import { LoginMenu } from "../api-authorization/LoginMenu";

const pages = [
    { name: "Map", link: "/" },
    { name: "Search", link: "/search" },
    { name: "Help", link: "/help" },
    { name: "My Bookings", link: "/bookings" },
];
const settings = ["Profile", "Account", "Logout"];

const ResponsiveAppBar = () => {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
        null
    );
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
        null
    );

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const theme = useTheme();

    return (
        <Box
            sx={{
                position: "relative",
                display: "flex",
                width: "100%",
                m: 5,
            }}
        >
            <AppBar sx={{}}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters sx={{justifyContent:"space-between"}}>
                        <Link to={"/"}
                              style={{
                                  textDecoration: "none",
                                  color: "inherit",
                              }}
                        >
                            <Box sx={{
                                height: 50,
                                alignItems: "center",
                                justifyContent: "center",
                                display: { xs: "none", md: "flex" }
                            }}>
                                <Stack direction="row" spacing={1} sx={{ height: 50,display: "flex",
                                    alignItems: "center" }}>
                                    <Box component="img"
                                        sx={{
                                            height: 40
                                        }}
                                        src={LogoImage}
                                    />
                                    <Typography noWrap variant={"h3"} style={{ marginRight: 8 }}>Swifty</Typography>
                                </Stack>
                            </Box>
                        </Link>

                        <Box
                            sx={{
                                flexGrow: 1,
                                display: { xs: "flex", md: "none" },
                            }}
                        >
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="secondary"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: "bottom",
                                    horizontal: "left",
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "left",
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: "block", md: "none" },
                                }}
                            >
                                {pages.map((page) => (
                                    <Link
                                        to={page.link}
                                        style={{
                                            textDecoration: "none",
                                            color: "inherit",
                                        }}
                                    >
                                        <MenuItem
                                            key={page.name}
                                            onClick={handleCloseNavMenu}
                                            href={page.link}
                                        >
                                            <Typography textAlign="center">
                                                {page.name}
                                            </Typography>
                                        </MenuItem>
                                    </Link>
                                ))}
                                <LoginMenu isMobile={true} />
                            </Menu>
                        </Box>

                        <Box sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            height: 50,
                            flexGrow: 1,
                            display: { xs: "flex", md: "none" }
                        }}>
                            <Link to="/"
                                  style={{
                                      textDecoration: "none",
                                      color: "inherit",
                                  }}
                            >
                                <Stack direction={"row"} spacing={1} sx={{ height: 50, display:"flex", alignItems: "center" }}>
                                    <Box
                                        component="img"
                                        sx={{
                                            height: 40
                                        }}
                                        src={LogoImage}
                                    />
                                    <Typography noWrap variant={"h3"}>Swifty</Typography>
                                </Stack>
                            </Link>
                        </Box>

                        <Box
                            sx={{
                                flexGrow: 1,
                                display: { xs: "none", md: "flex" },
                            }}
                        >
                            {pages.map((page) => (
                                <Link
                                    to={page.link}
                                    style={{ textDecoration: "none" }}
                                >
                                    <Button
                                        key={page.name}
                                        onClick={handleCloseNavMenu}
                                        sx={{
                                            my: 2,
                                            color: "white",
                                            display: "block",
                                        }}
                                    >
                                        {page.name}
                                    </Button>
                                </Link>
                            ))}
                            <LoginMenu isMobile={false} />
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </Box>
    );
};
export default ResponsiveAppBar;
