import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { SelectOptionType, typeGetRoom } from "../../type";
import { Link } from "react-router-dom";
import { getListRoom } from "../../service";
import { formatcurrency } from "../../common";

const ListStay = () => {
  const [dataRoom, setDataRoom] = useState<typeGetRoom[] | undefined>();
  const selectSort: SelectOptionType[] = [
    {
      label: "Mới nhất",
      value: "id",
    },
    {
      label: "Cũ nhất",
      value: "id",
    },
    {
      label: "Giá: Cao -> thấp",
      value: "price",
    },
    {
      label: "Giá: thấp -> cao",
      value: "price",
    },
  ];
  const getDataRoomCity = async () => {
    try {
      const res = await getListRoom();
      setDataRoom(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getDataRoomCity();
  }, []);
  return (
    <Box>
      <Stack direction="row" justifyContent={"space-between"} sx={{ my: 5 }}>
        <div className=""></div>
        <div className=""></div>
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
                   
                      {formatcurrency(room.price)}
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
  );
};

export default ListStay;
