/* eslint-disable react-hooks/exhaustive-deps */
import { Divider, List, ListItem, Paper, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "hooks/store";
import React from "react";
import { selectFeatureTypesData } from "store/selectors";
import { fetchFeaturesTypes } from "store/thunks/featureTypesThunk";
import { IComponent } from "store/types/IComponent";

type Props = {
  row?: IComponent;
  title?: string;
};

interface infoList {
  id: string;
  value: string;
}

export const ComponentInfoBlock = ({ row, title = "Подробно" }: Props) => {
  const { featureTypes } = useAppSelector(selectFeatureTypesData);
  const dispatch = useAppDispatch();

  let infoList: infoList[] = [];

  if (row) {
    infoList = row?.featureSet.feature.map((el) => el);
  }

  React.useEffect(() => {
    dispatch(fetchFeaturesTypes);
  }, []);

  const findFeatureNameById = (id: string) => {
    const res = featureTypes.find((el) => el.id === id);
    return res?.feature;
  };

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
          {infoList
            ? infoList.map((el: infoList, idx: number) => (
                <ListItem key={idx} sx={{ justifyContent: "space-between" }}>
                  <Typography
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {findFeatureNameById(el.id)}
                    {/* {el.id} */}
                    .....................................................................................
                  </Typography>
                  {/* TODO сравнивать по регулярному выражению */}
                  <Typography style={{ flexShrink: 0 }}>{el.value}</Typography>
                </ListItem>
              ))
            : null}
        </List>
      </Paper>
    </>
  );
};
