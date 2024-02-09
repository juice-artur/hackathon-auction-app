import { Box, Typography, Grid } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

interface PageProps {
    imageUrl: string;
    title: string;
    description: string;
}

const MainInformation: React.FC<PageProps> = ({ imageUrl, title, description }) => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Grid container spacing={isSmallScreen ? 2 : 4}   >
            <Grid item  md={12} lg={6}>
                <img
                    src={imageUrl}
                    alt={title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
            </Grid>

            <Grid item  md={12} lg={6}>
                <Box p={isSmallScreen ? 0 : 2}>
                    <Typography variant="body1" align='right' paragraph>
                        "current prise"
                    </Typography>
                    <Typography variant={isSmallScreen ? "h5" : "h4"} align='left' gutterBottom>
                        {title}
                    </Typography>
                    <Typography variant={isSmallScreen ? "body2" : "body1"} align='justify' paragraph>
                        {description}
                    </Typography>
                </Box>
            </Grid>
        </Grid>

    )
};

export default MainInformation;