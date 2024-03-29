import { Link as RouterLink } from 'react-router-dom';

// material-ui
import { Badge, Button, CardMedia, Container, Grid, Link, Typography } from '@mui/material';

// third party
import { motion } from 'framer-motion';

// project-imports
import FadeInWhenVisible from './Animation';
import MainCard from 'components/MainCard';
import IconButton from 'components/@extended/IconButton';

// assets
import { DocumentDownload, ExportSquare } from 'iconsax-react';
import smartParking from 'assets/images/developers/icons/smart-parking.svg';
import findParking from 'assets/images/developers/icons/find-parking.svg';
import earnMoney from 'assets/images/developers/icons/earn-money.svg';
import fastag from 'assets/images/developers/icons/fastag.svg';
import evCharging from 'assets/images/developers/icons/ev-charging.svg';
import tollPlaza from 'assets/images/developers/icons/toll-plaza.svg';

const Technologies = [
  {
    trending: false,
    icon: smartParking,
    title: 'Smart Parking',
    description: 'For MLCPs, Parking Lots, Airports, and Malls and more. End to end smart parking ecosystem and technologies.',
    preview: 'https://parkadda.com/#:~:text=Solutions-,Smart%20Parking,-For%20MLCPs%2C%20Parking',
    free: null
  },
  {
    trending: false,
    icon: findParking,
    title: 'Find Parking',
    description: 'For Individuals and Fleets. Find available parking and book through the app.',
    preview: 'https://parkadda.com/#:~:text=ecosystem%20and%20technologies-,Find%20Parking,-For%20Individuals%20and',
    free: null
  },
  {
    trending: false,
    icon: earnMoney,
    title: 'Earn Money',
    description:
      'For Individuals, Fleet Owners, MLCPs, Businesses, Parking Lots and more. Earn money by sharing your unused parking space.',
    preview: 'https://parkadda.com/#:~:text=through%20the%20app-,Earn%20Money,-For%20Individuals%2C%20Fleet',
    free: null
  },
  {
    trending: false,
    icon: fastag,
    title: 'FASTag',
    description: 'For FASTag owners. Seamlessly enter parking lots and automatically pay for parking fee with your FASTag.',
    preview: 'https://parkadda.com/#:~:text=unused%20parking%20space-,FASTag,-For%20FASTag%20owners',
    free: null
  },
  {
    trending: false,
    icon: evCharging,
    title: 'Find EV Charging',
    description: 'For Electric Vehicle Owners. Find available parking and EV charging stations in the cities.',
    preview: 'https://parkadda.com/#:~:text=with%20your%20FASTag-,Find%20EV%20Charging,-For%20Electric%20Vehicle',
    free: null
  },
  {
    trending: false,
    icon: tollPlaza,
    title: 'Parking products',
    description: 'For Smart Cities, Businesses, Event Operators, Parking Lots and more. Professional parking and consulting services.',
    preview: 'https://parkadda.com/#:~:text=Parking%20Services%20%26%20Consulting',
    free: null
  }
];

// ==============================|| LANDING - TechnologiesPage ||============================== //

const TechnologiesPage = () => {
  return (
    <Container>
      <Grid container spacing={3} alignItems="center" justifyContent="center" sx={{ mt: { md: 15, xs: 2.5 }, mb: { md: 10, xs: 2.5 } }}>
        <Grid item xs={12}>
          <Grid container spacing={2} sx={{ textAlign: 'center', marginBottom: 3 }}>
            <Grid item xs={12}>
              <motion.div
                initial={{ opacity: 0, translateY: 550 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 150,
                  damping: 30,
                  delay: 0.2
                }}
              >
                <Typography variant="h2">Available Technologies</Typography>
              </motion.div>
            </Grid>
            <Grid item xs={12}>
              <motion.div
                initial={{ opacity: 0, translateY: 550 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 150,
                  damping: 30,
                  delay: 0.4
                }}
              >
                <Typography>Get in touch with our tech team for seamless demo.</Typography>
              </motion.div>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={3} alignItems="center">
            {Technologies.map((tech, index) => (
              <Grid item xs={12} md={6} lg={4} key={index}>
                <FadeInWhenVisible>
                  <MainCard>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        {tech.trending && (
                          <Badge badgeContent="TRENDING" color="error" variant="light">
                            <CardMedia component="img" image={tech.icon} sx={{ width: 'auto' }} />
                          </Badge>
                        )}
                        {!tech.trending && <CardMedia component="img" image={tech.icon} sx={{ width: 'auto' }} />}
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="h4">{tech.title}</Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography>{tech.description}</Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Grid container spacing={2} justifyContent="flex-start">
                          <Grid item>
                            <Button
                              variant="contained"
                              color="secondary"
                              size="large"
                              startIcon={<ExportSquare />}
                              component={Link}
                              href={tech.preview}
                              target="_blank"
                              sx={{
                                fontWeight: 500,
                                bgcolor: 'secondary.light',
                                color: 'secondary.darker',
                                '&:hover': { color: 'secondary.lighter' }
                              }}
                            >
                              Reference
                            </Button>
                          </Grid>
                          {!(tech.free == null) && (
                            <Grid item>
                              <Link component={RouterLink} to={tech.preview}>
                                <IconButton
                                  size="large"
                                  shape="rounded"
                                  color="secondary"
                                  sx={{
                                    bgcolor: 'secondary.lighter',
                                    color: 'secondary.darker',
                                    '&:hover': { color: 'secondary.lighter', bgcolor: 'secondary.darker' }
                                  }}
                                >
                                  <DocumentDownload />
                                </IconButton>
                              </Link>
                            </Grid>
                          )}
                        </Grid>
                      </Grid>
                    </Grid>
                  </MainCard>
                </FadeInWhenVisible>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};
export default TechnologiesPage;
