    import React, { useState } from 'react';
    import type { Task, Membership, User } from '../WorkspaceDashboard';
    import styles from './TaskCard.module.css';
    interface TaskCardProps {
        task: Task;
        membership: Membership | undefined;
        user: User | undefined;
    }

export function TaskCard({ task, membership, user }: TaskCardProps) {
        

    const displayStatus = task.status === 'in-progress' ? 'In Progress' : task.status;
        return (
            
            <div className={styles['task-card']}>
            {/* Top row containing date and mockup metrics */}
            <div className={styles['card-header']}>
                <span className={styles['date-text']}>DD/MM/YYYY</span>
                <div className={styles['metrics']}>
                    <span>↳ 2</span> <span>📎 1</span> <span>💬 3</span>
                </div>
            </div>

            {/* Status Pill Row */}
            <div className={styles['status-row']}>
                <span className={`${styles['status-chip']} ${styles[task.status]}`}>
                    {displayStatus}
                </span>
            </div>

            {/* Main Title and Category Body */}
            <div className={styles['card-body']}>
                <span className={styles['category-tag']}>PRE-PLANNING</span>
                <h3 className={styles['task-title']}>{task.title}</h3>
            </div>

            {/* Divider rule and bottom layout assignee info */}
            <div className={styles['card-footer']}>
                <span className={styles['assignee-text']}>
                    👤 {user ? user.name : 'Unassigned'}
                </span>
            </div>
            
            {/* Standard menu context icon button on the right edge */}
            <button className={styles['menu-dots-btn']}>⋮</button>
        </div>
    );
        


    }