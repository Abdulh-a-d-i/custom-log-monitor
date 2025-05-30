import React from 'react';
import { Box, ToggleButton, ToggleButtonGroup } from '@mui/material';

const SeverityFilter = ({ selectedSeverity, onSeverityChange }) => {
    const handleChange = (event, newSeverity) => {
        if (newSeverity !== null) {
            onSeverityChange(newSeverity);
        }
    };

    return (
        <Box sx={{ mb: 2 }}>
            <ToggleButtonGroup
                value={selectedSeverity}
                exclusive
                onChange={handleChange}
                aria-label="log severity filter"
            >
                <ToggleButton value="ALL" aria-label="all logs">
                    ALL
                </ToggleButton>
                <ToggleButton value="ERROR" aria-label="error logs" sx={{ color: 'error.main' }}>
                    ERROR
                </ToggleButton>
                <ToggleButton value="WARNING" aria-label="warning logs" sx={{ color: 'warning.main' }}>
                    WARNING
                </ToggleButton>
                <ToggleButton value="CRITICAL" aria-label="critical logs" sx={{ color: 'error.dark' }}>
                    CRITICAL
                </ToggleButton>
            </ToggleButtonGroup>
        </Box>
    );
};

export default SeverityFilter; 