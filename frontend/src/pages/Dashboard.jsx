// import React, { useState, useEffect } from 'react';
// import BugForm from '../components/BugForm/BugForm';
// import BugList from '../components/BugList/BugList';
// import { bugService } from '../services/api';
// import './Dashboard.css';

// const Dashboard = () => {
//   const [bugs, setBugs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     fetchBugs();
//   }, []);

//   const fetchBugs = async () => {
//     try {
//       setLoading(true);
//       const response = await bugService.getAllBugs();
//       // ADD SAFETY CHECK HERE
//       setBugs(Array.isArray(response?.data) ? response.data.data : []);
//       setError('');
//       console.log(response.data.data)
//     } catch (err) {
//       setError('Failed to fetch bugs. Please try again.');
//       console.error('Error fetching bugs:', err);
//       // Ensure bugs is always an array, even on error
//       setBugs([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCreateBug = async (bugData) => {
//     try {
//       const response = await bugService.createBug(bugData);
//       setBugs(prev => [response.data, ...(Array.isArray(prev) ? prev : [])]);
//       setError('');
//     } catch (err) {
//       setError('Failed to create bug. Please try again.');
//       console.error('Error creating bug:', err);
//     }
//   };

//   const handleUpdateBug = async (bugId, updateData) => {
//     try {
//       const response = await bugService.updateBug(bugId, updateData);
//       setBugs(prev => 
//         (Array.isArray(prev) ? prev : []).map(bug => 
//           bug._id === bugId ? response.data : bug
//         )
//       );
//       setError('');
//     } catch (err) {
//       setError('Failed to update bug. Please try again.');
//       console.error('Error updating bug:', err);
//     }
//   };

//   const handleDeleteBug = async (bugId) => {
//     if (!window.confirm('Are you sure you want to delete this bug?')) {
//       return;
//     }

//     try {
//       await bugService.deleteBug(bugId);
//       setBugs(prev => (Array.isArray(prev) ? prev : []).filter(bug => bug._id !== bugId));
//       setError('');
//     } catch (err) {
//       setError('Failed to delete bug. Please try again.');
//       console.error('Error deleting bug:', err);
//     }
//   };

//   // FIX THE STATS CALCULATION - ADD SAFETY CHECK
//   const safeBugs = Array.isArray(bugs) ? bugs : [];
//   const stats = {
//     total: bugs.length,
//     open: bugs.filter(bug => bug.status === 'open').length,
//     inProgress: bugs.filter(bug => bug.status === 'in-progress').length,
//     resolved: bugs.filter(bug => bug.status === 'resolved').length,
//   };
//   console.log(stats)

//   return (
//     <div className="dashboard">
//       <header className="dashboard-header">
//         <h1>Bug Tracker</h1>
//         <p>Track and manage software issues efficiently</p>
//       </header>

//       {error && (
//         <div className="error-message">
//           {error}
//           <button onClick={() => setError('')} className="close-error">×</button>
//         </div>
//       )}

//       <div className="stats-grid">
//         <div className="stat-card total">
//           <h3>Total Bugs</h3>
//           <span className="stat-number">{stats.total}</span>
//         </div>
//         <div className="stat-card open">
//           <h3>Open</h3>
//           <span className="stat-number">{stats.open}</span>
//         </div>
//         <div className="stat-card in-progress">
//           <h3>In Progress</h3>
//           <span className="stat-number">{stats.inProgress}</span>
//         </div>
//         <div className="stat-card resolved">
//           <h3>Resolved</h3>
//           <span className="stat-number">{stats.resolved}</span>
//         </div>
//       </div>

//       <div className="dashboard-content">
//         <div className="form-section">
//           <BugForm onSubmit={handleCreateBug} />
//         </div>
        
//         <div className="list-section">
//           <BugList
//             bugs={safeBugs}
//             onUpdateBug={handleUpdateBug}
//             onDeleteBug={handleDeleteBug}
//             loading={loading}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;


import React, { useState, useEffect } from 'react';
import BugForm from '../components/BugForm/BugForm';
import BugList from '../components/BugList/BugList';
import { bugService } from '../services/api';
import './Dashboard.css';

