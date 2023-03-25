import * as React from "react";
import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { Link } from "react-router-dom";

import ThemeSettings from "./ThemeSettings";
import { useLoginContext } from "../contexts/login-status";
import { useModeContext } from "../contexts/mode-status";
import { useStateContext } from "../contexts/ContextProvider";
import styles from "../style";
import {fontSize} from "@mui/system";

const pages = ["dashboard", "tracker"];

function NavBar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const { loggedIn, setLoggedIn, avatar, setAvatar } = useLoginContext();
  const { mode, setMode } = useModeContext();
  const { themeSettings, setThemeSettings, currentColor } = useStateContext();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogin = () => {
    setLoggedIn(true);
    localStorage.setItem("login", true);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.setItem("login", false);
  };

  const handleModeChange = (event, newMode) => {
    setMode(newMode);
    localStorage.setItem("trackerMode", newMode);
  };

  return (
    <>
      {themeSettings && <ThemeSettings />}
      <AppBar position="static" style={{ background: currentColor}}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
            margin: '0 40px' 
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <AdbIcon sx={{  mr: 1 }} />
            <Link className="text-xl" to="/">NutritionShip</Link>

            <Button
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "white", display: "block", ml: 5 }}
            >
              {<Link to={`/tracker`}>Tracker</Link>}
            </Button>
            <Button
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              {<Link to={`/dashboard`}>Dashboard</Link>}
            </Button>
          </Box>

          <ToggleButtonGroup
            
            value={mode}
            exclusive
            onChange={handleModeChange}
            aria-label="Platform"
            size="medium"
            fullWidth
            sx={{backgroundColor: 'white', width: '500px', mr: '100px'}}
          >
            <ToggleButton value="intuitive">Intuitive</ToggleButton>
            <ToggleButton value="standard">Standard</ToggleButton>
            <ToggleButton value="precise">Precise</ToggleButton>
          </ToggleButtonGroup>

          <Box>
            {!loggedIn && (
              <Link to="/tracker" onClick={handleLogin}>
                Log In
              </Link>
            )}
            {loggedIn && (
              <>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="Remy Sharp" src={avatar} />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Button onClick={() => setThemeSettings(true)}>
                      <Typography textAlign="center">Settings</Typography>
                    </Button>
                  </MenuItem>
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Link
                      to="/"
                      onClick={() => {
                        handleLogout();
                        handleCloseUserMenu();
                      }}
                    >
                      <Typography textAlign="center">Logout</Typography>
                    </Link>
                  </MenuItem>
                </Menu>
              </>
            )}
          </Box>
        </Box>
      </AppBar>
    </>
  );
}
export default NavBar;
