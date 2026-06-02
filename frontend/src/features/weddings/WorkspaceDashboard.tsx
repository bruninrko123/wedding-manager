import React, { useState, useEffect } from "react";
import { TaskColumn } from "./components/taskColumn";
import { CreateTaskModal } from "./components/CreateTaskModal";
import { taskService } from "../../services/taskService";

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface Wedding {
  id: number;
  name: string;
  date: string;
  location: string;
}

export interface Membership {
  id: number;
  wedding: number;
  userId: number;
  role: string;
}

export interface Category {
  id: string;
  name: string;
  wedding: number;
}

export interface Task {
  id: string;
  wedding: number;
  title: string;
  description: string;
  assigned_to: number | null; // membership id
  status: "pending" | "in_progress" | "completed";
  created_at: string;
  updated_at: string;
  user: number;
  category: string | null;
  category_name?: string;
}
export type CreateTaskPayload = Omit<Task, "id" | "created_at" | "updated_at">;

export interface TaskForm {
  title: string;
  description: string;
  assigned_to: number | null;
}

export function WorkspaceDashboard() {
  const [activeWeddingId, setActiveWeddingId] = useState<number>(1);

  const [memberships, setMemberships] = useState<Membership[]>([]);

  const [tasks, setTasks] = useState<Task[]>([]);

  //form inputs
  const [newTaskTitle, setNewTaskTitle] = useState<string>("");
  const [newTaskDescription, setNewTaskDescription] = useState<string>("");
  const [newTaskAssignedTo, setNewTaskAssignedTo] = useState<number | null>(
    null,
  );
  const [newTaskStatus, setNewTaskStatus] = useState<
    "pending" | "in_progress" | "completed"
  >("pending");

  const [activeModalCategory, setActiveModalCategory] = useState<string | null>(
    null,
  );

  //array of categories created by the user
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategory, setNewCategory] = useState<string>("");

  //Fetch initial data
  useEffect(() => {
    const loadDatabaseTasks = async () => {
      try {
        const [fetchedTasks, fetchedCategories] = await Promise.all([
          taskService.getTasks(),
          taskService.getCategories(activeWeddingId),
        ]);
        setTasks(fetchedTasks);
        setCategories(fetchedCategories);
      } catch (error) {
        console.error("Error loading tasks or categories:", error);
      }
    };
    loadDatabaseTasks();
  }, [activeWeddingId]);

  const handleAddCategory = async () => {
    if (!newCategory.trim()) return; // prevent adding empty category
    if (
      categories.some(
        (cat) => cat.name.toLowerCase() === newCategory.trim().toLowerCase(),
      )
    )
      return;

    try {
      const createCategory = await taskService.createCategory(
        newCategory,
        activeWeddingId,
      );
      setCategories((prev) => [...prev, createCategory]);
      setNewCategory("");
    } catch (error) {
      console.error("Error creating category:", error);
    }
  };

  const GLOABAL_USERS: User[] = [
    { id: 1, name: "Alice", email: "alice@example.com" },
    { id: 2, name: "Bob", email: "bob@example.com" },
  ];

  const getWeddingTasks = (): Task[] => {
    return tasks.filter((task) => task.wedding === activeWeddingId);
  };

  const getWeddingMembers = (): Membership[] => {
    return memberships.filter(
      (membership) => membership.wedding === activeWeddingId,
    );
  };

  const handleSaveTask = async (taskForm: TaskForm): Promise<void> => {
    // Implementation for saving the new task

console.log("Value of activeModalCategory at save time:", activeModalCategory);

    const newTaskPayload: CreateTaskPayload = {
      wedding: activeWeddingId,
      title: taskForm.title,
      description: taskForm.description,
      assigned_to: taskForm.assigned_to,
      status: newTaskStatus,
      user: 1, // Assuming the user ID is 1 for now
      category: activeModalCategory || "unassigned",
    };

    try {
      const savedTaskFormDB = await taskService.createTask(newTaskPayload);

      setTasks((prev) => [...prev, savedTaskFormDB]);
      setNewTaskTitle("");
      setNewTaskDescription("");
      setNewTaskAssignedTo(null);
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };

  const currentWeddingMemberships = getWeddingMembers();
  const currentWeddingTasks = getWeddingTasks();

  return (
    <div className="workspace-dashboard">
      <h1>Wedding Workspace Dashboard</h1>
      <div className="wedding-selector">
        <button
          onClick={() => setActiveWeddingId(1)}
          className={activeWeddingId === 1 ? "active" : ""}
        >
          Wedding 1
        </button>
        <button
          onClick={() => setActiveWeddingId(2)}
          className={activeWeddingId === 2 ? "active" : ""}
        >
          Wedding 2
        </button>
      </div>

      {/* Add New Category Bar */}
      <div
        className="add-category-bar"
        style={{ marginTop: "20px", justifySelf: "end", marginRight: "5%" }}
      >
        <input
          type="text"
          placeholder="New category..."
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />
        <button onClick={handleAddCategory}>Add Category</button>
      </div>

      {/* Horizontal kaban with categories as columns. */}
      <div
        className="kaban-board"
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: "20px",
          maxWidth: "90%",
        }}
      >
        {categories.map((category) => (
          <TaskColumn
            key={category.id}
            category={category}
            tasks={currentWeddingTasks}
            memberships={currentWeddingMemberships}
            users={GLOABAL_USERS}
            OnAddTask={(category) => setActiveModalCategory(category)}
          />
        ))}

        {/* New task form */}
        {activeModalCategory && (
          <CreateTaskModal
            isOpen={!!activeModalCategory}
            category={activeModalCategory}
            onClose={() => setActiveModalCategory(null)}
            onSave={(title, description) =>
              handleSaveTask({ title, description, assigned_to: null })
            }
          />
        )}
      </div>
    </div>
  );
}
