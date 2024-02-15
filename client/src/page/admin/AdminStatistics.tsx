import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import { CopyRight } from "../../component/componentPage";
import { useEffect, useState } from "react";
import { getAllHost } from "../../service";
import { TableUser } from "../../component/componentReuse";
import { columnUser } from "../../constain";
import { IProfileUser } from "../../type";
import { useNavigate } from "react-router-dom";
import Deposits from "../../component/componentPage/host/Deposit";

const AdminStatistics = () => {
  const [dataUser, setDataUser] = useState([] as IProfileUser[]);
  const [countHost, setCountHost] = useState();
  const navigate = useNavigate();

  const getUser = async () => {
    try {
      const res = await getAllHost();
      setDataUser(res.data);
      setCountHost(res.data.length);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleClickNav = (idUser: string) => {
    navigate("/admin/host/" + idUser);
  };

  return (
    <Box component="section">
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12} lg={12}>
            <Paper
              sx={{
                p: 2,
                textAlign: "center",
                height: 60,
              }}
            >
              <Typography
                color="#1976d2"
                fontSize="24px"
                fontWeight="700"
                textAlign={"center"}
              >
                Thống kê khách hàng
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={3} md={3} lg={3}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: 200,
              }}
            >
              <Deposits label="Số lượng host" count={countHost} />
            </Paper>
          </Grid>
          <Grid item xs={3} md={3} lg={3}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: 200,
              }}
            >
              {/* <Deposits label="Số lượng user" count={countUser} /> */}
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
              <TableUser
                data={dataUser}
                columns={columnUser}
                onClickNav={handleClickNav}
              />
            </Paper>
          </Grid>
        </Grid>
        <CopyRight sx={{ pt: 4 }} />
      </Container>
    </Box>
  );
};

export default AdminStatistics;
