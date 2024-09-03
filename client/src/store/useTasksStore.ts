import { create } from 'zustand';
import { Task, tasksState, User } from '../types/types';

export const useTasksStore = create<tasksState>((set) => ({
  user: null,

  userData: async (email) => {
    try {
      const response = await fetch(`http://localhost:3000/users/email?email=${email}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('User not found');
      }

      const data: User = await response.json();

      set({ user: data });
    } catch (error) {
      console.error(error);
    }
  },

  addTask: async (id, title) => {
    const response = await fetch('http://localhost:3000/tasks/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id, title })
    });
    if (!response.ok) {
      throw new Error('User not found');
    }

    const newTask: Task = await response.json();

    set((state) => {
      if (state.user) {
        return {
          user: {
            ...state.user,
            tasks: [...state.user.tasks, newTask]
          }
        };
      }
      return state;
    });

  },
  deleteTask: async (userId, taskId) => {
    const response = await fetch('http://localhost:3000/tasks/delete', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userId, taskId })
    });
    if (!response) {
      throw new Error('Error');
    }
    const actualTasks: User = await response.json();
    set((state) => {
      if (state.user) {
        return {
          user: {
            ...state.user,
            tasks: [...actualTasks.tasks]
          }
        };
      }
      return state;
    });

  },
  updateCheck: async (userId, taskId) => {
    const response = await fetch('http://localhost:3000/tasks/update', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userId, taskId })
    });
    if (!response) {
      throw new Error('Error');
    }
    const actualTasks: User = await response.json();
    set((state) => {
      if (state.user) {
        return {
          user: {
            ...state.user,
            tasks: [...actualTasks.tasks]
          }
        };
      }
      return state;
    });

  },
  addSubTask: async (userId, taskId, title) => {
    const response = await fetch('http://localhost:3000/sub-tasks/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userId, taskId, title })
    });
    if (!response.ok) {
      throw new Error('User not found');
    }
    const newTasks: Task[] = await response.json();

    set((state) => {
      if (state.user) {
        return {
          user: {
            ...state.user,
            tasks: newTasks
          }
        };
      }
      return state;
    });

  },
  deleteSubTask: async (userId, taskId, subTaskId) => {
    const response = await fetch('http://localhost:3000/sub-tasks/remove', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userId, taskId, subTaskId })
    });
    if (!response.ok) {
      throw new Error('Response Error Not Found');
    }

    const newTasks: Task[] = await response.json();

    set((state) => {
      if (state.user) {
        return {
          user: {
            ...state.user,
            tasks: newTasks
          }
        };

      }
      return state;

    });
  },
  updateCheckSubTask: async (userId, taskId, subTaskId) => {
    const response = await fetch('http://localhost:3000/sub-tasks/update', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userId, taskId, subTaskId })
    });
    if (!response.ok) {
      throw new Error('Response Error');
    }
    const newTasks: Task[] = await response.json();

    set((state) => {
      if (state.user) {
        return {

          user: {
            ...state.user,
            tasks: newTasks
          }
        };
      }
      return state;
    });

  }

}));