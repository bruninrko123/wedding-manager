import react from 'react';
import type { Task, Membership, User, Category } from '../WorkspaceDashboard';
import styles from './TaskColumn.module.css';
// import styles from './TaskColumn.module.css';
import { TaskCard } from './taskCard';

interface TaskColumnProps {
    category: Category;
    tasks: Task[];
    memberships: Membership[];
    users: User[];
    OnAddTask: (categoryId: string) => void;
}

export function TaskColumn({ category, tasks, memberships, users, OnAddTask, OnCancelTask }: TaskColumnProps) {

    return (
      <div className={styles["task-column-background"]}>
        <h2>{category.name}</h2>
        {tasks
          .filter((task) => task.category === category.id)
          .map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              membership={memberships.find((m) => m.id === task.assignedTo)}
              user={users.find(
                (u) =>
                  u.id ===
                  memberships.find((m) => m.id === task.assignedTo)?.userId,
              )}
            />
          ))}

        {tasks.filter((task) => task.category === category.id ).length === 0 && (
          <p>No tasks in this category yet.</p>
        )}
        
        <button
          className={styles["add-task-btn"]}
          onClick={() => OnAddTask(category.id)}
        >
          + Add Task
        </button>
      </div>
    );
}