import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Collapse, Divider, List, ListItem, ListItemText } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { data, Menu } from "./menuData";

type Props = {
  payload: Menu;
};

const CustomizedListItem = ({ payload }: Props) => {
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(!open);
  };

  const navigate = useNavigate();

  return (
    <div>
      <ListItem button key={payload.id} onClick={handleClick}>
        {payload.to ? (
          <ListItemText
            sx={{ width: "100%" }}
            onClick={() => navigate(`${payload.to}`)}
          >
            {payload.label}
          </ListItemText>
        ) : (
          <ListItemText
            sx={{ width: "100%" }}
            onClick={() => navigate(`${payload.rootTo}`)}
          >
            {payload.label}
          </ListItemText>
        )}
        {Array.isArray(payload.child) ? (
          open ? (
            <ExpandLess />
          ) : (
            <ExpandMore />
          )
        ) : null}
        {/* {open ? <ExpandLess /> : <ExpandMore />} */}
      </ListItem>
      <Collapse
        key={`${payload.id}-collapse`}
        in={open}
        timeout="auto"
        unmountOnExit
        sx={{ marginLeft: "5px", backgroundColor: "#e6e6e6" }}
      >
        <List component="li" disablePadding key={`${payload.id}-list`}>
          {Array.isArray(payload.child)
            ? payload.child.map((el: Menu) => {
                return (
                  <ListItem button key={el.id}>
                    {el.to ? (
                      <ListItemText
                        sx={{ width: "100%" }}
                        onClick={() => navigate(`${el.to}`)}
                      >
                        {el.label}
                      </ListItemText>
                    ) : (
                      <ListItemText>{el.label}</ListItemText>
                    )}
                  </ListItem>
                );
              })
            : null}
        </List>
      </Collapse>
      <Divider />
    </div>
  );
};

export default function AppMenu() {
  return (
    <div>
      <List component="nav" aria-labelledby="nested-list-subheader">
        {data.map((el: Menu) => {
          return <CustomizedListItem payload={el} key={`${el.id}=glist`} />;
        })}
      </List>
    </div>
  );
}
