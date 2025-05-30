import React, { useState, useEffect } from 'react';
import { Box, Tabs, Tab, Typography, Container, Grid, Card, CardContent, Button } from '@mui/material';
import { useWebSocket } from '../hooks/useWebSocket';
import LogList from '../components/LogList';
import TicketModal from '../components/TicketModal';
import SeverityFilter from '../components/SeverityFilter';

const LogsPage = () => {
  const [selectedMachine, setSelectedMachine] = useState(null);
  const [machines, setMachines] = useState([]);
  const [logs, setLogs] = useState({});
  const [selectedSeverity, setSelectedSeverity] = useState('ALL');
  const [selectedLog, setSelectedLog] = useState(null);
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);

  const { lastMessage } = useWebSocket('ws://localhost:8000/ws/logs');

  useEffect(() => {
    if (lastMessage) {
      const data = JSON.parse(lastMessage.data);
      const { machine_id, log, timestamp } = data;

      // Update machines list
      setMachines(prev => {
        if (!prev.includes(machine_id)) {
          return [...prev, machine_id];
        }
        return prev;
      });

      // Update logs
      setLogs(prev => ({
        ...prev,
        [machine_id]: [...(prev[machine_id] || []), { log, timestamp }]
      }));

      // Set first machine as selected if none selected
      if (!selectedMachine) {
        setSelectedMachine(machine_id);
      }
    }
  }, [lastMessage, selectedMachine]);

  const handleMachineChange = (event, newValue) => {
    setSelectedMachine(newValue);
  };

  const handleLogClick = (log) => {
    setSelectedLog(log);
    setIsTicketModalOpen(true);
  };

  const handleCreateTicket = async (ticketData) => {
    try {
      const response = await fetch('http://localhost:8000/create-ticket', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ticketData),
      });

      if (response.ok) {
        // Show success toast
        alert('Ticket created successfully!');
        setIsTicketModalOpen(false);
      } else {
        throw new Error('Failed to create ticket');
      }
    } catch (error) {
      console.error('Error creating ticket:', error);
      alert('Failed to create ticket. Please try again.');
    }
  };

  const filteredLogs = selectedMachine && logs[selectedMachine]
    ? logs[selectedMachine].filter(log =>
      selectedSeverity === 'ALL' ||
      log.log.includes(selectedSeverity)
    )
    : [];

  return (
    <Box sx={{
      height: 'calc(100vh - 64px)',
      overflow: 'auto',
      backgroundColor: '#f5f5f5',
      p: 3
    }}>
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          {/* Main Logs Card */}
          <Grid item xs={12}>
            <Card sx={{
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              borderRadius: 2,
              mb: 3
            }}>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Live Logs
                </Typography>

                <Tabs
                  value={selectedMachine}
                  onChange={handleMachineChange}
                  variant="scrollable"
                  scrollButtons="auto"
                  sx={{ mb: 2 }}
                >
                  {machines.map((machine) => (
                    <Tab
                      key={machine}
                      label={`Machine ${machine}`}
                      value={machine}
                    />
                  ))}
                </Tabs>

                <SeverityFilter
                  selectedSeverity={selectedSeverity}
                  onSeverityChange={setSelectedSeverity}
                />

                <LogList
                  logs={filteredLogs}
                  onLogClick={handleLogClick}
                />
              </CardContent>
            </Card>
          </Grid>

          {/* Additional Cards */}
          <Grid item xs={12} md={6}>
            <Card sx={{
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              borderRadius: 2,
              height: '100%'
            }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Quick Actions
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  <Button variant="contained" color="primary">
                    Export Logs
                  </Button>
                  <Button variant="contained" color="secondary">
                    Clear History
                  </Button>
                  <Button variant="outlined">
                    View Statistics
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card sx={{
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              borderRadius: 2,
              height: '100%'
            }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  System Status
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  <Button variant="contained" color="success">
                    Check Health
                  </Button>
                  <Button variant="contained" color="warning">
                    View Alerts
                  </Button>
                  <Button variant="outlined">
                    System Info
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <TicketModal
          open={isTicketModalOpen}
          onClose={() => setIsTicketModalOpen(false)}
          log={selectedLog}
          machineId={selectedMachine}
          onSubmit={handleCreateTicket}
        />
      </Container>
    </Box>
  );
};

export default LogsPage;
