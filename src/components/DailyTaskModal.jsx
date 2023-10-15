import React, { useRef } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import ButtonGroup from '@mui/material/ButtonGroup';
import { toast } from 'react-toastify';
import { useText } from '../context/task-context';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function DailyTaskModal(props) {
  const { taskHandler } = useText();
  const { open, handleClose } = props;
  const isLoggedIn = localStorage.getItem('loginDetails');

  const taskNameRef = useRef();
  const taskDescriptionRef = useRef();
  const taskDurationRef = useRef();
  const taskPriorityRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    const taskDetails = {
      taskName: taskNameRef.current.value,
      taskDescription: taskDescriptionRef.current.value,
      taskDuration: (taskDurationRef.current.value),
      taskPriority: taskPriorityRef.current.value
    };

    if (!isLoggedIn) {
      toast.error("Please login first to submit your task");
    } else {
      console.log(taskDetails);
      taskHandler(taskDetails);

      // Additional code for submitting to server (if needed)
      // For example, using fetch or axios to send data to your server
    }
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <form onSubmit={handleSubmit}>
              <Typography id="transition-modal-title" variant="h6" component="h2">
                Daily Focus
              </Typography>
              <TextField
                label="Task Name"
                variant="outlined"
                inputRef={taskNameRef}
                fullWidth
                required
                sx={{ mt: 2 }}
              />
              <TextField
                label="Description"
                variant="outlined"
                inputRef={taskDescriptionRef}
                multiline
                rows={4}
                fullWidth
                sx={{ mt: 2 }}
              />
              <TextField
                label="Time Required (in minutes)"
                variant="outlined"
                type="text"
                inputRef={taskDurationRef}
                fullWidth
                sx={{ mt: 2 }}
              />
              <FormControl fullWidth variant="outlined" sx={{ mt: 2 }}>
                <InputLabel id="priority-label">Priority</InputLabel>
                <Select
                  labelId="priority-label"
                  label="Priority"
                  inputRef={taskPriorityRef}
                  defaultValue=""
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="Low">Low</MenuItem>
                  <MenuItem value="Medium">Medium</MenuItem>
                  <MenuItem value="High">High</MenuItem>
                </Select>
              </FormControl>
              <ButtonGroup sx={{ mt: 2 }}>
                <Button variant="contained" onClick={handleClose}>
                  Cancel
                </Button>
                <Button type="submit" variant="contained" color="primary">
                  Submit
                </Button>
              </ButtonGroup>
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
