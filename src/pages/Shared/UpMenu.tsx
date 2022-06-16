import { Button, Toolbar, Typography, AppBar } from "@mui/material";
import { useAppDispatch } from "hooks/store";
import { useAuth } from "hooks/useAuth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "store/thunks/authThunk";
import { Login } from "./Login";

interface Props {
  // isAuth: boolean;
  // name: string | null | undefined;
}

export const UpMenu = (props: Props) => {
  // const { isAuth, name } = props;

  const [open, setOpen] = useState(false);

  const { isAuth, name } = useAuth();

  const dispatch = useAppDispatch();

  const handleLogin = () => {
    setOpen((prev) => !prev);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const navigate = useNavigate();

  const goHome = () => {
    navigate("/");
  };

  return (
    <>
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, cursor: "pointer" }}
            onClick={goHome}
          >
            Inventor
          </Typography>
          {isAuth ? <Typography variant="body1">{name}</Typography> : null}
          <Button color="inherit" onClick={isAuth ? handleLogout : handleLogin}>
            {isAuth ? "Logout" : "Login"}
          </Button>
        </Toolbar>
      </AppBar>
      <Login open={open} setOpen={setOpen} />
    </>
  );
};
