
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

interface Task {
  id: number;
  title: string;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function TaskTabs() {
  const [value, setValue] = React.useState(0);
  const [tasks, setTasks] = React.useState<Record<number, Task[]>>({
    0: [{ id: 1, title: 'Task 1' }],
  });
  const [newTaskTitle, setNewTaskTitle] = React.useState('');
  const [editingTaskId, setEditingTaskId] = React.useState<number | null>(null);
  const [editedTaskTitle, setEditedTaskTitle] = React.useState('');

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    setEditingTaskId(null);
  };

  const handleAddTask = () => {
    const updatedTasks = { ...tasks };
    const newTaskId = updatedTasks[value]?.length ? updatedTasks[value][updatedTasks[value].length - 1].id + 1 : 1;
    updatedTasks[value] = [...(updatedTasks[value] || []), { id: newTaskId, title: newTaskTitle }];
    setTasks(updatedTasks);
    setNewTaskTitle('');
  };

  const handleRemoveTask = (taskId: number) => {
    const updatedTasks = { ...tasks };
    updatedTasks[value] = (updatedTasks[value] || []).filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const handleEditTask = (taskId: number, title: string) => {
    setEditingTaskId(taskId);
    setEditedTaskTitle(title);
  };

  const handleSaveTaskEdit = () => {
    const updatedTasks = { ...tasks };
    updatedTasks[value] = (updatedTasks[value] || []).map((task) =>
      task.id === editingTaskId ? { ...task, title: editedTaskTitle } : task
    );
    setTasks(updatedTasks);
    setEditingTaskId(null);
  };

  const handleCancelTaskEdit = () => {
    setEditingTaskId(null);
    setEditedTaskTitle('');
  };

  const handleAddTab = () => {
    const updatedTasks = { ...tasks };
    updatedTasks[value + 1] = [];
    setTasks(updatedTasks);
  };

  const handleRemoveTab = () => {
    if (value !== 0) {
      const updatedTasks = { ...tasks };
      delete updatedTasks[value];
      setTasks(updatedTasks);
      setValue(value - 1);
    }
  };

  return (
    <Box sx={{ flexGrow: 1, display: 'flex', height: '100vh', position: 'relative' }}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider' }}
      >
        {Object.keys(tasks).map((index) => (
          <Tab key={index} label={`Item ${Number(index) + 1}`} {...a11yProps(Number(index))} />
        ))}
      </Tabs>
      <TabPanel value={value} index={value}>
        <div>
          {tasks[value]?.map((task) => (
            <div key={task.id}>
              {editingTaskId === task.id ? (
                <div>
                  <TextField
                    label="Edit Task"
                    value={editedTaskTitle}
                    onChange={(e) => setEditedTaskTitle(e.target.value)}
                  />
                  <Button onClick={handleSaveTaskEdit}>Save</Button>
                  <Button onClick={handleCancelTaskEdit}>Cancel</Button>
                </div>
              ) : (
                <div>
                  {task.title}
                  <Button onClick={() => handleEditTask(task.id, task.title)}>Edit</Button>
                  <Button onClick={() => handleRemoveTask(task.id)}>Remove</Button>
                </div>
              )}
            </div>
          ))}
        </div>
        <TextField
          label="New Task"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
        />
        <Button onClick={handleAddTask}>Add Task</Button>
      </TabPanel>
      <Button
        onClick={handleAddTab}
        sx={{ position: 'absolute', top: 0, right: 120 }}
      >
        Add Tab
      </Button>
      <Button
        onClick={handleRemoveTab}
        sx={{ position: 'absolute', top: 0, right: 0 }}
      >
        Remove Tab
      </Button>
    </Box>
  );
}
