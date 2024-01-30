import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

interface Task {
  id: number;
  title: string;
  completed: boolean;
  dueDate?: string;
  dueTime?: string;
}

export default function TaskTabs() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: 'Task 1', completed: false },
  ]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const handleRemoveTask = (taskId: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    if (editingTask?.id === taskId) {
      setEditingTask(null);
    }
  };

  const handleToggleTask = (taskId: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
  };

  const handleSaveTaskEdit = () => {
    if (editingTask) {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === editingTask.id
            ? { ...task, title: editingTask.title, dueDate: editingTask.dueDate, dueTime: editingTask.dueTime }
            : task
        )
      );
      setEditingTask(null);
    }
  };

  const handleCancelTaskEdit = () => {
    setEditingTask(null);
  };

  return (
    <Box sx={{ flexGrow: 1, display: 'flex', height: '100vh', position: 'relative' }}>
      <div>
        {tasks.map((task) => (
          <div key={task.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
            <Checkbox
              checked={task.completed}
              onChange={() => handleToggleTask(task.id)}
              sx={{ marginRight: '8px' }}
            />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              {editingTask?.id === task.id ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                  <FormControl sx={{ marginBottom: '8px', width: '100%' }}>
                    <InputLabel htmlFor={`edit-task-${task.id}-title`}></InputLabel>
                    <TextField
                      id={`edit-task-${task.id}-title`}
                      placeholder=""
                      value={editingTask.title}
                      onChange={(e) =>
                        setEditingTask((prev) => (prev ? { ...prev, title: e.target.value } : null))
                      }
                    />
                  </FormControl>
                  <FormControl sx={{ marginBottom: '8px', width: '100%' }}>
                    <InputLabel htmlFor={`edit-task-${task.id}-due-time`}></InputLabel>
                    <TextField
                      id={`edit-task-${task.id}-due-time`}
                      type="time"
                      placeholder=""
                      value={editingTask.dueTime || ''}
                      onChange={(e) =>
                        setEditingTask((prev) => (prev ? { ...prev, dueTime: e.target.value } : null))
                      }
                    />
                  </FormControl>
                  <FormControl sx={{ marginBottom: '8px', width: '100%' }}>
                    <InputLabel htmlFor={`edit-task-${task.id}-due-date`}></InputLabel>
                    <TextField
                      id={`edit-task-${task.id}-due-date`}
                      type="date"
                      placeholder=""
                      value={editingTask.dueDate || ''}
                      onChange={(e) =>
                        setEditingTask((prev) => (prev ? { ...prev, dueDate: e.target.value } : null))
                      }
                    />
                  </FormControl>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <Button onClick={handleSaveTaskEdit}>Save</Button>
                    <Button onClick={handleCancelTaskEdit}>Cancel</Button>
                  </Box>
                </div>
              ) : (
                <div>
                  <span style={{ fontSize: '1rem', marginRight: '8px' }}>{task.title}</span>
                  {task.dueDate && (
                    <Typography variant="caption" sx={{ fontSize: '0.8rem', marginTop: '4px' }}>
                      Due: {new Date(task.dueDate).toLocaleDateString()}
                    </Typography>
                  )}
                  {task.dueTime && (
                    <Typography variant="caption" sx={{ fontSize: '0.8rem', marginTop: '4px' }}>
                      Time: {task.dueTime}
                    </Typography>
                  )}
                  <Button onClick={() => handleEditTask(task)} sx={{ marginLeft: '8px' }}>Edit</Button>
                  <Button
                    onClick={() => handleRemoveTask(task.id)}
                    variant="outlined"
                    color="error"
                    sx={{ marginLeft: '8px' }}
                  >
                    Remove
                  </Button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </Box>
  );
}

