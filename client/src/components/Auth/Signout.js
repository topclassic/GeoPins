import React, { useContext } from "react";
import { withStyles } from "@material-ui/core/styles";
import { GoogleLogout } from "react-google-login";
import ExitToApp from "@material-ui/icons/ExitToApp";
import Typography from "@material-ui/core/Typography";
import Context from "../../Context";

const Signout = ({ classes }) => {
  const { dispatch } = useContext(Context);
  const onSingOut = () => {
    dispatch({ type: "SIGNOUT_USER" });
    console.log("SIGNOUT_USER");
  };
  return (
    <GoogleLogout
      onLogoutSuccess={onSingOut}
      buttonText="Signout"
      render={({ onClick }) => (
        <span className={classes.root} onClick={onClick}>
          <Typography>Sing Out</Typography>
          <ExitToApp className={classes.buttonIcon} />
        </span>
      )}
    />
  );
};

const styles = {
  root: {
    cursor: "pointer",
    display: "flex"
  },
  buttonText: {
    color: "orange"
  },
  buttonIcon: {
    marginLeft: "5px",
    color: "orange"
  }
};

export default withStyles(styles)(Signout);
