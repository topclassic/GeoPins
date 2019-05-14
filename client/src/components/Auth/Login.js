import React, { useContext } from "react";
import { GraphQLClient } from "graphql-request";
import { GoogleLogin } from "react-google-login";
import { withStyles } from "@material-ui/core/styles";
import Context from "../../Context";
import { me_query } from "../../graphql/queries";
// import Typography from "@material-ui/core/Typography";

const Login = ({ classes }) => {
  const { dispatch } = useContext(Context);
  const onFailure = err => {
    console.log("Error Login", err);
  };
  const onSuccess = async respGoogle => {
    try {
      const { tokenId } = respGoogle;
      const client = new GraphQLClient("http://localhost:4000/graphql", {
        headers: { authorization: tokenId }
      });
      const { me } = await client.request(me_query);
      dispatch({ type: "LOGIN_USER", payload: me });
      dispatch({ type: "IS_LOGGED_IN", payload: true });
      console.log("me", respGoogle);
    } catch (error) {
      onFailure(error);
    }
  };

  return (
    <div className={classes.root}>
      <GoogleLogin
        clientId="524330551506-0c4ul6ur82krqeq4rmmfqn8spp4glfvq.apps.googleusercontent.com"
        onSuccess={onSuccess}
        onFailure={onFailure}
        isSignedIn
      />
    </div>
  );
};

const styles = {
  root: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center"
  }
};

export default withStyles(styles)(Login);
