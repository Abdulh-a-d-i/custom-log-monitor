import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Box,
    Typography,
} from '@mui/material';

const TicketModal = ({ open, onClose, log, machineId, onSubmit }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({
            machine_id: machineId,
            log: log.log,
            timestamp: log.timestamp,
            title,
            description,
        });
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>Create Ticket</DialogTitle>
            <form onSubmit={handleSubmit}>
                <DialogContent>
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle2" color="text.secondary">
                            Original Log
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 2 }}>
                            {log?.log}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            {new Date(log?.timestamp).toLocaleString()}
                        </Typography>
                    </Box>

                    <TextField
                        autoFocus
                        margin="dense"
                        label="Ticket Title"
                        fullWidth
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        sx={{ mb: 2 }}
                    />

                    <TextField
                        margin="dense"
                        label="Description"
                        fullWidth
                        multiline
                        rows={4}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button type="submit" variant="contained" color="primary">
                        Create Ticket
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default TicketModal; 