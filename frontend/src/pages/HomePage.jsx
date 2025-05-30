import React from 'react';
import { Box, Grid, Typography, Button, Card, CardContent, Stack, Container, Paper } from '@mui/material';
import CloudQueueIcon from '@mui/icons-material/CloudQueue';
import StorageIcon from '@mui/icons-material/Storage';
import GoogleIcon from '@mui/icons-material/Google';
import CloudOutlinedIcon from '@mui/icons-material/CloudOutlined';

const partners = [
  { name: 'Microsoft Azure', icon: <CloudQueueIcon fontSize="large" sx={{ color: '#0078D4' }} /> },
  { name: 'Google Cloud', icon: <GoogleIcon fontSize="large" sx={{ color: '#4285F4' }} /> },
  { name: 'IBM Cloud', icon: <CloudOutlinedIcon fontSize="large" sx={{ color: '#1F70C1' }} /> },
];

const HomePage = () => {
  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(120deg, #181A1B 60%, #23272E 100%)', color: '#fff', py: 8 }}>
      <Container maxWidth="xl">
        <Grid container spacing={6} alignItems="center">
          {/* Left: Hero Text */}
          <Grid item xs={12} md={6}>
            <Typography variant="h2" fontWeight={700} gutterBottom sx={{ fontSize: { xs: '2.2rem', md: '3.5rem' } }}>
              Monitor your apps like you mean business
            </Typography>
            <Typography variant="h5" color="grey.400" gutterBottom sx={{ mb: 4, fontWeight: 400 }}>
              Modernize, observe, and deploy logs at scale on a trusted and consistent platform. Accelerate troubleshooting and simplify monitoring with a comprehensive set of tools.
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} sx={{ mb: 5 }}>
              <Button
                variant="contained"
                size="large"
                sx={{
                  background: 'linear-gradient(90deg, #E00B1C 0%, #FF4B2B 100%)',
                  boxShadow: '0 4px 24px 0 rgba(224,11,28,0.25)',
                  borderRadius: 2,
                  fontWeight: 600,
                  px: 4,
                  py: 1.5,
                  fontSize: '1.1rem',
                }}
                href="/logs"
              >
                Live Log Monitoring
              </Button>
              <Button
                variant="outlined"
                size="large"
                sx={{
                  color: '#fff',
                  borderColor: '#fff',
                  background: 'rgba(255,255,255,0.04)',
                  boxShadow: '0 4px 24px 0 rgba(255,255,255,0.05)',
                  borderRadius: 2,
                  fontWeight: 600,
                  px: 4,
                  py: 1.5,
                  fontSize: '1.1rem',
                  '&:hover': {
                    background: 'rgba(255,255,255,0.10)',
                    borderColor: '#fff',
                  },
                }}
                href="/tickets"
              >
                View Tickets
              </Button>
            </Stack>
          </Grid>

          {/* Right: Illustration/Card */}
          <Grid item xs={12} md={6}>
            <Card sx={{
              background: 'linear-gradient(120deg, #23272E 60%, #181A1B 100%)',
              boxShadow: '0 8px 32px 0 rgba(0,0,0,0.35)',
              borderRadius: 4,
              minHeight: 340,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              p: 4,
            }}>
              <CardContent>
                <Typography variant="h6" color="grey.400" gutterBottom>

                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 2 }}>
                  <img
                    src="https://raw.githubusercontent.com/RedHatOfficial/RedHatOpenShift-Logos/main/openshift-pipeline.png"
                    alt="Pipeline Overview"
                    style={{ width: '100%', maxWidth: 340, borderRadius: 12, boxShadow: '0 2px 16px 0 rgba(0,0,0,0.25)' }}
                    onError={e => { e.target.style.display = 'none'; }}
                  />
                  <Typography variant="body2" color="grey.500" sx={{ mt: 2 }}>
                    Visualize your log flow and system health in real time.
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Partner Logos */}
        <Paper elevation={0} sx={{
          background: 'transparent',
          mt: 8,
          p: 3,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          gap: 6,
          borderRadius: 3,
        }}>
          {partners.map((partner) => (
            <Box key={partner.name} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mx: 2 }}>
              {partner.icon}
              <Typography variant="caption" color="grey.400" sx={{ mt: 1 }}>
                {partner.name}
              </Typography>
            </Box>
          ))}
        </Paper>
      </Container>
    </Box>
  );
};

export default HomePage;
