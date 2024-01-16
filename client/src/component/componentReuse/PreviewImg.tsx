import { Box, Stack, createTheme } from "@mui/material";
import { InputFileUpload } from "../element";
import { ThemeProvider } from "@emotion/react";

import FileOpenIcon from "@mui/icons-material/FileOpen";
import CancelIcon from "@mui/icons-material/Cancel";
import { PropImages } from "../../type";
import { ToastComponent } from ".";
import { useEffect, useState } from "react";
const theme = createTheme({
  components: {
    MuiStack: {
      styleOverrides: {
        root: {
          "&.MuiStack": {
            borderRadius: "16px",
          },
        },
      },
    },
  },
});

function PreviewImg({ imageRoom }: PropImages) {
  const { arrImgView, onChange, errorImg, setArrImgView } = imageRoom;
  const [status, setStatus] = useState({
    type: "",
    message: "",
  });
  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    onChange(e);
  };

  const handleCancel = (index: number) => {
    const filterImg = arrImgView.filter((item) => {
      return item.id !== index;
    });
    setArrImgView(filterImg);
  };

  useEffect(() => {
    if (errorImg) {
      setStatus({ type: "error", message: errorImg });
    }
    return () => {
      setStatus({
        type: "",
        message: "",
      });
    };
  }, [errorImg]);

  return (
    <>
      {status.message && <ToastComponent status={status} />}
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            borderRadius: "6px",
            overflow: "hidden",
            border: "1px",
            borderColor: "#dee2e6",
            borderStyle: "solid",
            maxWidth: "750px",
          }}
        >
          <Stack>
            <div className="py-4 px-5 bg-[#eeeeee] ">
              <InputFileUpload multiple={true} handleChange={handleChange} />
            </div>
            <div className=" min-h-[400px]">
              {!arrImgView.length ? (
                <div className="flex flex-col justify-center items-center min-h-[400px]">
                  <FileOpenIcon sx={{ fontSize: "40px", color: "#1976d2" }} />
                  <p className="text-center">Chọn ảnh...</p>
                </div>
              ) : (
                <div className="flex flex-wrap overflow-auto max-h-[400px] ">
                  {arrImgView.map((item) => (
                    <div
                      key={item.id}
                      className={`border border-solid overflow-hidden rounded w-1/3 relative ${
                        item.error && "border-red-500"
                      }`}
                    >
                      <img
                        src={item.url}
                        alt={item.url}
                        className="w-full h-full object-cover "
                      />
                      <CancelIcon
                        className="absolute top-[0px] right-[0px] text-red-500 "
                        onClick={() => handleCancel(item.id)}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Stack>
        </Box>
      </ThemeProvider>
    </>
  );
}

export default PreviewImg;
