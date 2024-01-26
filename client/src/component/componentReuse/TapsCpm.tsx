import { Tab, Tabs } from "@mui/material";
import React, { useState } from "react";

import { Link } from "react-router-dom";
import { ITaps } from "../../type";

const TapsCpm = ({ taps }: { taps: ITaps[] }) => {
  const [value, setValue] = useState(0);
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
          key={tap.id}
          value={tap.value}
          label={tap.label}
          to={tap.to}
          component={Link}
        />
      ))}
    </Tabs>
  );
};

export default TapsCpm;
