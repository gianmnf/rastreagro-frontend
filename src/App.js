import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography, Button, Menu, MenuItem } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { BrowserRouter as Router, Link } from "react-router-dom";
import logo from "./logo.png";
import './App.css';
import Routes from './Routes';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  imgLogo: {
    width: 80,
    height: 64,
    alignContent: "center",
  },
  button: {
    backgroundColor: "#96bd49",
  },
  link: {
    color: "white",
    textDecoration: "none",
  },
  mainText: {
    display: "block",
    textAlign: "center",
  },
  menuItem: {
    color: "black",
  },
  appBar: {
    backgroundColor: "lightblue",
  }
}));

export default function App() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Router>
      <div className={classes.root}>
        <AppBar position="static" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              <Link to="/" className={classes.link}>
                <img src={logo} alt="Logo" className={classes.imgLogo} />
              </Link>
            </Typography>
            <div>
              <Button
                variant="contained"
                color="secondary"
                className={classes.button}
                startIcon={<MenuIcon />}
                onClick={handleMenu}
              >
                Opções
              </Button>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={open}
                onClose={handleClose}
              >
                <Link to="/ViewOS" className={classes.link}>
                  <MenuItem onClick={handleClose} className={classes.menuItem}>
                    Listar OS's
                  </MenuItem>
                </Link>
                <Link to="/NewOS" className={classes.link}>
                  <MenuItem onClick={handleClose} className={classes.menuItem}>
                    Nova OS
                  </MenuItem>
                </Link>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
        <Routes />
      </div>
    </Router>
  );
}
