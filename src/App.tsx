/* eslint-disable react-hooks/exhaustive-deps */

import { Drawer, Toolbar } from "@mui/material";
import { AuthRoute } from "components/AuthRoute";
import { useAppDispatch } from "hooks/store";
import { useAuth } from "hooks/useAuth";
import AppMenu from "pages/Shared/AppMenu/AppMenu";
import LoaderScreen from "pages/Shared/LoaderScreen";
import { UpMenu } from "pages/Shared/UpMenu";
import { FC, useEffect } from "react";
import { checkUser } from "store/thunks/authThunk";

const drawerWidth = 240;

const App: FC = () => {
  const dispatch = useAppDispatch();
  const { isLoading } = useAuth();

  useEffect(() => {
    dispatch(checkUser());
  }, []);

  console.log("isLoading: ", isLoading);

  return (
    <>
      {isLoading ? (
        <LoaderScreen />
      ) : (
        <>
          <UpMenu />
          <Toolbar />
          <div
            style={{
              marginLeft: drawerWidth + 8,
              marginTop: "8px",
              marginRight: "8px",
              marginBottom: "8px",
            }}
          >
            <AuthRoute />
          </div>
          <Drawer
            variant="permanent"
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              [`& .MuiDrawer-paper`]: {
                width: drawerWidth,
                boxSizing: "border-box",
              },
            }}
          >
            <Toolbar />
            <AppMenu />
          </Drawer>
        </>
      )}
    </>
  );
};

export default App;
