import React, { useState, useEffect } from 'react';
import { Button, Checkbox, FormControlLabel, TextField, Box } from '@mui/material';

interface Task {
  id: number;
  title: string;
  accomplished: boolean;
}

const TaskPage: React.FC = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState<Task>({
    id: 1,
    title: 'Sample Task',
    accomplished: false,
  });

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleEdit = () => {
    setIsEditing(true);
    // If you want to pre-populate the form with the existing task data, set the editedTask state here
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setEditedTask((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSave = () => {
    // You can perform save logic here
    // For now, let's just log the edited task
    console.log('Edited Task:', editedTask);

    setIsEditing(false);
  };

  useEffect(() => {
    // Perform any additional setup or cleanup here
  }, []);

  return (
    <Box sx={{ padding: 2 }}>
      <FormControlLabel
        control={
          <Checkbox
            checked={isChecked}
            onChange={handleCheckboxChange}
            color="primary"
          />
        }
        label="Task Completed"
      />

      {isEditing ? (
        <form>
          <TextField
            fullWidth
            margin="normal"
            name="title"
            label="Title"
            value={editedTask.title}
            onChange={handleInputChange}
            sx={{ marginBottom: 2 }}
          />

          <FormControlLabel
            control={
              <Checkbox
                name="accomplished"
                checked={editedTask.accomplished}
                onChange={handleCheckboxInputChange}
                color="primary"
              />
            }
            label="Accomplished"
          />

          <Button variant="contained" onClick={handleSave} sx={{ marginTop: 2 }}>
            Save
          </Button>
        </form>
      ) : (
        <>
          <h1>{editedTask.title}</h1>
          <Button onClick={handleEdit} sx={{ marginTop: 2 }}>
            Edit
          </Button>
        </>
      )}
    </Box>
  );
};

export default TaskPage;
