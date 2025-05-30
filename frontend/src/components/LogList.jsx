import React from 'react';
import { List, ListItem, ListItemText, Paper, Typography } from '@mui/material';
import { format } from 'date-fns';

const LogList = ({ logs, onLogClick }) => {
    const getSeverityColor = (log) => {
        if (log.log.includes('CRITICAL')) return 'error.dark';
        if (log.log.includes('ERROR')) return 'error.main';
        if (log.log.includes('WARNING')) return 'warning.main';
        return 'text.primary';
    };

    return (
        <Paper elevation={1} sx={{ maxHeight: '70vh', overflow: 'auto' }}>
            <List>
                {logs.map((log, index) => (
                    <ListItem
                        key={index}
                        button
                        onClick={() => onLogClick(log)}
                        sx={{
                            borderBottom: '1px solid',
                            borderColor: 'divider',
                            '&:hover': {
                                backgroundColor: 'action.hover',
                            },
                        }}
                    >
                        <ListItemText
                            primary={
                                <Typography
                                    variant="body1"
                                    sx={{ color: getSeverityColor(log) }}
                                >
                                    {log.log}
                                </Typography>
                            }
                            secondary={
                                <Typography variant="caption" color="text.secondary">
                                    {format(new Date(log.timestamp), 'yyyy-MM-dd HH:mm:ss')}
                                </Typography>
                            }
                        />
                    </ListItem>
                ))}
                {logs.length === 0 && (
                    <ListItem>
                        <ListItemText
                            primary={
                                <Typography variant="body1" color="text.secondary" align="center">
                                    No logs to display
                                </Typography>
                            }
                        />
                    </ListItem>
                )}
            </List>
        </Paper>
    );
};

export default LogList; 