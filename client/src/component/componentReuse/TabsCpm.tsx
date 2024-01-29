import { Tab, Tabs } from "@mui/material";
import React, { useState } from "react";

import { Link, useParams } from "react-router-dom";
import { ITaps } from "../../type";

const TabsCpm = ({ taps }: { taps: ITaps[] }) => {
  const [value, setValue] = useState(0);
  const param = useParams();
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <Tabs
      value={value}
      onChange={handleChange}
      textColor="secondary"
      indicatorColor="secondary"
      aria-label="secondary tabs example"
    >
      {taps?.map((tap) => (
        <Tab
          component={Link}
          key={tap.id}
          value={tap.value}
          label={tap.label}
          to={(tap.to.pathname + `/${param.id ? param.id : ""}`, tap.to.search)}
        />
      ))}
    </Tabs>
  );
};

export default TabsCpm;
