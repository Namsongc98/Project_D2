import { Tab, Tabs } from "@mui/material";
import React, { useState } from "react";
import { tapUserBooking } from "../../constain";
import { Link } from "react-router-dom";

const TapsCpm = () => {
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
      {tapUserBooking.map((tap) => (
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
