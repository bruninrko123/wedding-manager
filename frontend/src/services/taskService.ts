import type { Task, CreateTaskPayload } from "../features/weddings/WorkspaceDashboard";

class TaskService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = "http://127.0.0.1:8000/api/";
  }

  async getTasks() {
    try {
      const response = await fetch(this.baseUrl + "tasks/");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching tasks:", error);
      throw error;
    }
  }

  async createTask(taskData: CreateTaskPayload): Promise<Task> {
    try {
      const response = await fetch(this.baseUrl + "tasks/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error creating task:", error);
      throw error;
    }
    }
    

    async getCategories(activeWeddingId: number) {
      try {
        const response = await fetch(`${this.baseUrl}categories/?weddingId=${activeWeddingId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Error fetching categories:", error);
        throw error;
      }
    }

    async createCategory(categoryName: string, weddingId: number) {
      try {
        const response = await fetch(this.baseUrl + "categories/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: categoryName, wedding: weddingId }),
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Error creating category:", error);
        throw error;
      }
    }

}
export const taskService = new TaskService();
