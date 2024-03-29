// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, CardMedia, Container, Grid, Link, Tooltip, Typography } from '@mui/material';

// third party
import { motion } from 'framer-motion';

// assets
import smartParking from 'assets/images/developers/icons/smart-parking.svg';
import findParking from 'assets/images/developers/icons/find-parking.svg';
import earnMoney from 'assets/images/developers/icons/earn-money.svg';
import fastag from 'assets/images/developers/icons/fastag.svg';
import evCharging from 'assets/images/developers/icons/ev-charging.svg';
import tollPlaza from 'assets/images/developers/icons/toll-plaza.svg';

// ==============================|| LANDING - HeaderPage ||============================== //

const HeaderPage = () => {
  const theme = useTheme();

  return (
    <Container sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      <Grid container alignItems="center" justifyContent="center" spacing={2} sx={{ pt: { md: 0, xs: 8 }, pb: { md: 0, xs: 5 } }}>
        <Grid item xs={12} md={9}>
          <Grid container spacing={3} sx={{ textAlign: 'center' }}>
            <Grid item xs={12}>
              <motion.div
                initial={{ opacity: 0, translateY: 550 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 150,
                  damping: 30
                }}
              >
                <Typography
                  variant="h1"
                  sx={{
                    fontSize: { xs: '1.825rem', sm: '2rem', md: '3.4375rem' },
                    fontWeight: 700,
                    lineHeight: 1.2
                  }}
                >
                  <span>Experience the best </span>
                  <br />
                  <Box
                    component="span"
                    sx={{
                      background: 'linear-gradient(90deg, rgb(37, 161, 244), rgb(249, 31, 169), rgb(37, 161, 244)) 0 0 / 400% 100%',
                      color: 'transparent',
                      WebkitBackgroundClip: 'text',
                      backgroundClip: 'text',
                      animation: 'move-bg 24s infinite linear',
                      '@keyframes move-bg': {
                        '100%': {
                          backgroundPosition: '400% 0'
                        }
                      }
                    }}
                  >
                    <span>Parking Infrastructure </span>
                    <br />
                  </Box>
                  <span> across India</span>
                </Typography>
              </motion.div>
            </Grid>
            <Grid container justifyContent="center" item xs={12}>
              <Grid item xs={8}>
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
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{
                      fontSize: { xs: '0.875rem', md: '1rem' },
                      fontWeight: 400,
                      lineHeight: { xs: 1.4, md: 1.4 }
                    }}
                  >
                    Parkadda provides wide variety of Infrastructure for parking used by over 300K+ users across India.
                  </Typography>
                </motion.div>
              </Grid>
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
              ></motion.div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Box
        sx={{
          display: 'flex',
          position: 'absolute',
          bottom: { xs: -30, sm: 0 },
          left: 0,
          right: 0,
          alignItems: 'center',
          justifyContent: 'center',
          background: theme.palette.background.paper,
          borderTop: `1px solid ${theme.palette.divider}`,
          borderBottom: `1px solid ${theme.palette.divider}`
        }}
      >
        <Grid
          container
          spacing={0}
          justifyContent="center"
          sx={{
            '& > .MuiGrid-item': {
              borderRight: `1px solid ${theme.palette.divider}`,
              '&:first-of-type': {
                borderLeft: `1px solid ${theme.palette.divider}`
              },
              '& img': {
                padding: 1.3
              }
            }
          }}
        >
          <Grid item>
            <motion.div
              initial={{ opacity: 0, translateY: 550 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{
                type: 'spring',
                stiffness: 150,
                damping: 30,
                delay: 0.8
              }}
            >
              <Tooltip title="Smart Parking">
                <Link component={Link} href={'https://parkadda.com'} target="_blank">
                  <CardMedia component="img" image={smartParking} sx={{ width: 'auto' }} />
                </Link>
              </Tooltip>
            </motion.div>
          </Grid>
          <Grid item>
            <motion.div
              initial={{ opacity: 0, translateY: 550 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{
                type: 'spring',
                stiffness: 150,
                damping: 30,
                delay: 1
              }}
            >
              <Tooltip title="Find Parking">
                <Link component={Link} href={'https://parkadda.com'} target="_blank">
                  <CardMedia component="img" image={findParking} sx={{ width: 'auto' }} />
                </Link>
              </Tooltip>
            </motion.div>
          </Grid>
          <Grid item>
            <motion.div
              initial={{ opacity: 0, translateY: 550 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{
                type: 'spring',
                stiffness: 150,
                damping: 30,
                delay: 1.1
              }}
            >
              <Tooltip title="Earn Money">
                <Link component={Link} href={'https://parkadda.com'} target="_blank">
                  <CardMedia component="img" image={earnMoney} sx={{ width: 'auto' }} />
                </Link>
              </Tooltip>
            </motion.div>
          </Grid>
          <Grid item>
            <motion.div
              initial={{ opacity: 0, translateY: 550 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{
                type: 'spring',
                stiffness: 150,
                damping: 30,
                delay: 1.2
              }}
            >
              <Tooltip title="Fastag">
                <Link component={Link} href={'https://parkadda.com'} target="_blank">
                  <CardMedia component="img" image={fastag} sx={{ width: 'auto' }} />
                </Link>
              </Tooltip>
            </motion.div>
          </Grid>
          <Grid item>
            <motion.div
              initial={{ opacity: 0, translateY: 550 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{
                type: 'spring',
                stiffness: 150,
                damping: 30,
                delay: 1.3
              }}
            >
              <Tooltip title="EV Charging">
                <Link component={Link} href={'https://parkadda.com'} target="_blank">
                  <CardMedia component="img" image={evCharging} sx={{ width: 'auto' }} />
                </Link>
              </Tooltip>
            </motion.div>
          </Grid>
          <Grid item>
            <motion.div
              initial={{ opacity: 0, translateY: 550 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{
                type: 'spring',
                stiffness: 150,
                damping: 30,
                delay: 1.3
              }}
            >
              <Tooltip title="Parking Products">
                <Link component={Link} href={'https://parkadda.com'} target="_blank">
                  <CardMedia component="img" image={tollPlaza} sx={{ width: 'auto' }} />
                </Link>
              </Tooltip>
            </motion.div>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};
export default HeaderPage;
