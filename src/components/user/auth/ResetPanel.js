import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import UserContext from "../../../contexts/UserContext";

import { sendUserResetLink, resetUser } from "../../../apis/user";
import { initResetCreds, resetTokExp } from "../../../constants";
import { decodeJWT, getCWDLeg } from "../../../utils";

import Reset from "./Reset";
import ModalBuilder from "../../ModalBuilder";

import "./LoginPanel.css";

const ResetPanel = ({ initStage }) => {
  const [stage, setStage] = useState(initStage || 1);
  const [open, setOpen] = useState(false);

  let history = useHistory();

  useEffect(() => {
    if (stage === 2) {
      // Decode Url Token
      console.log(getCWDLeg(window.location.pathname));
      const decodedTok = decodeJWT(getCWDLeg(window.location.pathname));
      console.log("tok", decodedTok);
      if (decodedTok === null) {
        setOpen(true);
      }
    }
  }, [stage]);

  // const User = useContext(UserContext);

  // let history = useHistory();

  const reset = (e, vals, setState) => {
    if (e) e.preventDefault();

    if (stage === 2) {
      // Validate password reset

      if (vals.new_password !== vals.new_password_2) {
        setState({
          error: true,
          isLoading: false,
          success: false,
          msg: "The provided passwords do not match.",
        });
        return;
      }

      // Decode url token

      (async () => {
        const tok = getCWDLeg(window.location.pathname);
        const params = { tok, new_password: vals.new_password };

        setState({ error: false, isLoading: true, success: false });
        try {
          var res = await resetUser(params);
        } catch (err) {
          console.log("ERROR!");
          return;
        }

        if (res && res.status === 200) {
          setState({
            error: false,
            isLoading: false,
            success: true,
            msg:
              "Your password has been successfully reset. You will be redirected to the login screen promptly.",
          });
          setTimeout(() => history.push("/"), 3000);
        }
      })();
      return;
    }

    (async () => {
      const errCallback = (code) => {
        switch (+code) {
          case 401:
            setState({
              error: true,
              isLoading: false,
              success: false,
              msg: "Username or password incorrect.",
            });
            break;
          case 500:
            setState({
              error: true,
              isLoading: false,
              success: false,
              msg: "Something went wrong...",
            });
            break;
          default:
            setState({
              error: true,
              isLoading: false,
              success: false,
              msg: "Error",
            });
        }
      };

      const body = { username_email: vals.username_email };
      setState({ error: false, isLoading: true, success: false });

      try {
        var res = await sendUserResetLink(body);
      } catch (err) {
        errCallback(501);
        return;
      }

      if (res.status === 202) {
        setState({
          error: false,
          isLoading: false,
          success: true,
          msg:
            "An email has been sent to you including a link to reset your password",
        });
      } else {
        errCallback(res ? res.status : 500);
      }
    })();
    return;
  };

  const exitButton = (
    <Link
      key="ok"
      to={{ pathname: "/auth/reset" }}
      className="ui button"
      onClick={() => setOpen(false)}
    >
      Ok
    </Link>
  );

  const modalCfg = {
    title: "Your reset token has expired",
    open,
    handleClose: () => setOpen(false),
    body: `Your reset token has expired. In order to reset your password you must enter your email in again at the password reset page. Remember, expiration tokens last for ${resetTokExp}`,
    actions: [exitButton],
  };

  return (
    <div className="devise">
      <ModalBuilder config={modalCfg} />
      <h1 className="ui centered header">Forgot Password</h1>
      <div className="register-remarks description">
        Made it here by accident?{" "}
        <Link to={{ pathname: "" }} className="heavy">
          Login
        </Link>
      </div>
      <Reset
        handleSubmit={reset}
        redirect="/dashboard"
        init={initResetCreds}
        stage={stage}
      />
    </div>
  );
};

export default ResetPanel;
