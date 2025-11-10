import React from 'react';
import BugCard from '../BugCard/BugCard';
import './BugList.css'

const BugList = ({ bugs, onUpdateBug, onDeleteBug, loading }) => {
  if (loading) {
    return <div className="loading">Loading bugs...</div>;
  }

  if (bugs.length === 0) {
    return (
      <div className="empty-state">
        <h3>No bugs reported yet</h3>
        <p>Be the first to report a bug!</p>
      </div>
    );
  }

  const openBugs = bugs.filter(bug => bug.status !== 'resolved');
  const resolvedBugs = bugs.filter(bug => bug.status === 'resolved');

  return (
    <div className="bug-list">
      {openBugs.length > 0 && (
        <section className="bug-section">
          <h2>Active Bugs ({openBugs.length})</h2>
          <div className="bugs-grid">
            {openBugs.map(bug => (
              <BugCard
                key={bug._id}
                bug={bug}
                onUpdate={onUpdateBug}
                onDelete={onDeleteBug}
              />
            ))}
          </div>
        </section>
      )}

      {resolvedBugs.length > 0 && (
        <section className="bug-section">
          <h2>Resolved Bugs ({resolvedBugs.length})</h2>
          <div className="bugs-grid">
            {resolvedBugs.map(bug => (
              <BugCard
                key={bug._id}
                bug={bug}
                onUpdate={onUpdateBug}
                onDelete={onDeleteBug}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default BugList;