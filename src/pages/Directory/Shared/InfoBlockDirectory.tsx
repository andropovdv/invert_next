import { Divider, List, ListItem, Paper, Typography } from "@mui/material";
import React from "react";

interface Props {
  row?: any;
  title?: string;
  mapTitle: Map<string, string>;
}

type infoList = {
  titleInfo: any;
  desc: any;
};

export const InfoBlockDirectory = ({
  row,
  title = "Подробно",
  mapTitle,
}: Props) => {
  let infoList: infoList[] = [];
  if (row) {
    for (let [key, value] of Object.entries<any>(row)) {
      if (key !== "id") {
        if (key === "url") {
          let web = value.trim();
          if (web.includes("http://")) {
            const item: infoList = {
              titleInfo: mapTitle.get(key),
              desc: web.slice(7),
            };
            infoList.push(item);
            continue;
          }
        }
        const item: infoList = { titleInfo: mapTitle.get(key), desc: value };
        infoList.push(item);
      }
    }
  }

  return (
    <>
      <Paper elevation={7} sx={{ height: "100%" }}>
        <Typography
          variant="h5"
          color="gray"
          sx={{ marginBottom: "8px", padding: "8px" }}
        >
          {title}
        </Typography>
        <Divider light />
        <List dense>
          {infoList.length !== 0
            ? infoList.map((el: infoList) => (
                <ListItem
                  key={el.titleInfo}
                  sx={{ justifyContent: "space-between" }}
                >
                  <Typography
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {el.titleInfo}
                    .....................................................................................
                  </Typography>
                  {/* TODO сравнивать по регулярному выражению */}
                  {el.desc.includes("www.") ? (
                    <Typography style={{ flexShrink: 0 }}>
                      <a
                        target="_blank"
                        rel="noreferrer"
                        href={`http://${el.desc}`}
                      >
                        {el.desc}
                      </a>
                    </Typography>
                  ) : (
                    <Typography style={{ flexShrink: 0 }}>{el.desc}</Typography>
                  )}
                </ListItem>
              ))
            : null}
        </List>
      </Paper>
    </>
  );
};
