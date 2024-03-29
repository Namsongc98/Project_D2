import {
  AlertColor,
  Box,
  Container,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Deposit } from "../../component/componentPage";
import { getBookingHostId } from "../../service";
import { useGetUser } from "../../hook";
import { useNavigate } from "react-router-dom";
import { IProfileUser } from "../../type";
import { SnackBarReuse, TableUser } from "../../component/componentReuse";
import { columnUser } from "../../constain";

const DepositBooking = () => {
  const navigate = useNavigate();
  const host = useGetUser();
  const [dataUser, setDataUser] = useState([] as IProfileUser[]);
  const [countBooking, setCountBooking] = useState<number>(0);
  const [type, setType] = useState<AlertColor | undefined>();
  const [err, setErr] = useState("");
  useEffect(() => {
    getBooking();
  }, [host]);
  const getBooking = async () => {
    try {
      if (host) {
        const res: IProfileUser[] = await getBookingHostId(host.id);
        setDataUser(res);
        setCountBooking(res.length);
      }
    } catch (error) {
      setType("error");
      setErr("Không lấy được dữ liệu");
    }
  };
  const handleClickNav = (idUser: string) => {
    navigate("/host/user/" + idUser);
  };
  return (
    <Box component="section">
      <SnackBarReuse type={type} message={err!} setError={setErr} />
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
                textAlign={"center"}
              >
                Thống kê khách hàng
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={4} md={4} lg={4}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Deposit label="Số lượng booking" count={countBooking} />
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
              <TableUser
                data={dataUser!}
                onClickNav={handleClickNav}
                columns={columnUser}
              />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default DepositBooking;
