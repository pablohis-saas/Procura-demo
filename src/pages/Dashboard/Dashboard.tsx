import React from 'react';
import { Grid, Paper, Typography, Box } from '@mui/material';
import { People, CalendarToday, Warning } from '@mui/icons-material';
import { mockPatients, mockAppointments } from '../../data/mockData';

export const Dashboard = () => {
  const todayAppointments = mockAppointments.filter(
    (appointment) => appointment.status === 'scheduled'
  );

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <People sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
            <Typography variant="h6">Total Pacientes</Typography>
            <Typography variant="h4">{mockPatients.length}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <CalendarToday sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
            <Typography variant="h6">Citas Hoy</Typography>
            <Typography variant="h4">{todayAppointments.length}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Warning sx={{ fontSize: 40, color: 'warning.main', mb: 1 }} />
            <Typography variant="h6">Alertas</Typography>
            <Typography variant="h4">0</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}; 