const Dashboard = () => {
  const [bugs, setBugs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBugs();
  }, []);

  const fetchBugs = async () => {
    try {
      setLoading(true);
      const response = await bugService.getAllBugs();
      console.log('🔍 Full API Response:', response);
      console.log('📦 Response data:', response?.data);
      console.log('🐛 Bugs array:', response?.data?.data);
      
      // FIX: Use response.data.data (nested data property)
      setBugs(Array.isArray(response?.data?.data) ? response.data.data : []);
      setError('');
    } catch (err) {
      setError('Failed to fetch bugs. Please try again.');
      console.error('Error fetching bugs:', err);
      // Ensure bugs is always an array, even on error
      setBugs([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateBug = async (bugData) => {
    try {
      console.log('📤 Sending bug data to backend:', bugData);
      const response = await bugService.createBug(bugData);
      console.log('✅ Backend response:', response);
      console.log('✅ Created bug data:', response?.data?.data);
      
      // FIX: Use response.data.data (nested data property)
      setBugs(prev => [response.data.data, ...(Array.isArray(prev) ? prev : [])]);
      setError('');
    } catch (err) {
      setError('Failed to create bug. Please try again.');
      console.error('Error creating bug:', err);
      console.error('Error response data:', err.response?.data);
    }
  };

  const handleUpdateBug = async (bugId, updateData) => {
    try {
      console.log('📝 Updating bug:', bugId, updateData);
      const response = await bugService.updateBug(bugId, updateData);
      console.log('✅ Update response:', response);
      console.log('✅ Updated bug data:', response?.data?.data);
      
      // FIX: Use response.data.data (nested data property)
      setBugs(prev => 
        (Array.isArray(prev) ? prev : []).map(bug => 
          bug._id === bugId ? response.data.data : bug
        )
      );
      setError('');
    } catch (err) {
      setError('Failed to update bug. Please try again.');
      console.error('Error updating bug:', err);
      console.error('Error response data:', err.response?.data);
    }
  };

  const handleDeleteBug = async (bugId) => {
    if (!window.confirm('Are you sure you want to delete this bug?')) {
      return;
    }

    try {
      console.log('🗑️ Deleting bug:', bugId);
      await bugService.deleteBug(bugId);
      setBugs(prev => (Array.isArray(prev) ? prev : []).filter(bug => bug._id !== bugId));
      setError('');
    } catch (err) {
      setError('Failed to delete bug. Please try again.');
      console.error('Error deleting bug:', err);
      console.error('Error response data:', err.response?.data);
    }
  };

  // FIX: Use safeBugs for stats calculation
  const safeBugs = Array.isArray(bugs) ? bugs : [];
  const stats = {
    total: safeBugs.length,
    open: safeBugs.filter(bug => bug.status === 'open').length,
    inProgress: safeBugs.filter(bug => bug.status === 'in-progress').length,
    resolved: safeBugs.filter(bug => bug.status === 'resolved').length,
  };

  console.log('📊 Current stats:', stats);
  console.log('🐛 Current bugs:', safeBugs);

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Bug Tracker</h1>
        <p>Track and manage software issues efficiently</p>
      </header>

      {error && (
        <div className="error-message">
          {error}
          <button onClick={() => setError('')} className="close-error">×</button>
        </div>
      )}

      <div className="stats-grid">
        <div className="stat-card total">
          <h3>Total Bugs</h3>
          <span className="stat-number">
            {loading ? '...' : stats.total}
          </span>
        </div>
        <div className="stat-card open">
          <h3>Open</h3>
          <span className="stat-number">
            {loading ? '...' : stats.open}
          </span>
        </div>
        <div className="stat-card in-progress">
          <h3>In Progress</h3>
          <span className="stat-number">
            {loading ? '...' : stats.inProgress}
          </span>
        </div>
        <div className="stat-card resolved">
          <h3>Resolved</h3>
          <span className="stat-number">
            {loading ? '...' : stats.resolved}
          </span>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="form-section">
          <BugForm onSubmit={handleCreateBug} />
        </div>
        
        <div className="list-section">
          <BugList
            bugs={safeBugs}
            onUpdateBug={handleUpdateBug}
            onDeleteBug={handleDeleteBug}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;