import { Box, Card, CardActionArea, CardContent, CardMedia, Container, Divider, Stack, Typography } from '@mui/material'
import demo from "../../assets/image/HaNoi.png"
import { useParams } from 'react-router-dom';

const ListStay = () => {

    const params = useParams();
    console.log(params)
    return (
        <Container component="main" sx={{ backgroundColor: "#f5f5f5" }} maxWidth="100%">
            <Box sx={{ maxWidth: 1300, my: 0, mx: "auto" }}>
                <Stack sx={{ my: 5 }}>
                    <Typography variant="h4" component="h2" sx={{ mb: 2, fontWeight: "700", opacity: 0.7 }}>
                        Danh sách chỗ nghỉ
                    </Typography>
                    <Typography sx={{ width: "70%", lineHeight: 2 }} >
                        Asahi kết hợp với các nhà cung cấp uy tín, mang lại cho các bạn những trải nghiệm tuyệt vời nhất trong chuyến hành trình của minh.
                        Chúng tôi sẽ luôn đồng hành cùng các bạn để liên tục cập nhật những sản phẩm mới nhất.
                    </Typography>
                </Stack>
                <Stack direction="row" spacing={2} useFlexGap flexWrap="wrap">
                    <Card sx={{ maxWidth: '32%', }}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="140"
                                image={demo}
                                alt="green iguana"
                            />
                            <CardContent sx={{}}>
                                <Stack sx={{ py: 1, px: 1 }}>
                                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{}}>
                                        <div className='text-xs font-medium bg-purple-100 py-1 px-3 rounded-xl'>
                                            Lizard
                                        </div>
                                        <Typography sx={{ color: "red" }}>
                                            12425452
                                        </Typography>
                                    </Stack>
                                    <Typography gutterBottom component="div" sx={{ mt: 2, fontWeight: 700, opacity: 0.7 }}>
                                        Lizard
                                    </Typography>

                                </Stack>
                                <Divider light sx={{ mb: 2 }} />
                                <Typography variant="body2" color="text.secondary">
                                    Lizards are a widespread group of squamate reptiles, with over 6,000
                                    species, ranging across all continents except Antarctica
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                    <Card sx={{ maxWidth: '32%' }}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="140"
                                image={demo}
                                alt="green iguana"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Lizard
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Lizards are a widespread group of squamate reptiles, with over 6,000
                                    species, ranging across all continents except Antarctica
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                    <Card sx={{ maxWidth: '32%' }}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="140"
                                image={demo}
                                alt="green iguana"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Lizard
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Lizards are a widespread group of squamate reptiles, with over 6,000
                                    species, ranging across all continents except Antarctica
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                    <Card sx={{ maxWidth: '32%' }}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="140"
                                image={demo}
                                alt="green iguana"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Lizard
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Lizards are a widespread group of squamate reptiles, with over 6,000
                                    species, ranging across all continents except Antarctica
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Stack>
            </Box>
        </Container>
    )
}

export default ListStay