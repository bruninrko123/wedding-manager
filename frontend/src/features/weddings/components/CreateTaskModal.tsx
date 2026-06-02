import React, { useState } from "react";
import styles from "./CreateTaskModal.module.css";

interface CreateTaskModalProps {
  isOpen: boolean;
  category: string;
  onClose: () => void;
  onSave: (
    title: string,
    description: string,
  ) => void;
}

export function CreateTaskModal({
  isOpen,
  onClose,
  onSave,
}: CreateTaskModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(
      title,
      description,
    );
    onClose();
  };

  return (
    <div
      className={`${styles["modal-overlay"]} ${isOpen ? styles["open"] : ""}`}
    >
      <div className={styles["modal-content"]}>
        <h2>Create New Task</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
                  </div>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
          <button type="submit">Create Task</button>
        </form>
      </div>
    </div>
  );
}
