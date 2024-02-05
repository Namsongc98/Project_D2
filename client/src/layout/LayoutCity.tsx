import { Box, Stack, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";
const LayoutCity = () => {
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
            Danh sách phòng thành phố
          </Typography>
          <Typography sx={{ width: "70%", lineHeight: 2 }}>
            Asahi kết hợp với các nhà cung cấp uy tín, mang lại cho các bạn
            những trải nghiệm tuyệt vời nhất trong chuyến hành trình của minh.
            Chúng tôi sẽ luôn đồng hành cùng các bạn để liên tục cập nhật những
            sản phẩm mới nhất.
          </Typography>
        </Stack>
        <Outlet />
      </Box>
    </Box>
  );
};

export default LayoutCity;
