import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getRoomCity } from "../../service";
import { Approve, typeGetRoom } from "../../type";

const ListStay = () => {
  const [dataRoom, setDataRoom] = useState<typeGetRoom[] | undefined>();
  const params = useParams();

  const getDataRoomCity = async () => {
    try {
      const res = await getRoomCity(params.id!, Approve.success);
      setDataRoom(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getDataRoomCity();
  }, []);

  return (
    <Box
      component="main"
      sx={{ backgroundColor: "#f5f5f5", width: "100%", minHeight: "70vh" }}
    >
      <Box sx={{ maxWidth: 1000, my: 0, mx: "auto" }}>
        <Stack sx={{ my: 5 }}>
          <Typography
            variant="h4"
            component="h2"
            sx={{ mb: 2, fontWeight: "700", opacity: 0.7 }}
          >
            Danh sách phòng thành phố {params?.id}
          </Typography>
          <Typography sx={{ width: "70%", lineHeight: 2 }}>
            Asahi kết hợp với các nhà cung cấp uy tín, mang lại cho các bạn
            những trải nghiệm tuyệt vời nhất trong chuyến hành trình của minh.
            Chúng tôi sẽ luôn đồng hành cùng các bạn để liên tục cập nhật những
            sản phẩm mới nhất.
          </Typography>
        </Stack>
        <Stack
          direction="row"
          spacing={2}
          useFlexGap
          flexWrap="wrap"
          sx={{ mb: 5 }}
        >
          {dataRoom?.map((room: typeGetRoom) => (
            <Link
              className="w-[32%] h-[480px]"
              to={`/detail/${room.id}`}
              key={room.id}
            >
              <Card className="h-full">
                <CardMedia
                  component="img"
                  height="140"
                  image={room.image[0].url}
                  alt="green iguana"
                  sx={{ height: 250 }}
                />
                <CardContent sx={{}}>
                  <Stack sx={{ py: 1, px: 1 }}>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      sx={{}}
                    >
                      <div className="text-xs font-medium bg-purple-100 py-1 px-3 rounded-xl">
                        {room.type_tourism}
                      </div>
                      <Typography sx={{ color: "red" }}>
                        {room.price}
                      </Typography>
                    </Stack>
                    <Typography
                      gutterBottom
                      component="div"
                      sx={{ mt: 2, fontWeight: 700, opacity: 0.7 }}
                    >
                      {room.name}
                    </Typography>
                  </Stack>
                  <Divider light sx={{ mb: 2 }} />
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ fontSize: 16, fontWeight: 500 }}
                  >
                    <span>Địa chỉ:</span> <span> {room.address}</span>
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          ))}
        </Stack>
      </Box>
    </Box>
  );
};

export default ListStay;
