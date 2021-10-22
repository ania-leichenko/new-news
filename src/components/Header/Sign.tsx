import { signIn, signOut, useSession } from "next-auth/client";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
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
    fontWeight: 500,
    lineHeight: "1.4rem",
    padding: ".7rem .8rem",
    textDecoration: "none",
  },
  buttonPrimary: {
    float: "right",
    fontWeight: 500,
    borderRadius: ".3rem",
    lineHeight: "1.4rem",
    padding: ".7rem 1.4rem",
    backgroundColor: "#346df1",
    color: "#fff",
    textDecoration: "none",
  },
}));

export default function Sign() {
  const classes = useStyles();
  const [session] = useSession();

  return (
    <header>
      <div>
          {!session && (
            <>
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
      </div>
    </header>
  );
}