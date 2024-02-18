import {
  Card,
  CardContent,
  CardMedia,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getRoomSearchAddress } from "../../service";
import { typeGetRoom } from "../../type";
import { formatcurrency } from "../../common";

const DetaiSearchRoom = () => {
  const [roomArr, setRoomArr] = useState([] as typeGetRoom[]);

  const [searchParams] = useSearchParams();

  const getRoom = async (dataParam: {
    address: string;
    checkin: string;
    checkout: string;
    person: string;
  }) => {
    try {
      const res: typeGetRoom[] = await getRoomSearchAddress(dataParam);
      setRoomArr(res);
    } catch (error) {
      throw new Error("Không tìm thấy kết quả");
    }
  };

  useEffect(() => {
    const currentParams: any = Object.fromEntries([...searchParams]);
    getRoom(currentParams);
  }, [searchParams]);
  return (
    <>
      <Stack sx={{ width: "100%", mt: 4 }}>
        <Typography variant="h4" component="h2">
          Danh sách phòng theo kết quả
        </Typography>
      </Stack>
      {!roomArr.length && (
        <Paper
          sx={{
            height: "400px",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mt: 5,
          }}
        >
          <Typography variant="h4" color="text.secondary">
            Không tìm thấy kết quả tương ứng
          </Typography>
        </Paper>
      )}
      <Stack
        direction="row"
        spacing={2}
        useFlexGap
        flexWrap="wrap"
        sx={{ my: 5 }}
      >
        {roomArr?.map((room) => (

          <Link
            className="w-[32%] h-[480px]"
            to={`/detail/${room.id}`}
            key={room.id}
          >
            <Card className="h-[100%]">
              <CardMedia
                component="img"
                height="140"
                image={room.image[0].url}
                alt="green iguana"
                sx={{ height: 250 }}
              />
              <CardContent>
                <Stack sx={{ py: 1, px: 1 }}>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
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
    </>
  );
};

export default DetaiSearchRoom;
