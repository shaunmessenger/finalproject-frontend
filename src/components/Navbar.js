import React from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
// import AccountCircle from '@material-ui/icons/AccountCircle';
// import Switch from '@material-ui/core/Switch';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { theme } from "../theming/theme";

// const { palette: { primary } } = theme; (example of destructuring, same as line 19)
const primary = theme.palette.primary;

const styles = {
  root: {
    flexGrow: 1
  },
  flex: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  toolbar: {
    background: primary.main
  }
};

class MenuAppBarBasic extends React.Component {
  constructor() {
    super();
    this.state = {
      anchorEl: null,
      userID: ""
    };
    this.hamburger = this.hamburger.bind(this);
  }

  handleChange = (event, checked) => {
    this.setState({ auth: checked });
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  // passing the event as an argument and letting 'path' = each MenuItem's Id
  handleMinimize = () => {
    this.setState({ anchorEl: null });
  };

  handleClose = e => {
    let path = e.target.id;
    this.setState({ anchorEl: null });
    this.props.history.push(path);
    if (path === "/") {
      this.props.logout();
    }
  };

  hamburger() {
    const { classes, userID } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    if (!this.props.userID) {
      return null;
    } else {
      return (
        this.props.userID && (
          <div>
            <IconButton
              aria-owns={open ? "menu-appbar" : null}
              aria-haspopup="true"
              onClick={this.handleMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              transformOrigin={{
                // had to change this to bottom... no idea why
                vertical: "bottom",
                horizontal: "right"
              }}
              open={open}
              onClose={this.handleMinimize}
            >
              <MenuItem id="/getSavingsStatus" onClick={this.handleClose}>
                Homepage
              </MenuItem>
              <MenuItem id="/todaysBudget" onClick={this.handleClose}>
                Weekly Dashboard
              </MenuItem>
              <MenuItem id="/setUpFixed" onClick={this.handleClose}>
                Reset Fixed Costs
              </MenuItem>
              <MenuItem id="/setupGoal" onClick={this.handleClose}>
                {" "}
                Reset Goals{" "}
              </MenuItem>
              <MenuItem id="/" onClick={this.handleClose}>
                Logout
              </MenuItem>
            </Menu>
          </div>
        )
      );
    }
  }

  render() {
    const { classes, userID } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar style={styles.toolbar}>
            <Typography
              variant="title"
              color={primary.main}
              className={classes.flex}
            >
              #GOALS
            </Typography>
            {this.hamburger()}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

MenuAppBarBasic.propTypes = {
  classes: PropTypes.object.isRequired
};
let MenuAppBar = withRouter(MenuAppBarBasic);
export default withStyles(styles)(MenuAppBar);
