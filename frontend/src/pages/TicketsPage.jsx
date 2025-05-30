import React, { useState, useEffect } from 'react';
import {
    Container,
    Typography,
    Paper,
    Grid,
    Card,
    CardContent,
    CardActions,
    Button,
    Chip,
    Box,
    Tabs,
    Tab,
} from '@mui/material';
import { format } from 'date-fns';

const TicketsPage = () => {
    const [tickets, setTickets] = useState([]);
    const [selectedMachine, setSelectedMachine] = useState('ALL');
    const [machines, setMachines] = useState(['ALL']);

    useEffect(() => {
        fetchTickets();
    }, []);

    const fetchTickets = async () => {
        try {
            const response = await fetch('http://localhost:8000/tickets');
            const data = await response.json();
            setTickets(data);

            // Extract unique machine IDs
            const uniqueMachines = ['ALL', ...new Set(data.map(ticket => ticket.machine_id))];
            setMachines(uniqueMachines);
        } catch (error) {
            console.error('Error fetching tickets:', error);
        }
    };

    const handleMachineChange = (event, newValue) => {
        setSelectedMachine(newValue);
    };

    const getSeverityColor = (log) => {
        if (log.includes('CRITICAL')) return 'error';
        if (log.includes('ERROR')) return 'error';
        if (log.includes('WARNING')) return 'warning';
        return 'default';
    };

    const filteredTickets = tickets.filter(ticket =>
        selectedMachine === 'ALL' || ticket.machine_id === selectedMachine
    );

    return (
        <Container maxWidth="xl" sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                Tickets
            </Typography>

            <Paper sx={{ mb: 3 }}>
                <Tabs
                    value={selectedMachine}
                    onChange={handleMachineChange}
                    variant="scrollable"
                    scrollButtons="auto"
                >
                    {machines.map((machine) => (
                        <Tab
                            key={machine}
                            label={machine === 'ALL' ? 'All Machines' : `Machine ${machine}`}
                            value={machine}
                        />
                    ))}
                </Tabs>
            </Paper>

            <Grid container spacing={3}>
                {filteredTickets.map((ticket) => (
                    <Grid item xs={12} md={6} lg={4} key={ticket.id}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    {ticket.title}
                                </Typography>
                                <Box sx={{ mb: 2 }}>
                                    <Chip
                                        label={`Machine ${ticket.machine_id}`}
                                        size="small"
                                        sx={{ mr: 1 }}
                                    />
                                    <Chip
                                        label={ticket.log.split(' ')[0]}
                                        color={getSeverityColor(ticket.log)}
                                        size="small"
                                    />
                                </Box>
                                <Typography variant="body2" color="text.secondary" gutterBottom>
                                    {ticket.description}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                    Created: {format(new Date(ticket.timestamp), 'yyyy-MM-dd HH:mm:ss')}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small">View Details</Button>
                                <Button size="small" color="primary">
                                    Update Status
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
                {filteredTickets.length === 0 && (
                    <Grid item xs={12}>
                        <Paper sx={{ p: 3, textAlign: 'center' }}>
                            <Typography variant="body1" color="text.secondary">
                                No tickets found
                            </Typography>
                        </Paper>
                    </Grid>
                )}
            </Grid>
        </Container>
    );
};

export default TicketsPage; 