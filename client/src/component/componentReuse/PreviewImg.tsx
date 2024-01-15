import { Box, ImageList, ImageListItem, Stack, createTheme } from '@mui/material'
import { InputFileUpload } from '../element'
import { ThemeProvider } from '@emotion/react';

import FileOpenIcon from '@mui/icons-material/FileOpen';
import { useInputMultiple } from '../../hook';
const theme = createTheme({
    components: {
        MuiStack: {
            styleOverrides: {
                root: {
                    "&.MuiStack": {
                        borderRadius: "16px"
                    }

                },
            },
        },
    },
});

function PreviewImg() {
    const inputMultiple = useInputMultiple()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        inputMultiple.onChange(e)

    }
    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ borderRadius: "6px", overflow: "hidden", border: "1px", borderColor: "#dee2e6", borderStyle: 'solid' }} >
                <Stack >
                    <div className="py-4 px-5 bg-[#eeeeee] ">
                        <InputFileUpload multiple={true} handleChange={handleChange} />
                    </div>
                    <div className=" min-h-[400px]">
                        <div className="flex flex-col justify-center items-center min-h-[400px]">
                            <FileOpenIcon sx={{ fontSize: "40px", color: "#1976d2" }} />
                            <p className='text-center'>Chọn ảnh...</p>
                        </div>
                        {/* <ImageList sx={{ width: "100%", minHeight: "400px", overflow: "auto" }} cols={2} rowHeight={164}>

                            <ImageListItem >
                                <img
                                    src=""
                                    alt=""
                                    loading="lazy"
                                />
                            </ImageListItem>

                        </ImageList> */}
                    </div>
                </Stack>
            </Box>
        </ThemeProvider>
    )
}

export default PreviewImg