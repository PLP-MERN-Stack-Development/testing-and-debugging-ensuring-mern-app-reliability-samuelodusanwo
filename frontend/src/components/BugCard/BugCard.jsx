import React, { useState } from 'react';
import './BugCard.css';

const BugCard = ({ bug, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    status: bug.status,
    assignee: bug.assignee,
    priority: bug.priority
  });

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onUpdate(bug._id, editForm);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditForm({
      status: bug.status,
      assignee: bug.assignee,
      priority: bug.priority
    });
    setIsEditing(false);
  };

  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'high': return 'priority-high';
      case 'medium': return 'priority-medium';
      case 'low': return 'priority-low';
      default: return 'priority-medium';
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'open': return 'status-open';
      case 'in-progress': return 'status-in-progress';
      case 'resolved': return 'status-resolved';
      default: return 'status-open';
    }
  };

  return (
    <div className={`bug-card ${getPriorityClass(bug.priority)}`}>
      <div className="bug-header">
        <h3 className="bug-title">{bug.title}</h3>
        <div className="bug-actions">
          <button 
            className="btn-edit"
            onClick={() => setIsEditing(!isEditing)}
          >
            Edit
          </button>
          <button 
            className="btn-delete"
            onClick={() => onDelete(bug._id)}
          >
            Delete
          </button>
        </div>
      </div>

      <p className="bug-description">{bug.description}</p>

      <div className="bug-meta">
        <div className="meta-item">
          <strong>Status:</strong>
          {isEditing ? (
            <select
              name="status"
              value={editForm.status}
              onChange={handleEditChange}
              className={getStatusClass(editForm.status)}
            >
              <option value="open">Open</option>
              <option value="in-progress">In Progress</option>
              <option value="resolved">Resolved</option>
            </select>
          ) : (
            <span className={`status-badge ${getStatusClass(bug.status)}`}>
              {bug.status}
            </span>
          )}
        </div>

        <div className="meta-item">
          <strong>Priority:</strong>
          {isEditing ? (
            <select
              name="priority"
              value={editForm.priority}
              onChange={handleEditChange}
              className={getPriorityClass(editForm.priority)}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          ) : (
            <span className={`priority-badge ${getPriorityClass(bug.priority)}`}>
              {bug.priority}
            </span>
          )}
        </div>

        <div className="meta-item">
          <strong>Reporter:</strong>
          <span>{bug.reporter}</span>
        </div>

        <div className="meta-item">
          <strong>Assignee:</strong>
          {isEditing ? (
            <input
              type="text"
              name="assignee"
              value={editForm.assignee}
              onChange={handleEditChange}
              placeholder="Unassigned"
            />
          ) : (
            <span>{bug.assignee || 'Unassigned'}</span>
          )}
        </div>

        <div className="meta-item">
          <strong>Created:</strong>
          <span>{new Date(bug.createdAt).toLocaleDateString()}</span>
        </div>
      </div>

      {isEditing && (
        <div className="edit-actions">
          <button className="btn-save" onClick={handleSave}>
            Save
          </button>
          <button className="btn-cancel" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default BugCard;