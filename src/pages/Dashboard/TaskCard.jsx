import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';

const cardStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  height: '100%',
  borderRadius: '12px',
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
  backgroundColor: '#e91aa8',
  padding: '16px',
  margin: '4px',
  color: '#fff',
  border: '2px solid #e91aa8',
};

const titleStyle = {
  marginTop: '10px',
  marginBottom: '16px',
  fontSize: '1.5em',
  textAlign: 'center',
};

function TaskCard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tasksLength, setTasksLength] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("loginDetails"));
        const email = user.user.userEmail;

        if (email) {
          const response = await Axios.post(`http://localhost:8080/api/gettasks`, {
            userEmail: email
          });
          setTasks(response.data.data);
          setTasksLength(response.data.data.length);
        } else {
          setError("User email not found.");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const navigateToNewPage = (task) => {
    console.log(task);
    navigate('/pomodoro', { state: task });
  };

  return (
    <Grid container spacing={2} alignItems="flex-start" justifyContent="center">
      <Grid item xs={12}>
        <Typography variant="h4" component="div" style={titleStyle}>
          Daily Task List
        </Typography>
      </Grid>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {tasksLength === 0 && <p>Please add tasks for today.</p>}
      {tasksLength > 0 && (
        tasks.map((task, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Card sx={cardStyle} onClick={() => navigateToNewPage(task)}>
              <CardContent>
                <Typography variant="h6" component="div">
                  {task.taskName}
                </Typography>
                <LinearProgress variant="determinate" value={task.progress} />
              </CardContent>
            </Card>
          </Grid>
        ))
      )}
    </Grid>
  );
}

export default TaskCard;
