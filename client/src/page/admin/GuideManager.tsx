import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import { CopyRight, TableUser } from "../../component/componentPage";

import { useEffect, useState } from "react";
import { getAllUser } from "../../service";
import { useNavigate } from "react-router-dom";

const GuideManager = () => {
  const [dataUser, setDataUser] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const res = await getAllUser();
      setDataUser(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickNav = (idUser: string) => {
    navigate("/admin/user/" + idUser);
  };
  return (
    <Box component="section">
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12} lg={12}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography
                color="#1976d2"
                fontSize="24px"
                fontWeight="700"
                align="center"
              >
                Thống kê khách hàng
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography
                color="#1976d2"
                fontSize="24px"
                fontWeight="700"
                textAlign="center"
                mb={2}
              >
                Danh sách người dùng
              </Typography>
    
              <TableUser data={dataUser!} onClickNav={handleClickNav} />
            </Paper>
          </Grid>
        </Grid>
        <CopyRight sx={{ pt: 4 }} />
      </Container>
    </Box>
  );
};

export default GuideManager;
