import { Box, Typography, Grid } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';


const MainInformation: React.FC<AuctionItem> = AuctionItem => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Grid container spacing={isSmallScreen ? 2 : 4}   >
            <Grid item  md={12} lg={6}>
                <img
                    src={AuctionItem?.photos?.length == 0 ? "https://placekitten.com/800/400" : AuctionItem?.photos[0]}
                    alt={AuctionItem?.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
            </Grid>

            <Grid item  md={12} lg={6}>
                <Box p={isSmallScreen ? 0 : 2}>
                    <Typography variant="body1" align='right' paragraph>
                    {AuctionItem?.startPrice}
                    </Typography>
                    <Typography variant={isSmallScreen ? "h5" : "h4"} align='left' gutterBottom>
                        {AuctionItem?.name}
                    </Typography>
                    <Typography variant={isSmallScreen ? "body2" : "body1"} align='justify' paragraph>
                        {AuctionItem?.description}
                    </Typography>
                </Box>
            </Grid>
        </Grid>

    )
};

export default MainInformation;