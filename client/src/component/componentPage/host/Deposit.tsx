import * as React from "react";

import Typography from "@mui/material/Typography";
import Title from "./Title";

export default function Deposits({ label, count }: any) {
  const time = new Date();
  return (
    <React.Fragment>
      <Title>{label}</Title>
      <Typography component="p" variant="h4">
        {count}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        {`Ngày ${time.getDate()}, Tháng ${
          time.getMonth() + 1
        },  ${time.getFullYear()}`}
      </Typography>
    </React.Fragment>
  );
}
