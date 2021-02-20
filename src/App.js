import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import logo from './logo.png';
import NewOS from './NewOS';

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
    width: 200,
    height: 64,
  },
  button: {
    backgroundColor: '#96bd49',
  },
  link: {
    color:'white',
    textDecoration: 'none',
  }
}));

export default function App() {
  const classes = useStyles();

  return (
    <Router>
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <img src={logo} alt='Logo' className={classes.imgLogo} />
          </Typography>
            <div>
              <Button
              variant="contained"
              className={classes.button}
              startIcon={<AddIcon />}
              >
              <Link to="/NewOS" className={classes.link}>Nova OS</Link>
            </Button>
            </div>
        </Toolbar>
      </AppBar>
      <Switch>
          <Route path="/NewOS">
            <NewOS />
          </Route>
        </Switch>
    </div>
    </Router>
  );
}