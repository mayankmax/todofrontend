import React from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LinearProgress from '@mui/material/LinearProgress';

const containerStyle = {
  border: '1px solid #ccc',
  padding: '20px',
  marginBottom: '20px',
  width: '100%', // Set width to 100% for responsiveness
  borderRadius: '8px',
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
  backgroundColor: '#fff',
  position: 'relative',
  boxSizing: 'border-box', // Ensure padding and border are included in width
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  height:"550px"
};

const titleStyle = {
  fontSize: '1.5em',
  marginBottom: '10px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexWrap: 'wrap', // Allow items to wrap on smaller screens
};

const priorityStyle = {
  position: 'absolute',
  top: '10px',
  left: '10px',
};

const importantStyle = {
  position: 'absolute',
  top: '10px',
  right: '10px',
  cursor: 'pointer',
};

const descriptionStyle = {
  marginBottom: '10px',
};

const selectContainerStyle = {
  marginBottom: '10px',
};

const selectStyle = {
  width: '100%',
};

const progressStyle = {
  marginBottom: '10px',
};

function TaskDisplay({ task }) {
  const handleToggleImportant = () => {
    // Add logic to toggle important status
  };

  const handleStatusChange = (e) => {
    // Add logic to update task progress
  };

  return (

    <>

    <h2 style={{textAlign:'center'}}>Task Details</h2>

    <div style={containerStyle}>
      <div style={titleStyle}>
        <div style={priorityStyle}>
          <p>Priority: {task.priority}</p>
        </div>
        
        <div style={importantStyle}>
          {task.important ? (
            <FavoriteIcon color="error" onClick={handleToggleImportant} />
          ) : (
            <FavoriteBorderIcon onClick={handleToggleImportant} />
          )}
        </div>
      </div>
      <p style={descriptionStyle}>{task.description}</p>
      <div style={selectContainerStyle}>
        <select value={task.taskProgress} onChange={handleStatusChange} style={selectStyle}>
          <option value="not-started">Not Started</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      <div style={progressStyle}>
        <LinearProgress variant="determinate" value={task.progress} />
      </div>
    </div>
    </>
  );
}

export default TaskDisplay;
