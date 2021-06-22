import { signIn, signOut, useSession } from "next-auth/client";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  signedInStatus: {
    display: "block",
    minHeight: "4rem",
    width: "100%",
  },
  loading: {
    position: "relative",
    top: "-2rem",
    opacity: "0",
    overflow: "hidden",
    borderRadius: "0 0 .6rem .6rem",
    padding: ".6rem 1rem",
    margin: "0",
    backgroundColor: "rgba(0,0,0,.05)",
    transition: "all 0.2s ease-in",
  },
  loaded: {
    position: "relative",
    top: "0",
    opacity: "1",
    overflow: "hidden",
    borderRadius: "0 0 .6rem .6rem",
    padding: ".6rem 1rem",
    margin: "0",
    backgroundColor: "rgba(0,0,0,.05)",
    transition: "all 0.2s ease-in",
  },
  signedInText: {
    position: "absolute",
    paddingTop: "0rem",
    left: "4.6rem",
    right: "6.5rem",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    overflow: "hidden",
    display: "inherit",
    zIndex: 1,
    lineHeight: "1.3rem",
  },
  notSignedInText: {
    position: "absolute",
    paddingTop: ".8rem",
    left: "1rem",
    right: "6.5rem",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    overflow: "hidden",
    display: "inherit",
    zIndex: 1,
    lineHeight: "1.3rem",
  },
  avatar: {
    borderRadius: "2rem",
    float: "left",
    height: "2.8rem",
    width: "2.8rem",
    backgroundColor: "white",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  },
  button: {
    float: "right",
    marginRight: "-.4rem",
    fontWeight: 500,
    borderRadius: ".3rem",
    cursor: "pointer",
    fontSize: "1rem",
    lineHeight: "1.4rem",
    padding: ".7rem .8rem",
    position: "relative",
    zIndex: 10,
    backgroundColor: "transparent",
    color: "#555",
  },
  buttonPrimary: {
    float: "right",
    marginRight: "-.4rem",
    fontWeight: 500,
    borderRadius: ".3rem",
    cursor: "pointer",
    fontSize: "1rem",
    lineHeight: "1.4rem",
    padding: ".7rem 1.4rem",
    position: "relative",
    zIndex: 10,
    backgroundColor: "#346df1",
    borderColor: "#346df1",
    color: "#fff",
    textDecoration: "none",
  },
}));

export default function Sign() {
  const classes = useStyles();
  const [session, loading] = useSession();

  return (
    <header>
      <div className={classes.signedInStatus}>
        <p
          className={`nojs-show ${
            !session && loading ? classes.loading : classes.loaded
          }`}
        >
          {!session && (
            <>
              <span className={classes.notSignedInText}>
                You are not signed in
              </span>
              <a
                href={`/api/auth/signin`}
                className={classes.buttonPrimary}
                onClick={(e) => {
                  e.preventDefault();
                  signIn();
                }}
              >
                Sign in
              </a>
            </>
          )}
          {session && (
            <>
              {session.user.image && (
                <span
                  style={{ backgroundImage: `url(${session.user.image})` }}
                  className={classes.avatar}
                />
              )}
              <span className={classes.signedInText}>
                <small>Signed in as</small>
                <br />
                <strong>{session.user.email || session.user.name}</strong>
              </span>
              <a
                href={`/api/auth/signout`}
                className={classes.button}
                onClick={(e) => {
                  e.preventDefault();
                  signOut();
                }}
              >
                Sign out
              </a>
            </>
          )}
        </p>
      </div>
    </header>
  );
}
