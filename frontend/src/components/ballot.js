import '../index.css';
import { useNavigate, useLocation } from 'react-router-dom';

function Ballot({name, status, onVote, onViewResults, onViewStatus, onEdit, onView, disabled}) {
const roleid = localStorage.getItem('adroleid');
return (
  <div className = "ballot-box">
    <h3>{name}</h3>
    {status === 'active' && roleid < 3 && (
      <button onClick={onVote} disabled={disabled}>Vote</button>
    )}
    {(status === 'active' && roleid === 2) && (
      <>
        <button onClick={onVote} disabled={disabled}>Vote</button>
        <button onClick={onViewStatus}>View Status</button>
      </>
    )}
    {(status === 'active' && roleid > 1) && (
      <button onClick={onViewStatus}>View Status</button>
    )}
    {(status === 'completed' && roleid > 1 ) && (
      <button onClick={onViewResults}>View Results</button>
    )}
    {(status === 'not started' && roleid > 2) && (
      <button onClick={onEdit}>Edit</button>
    )}
    {(roleid > 2 && status != 'not started') && (
      <button onClick ={onView}>View</button>
    )}
     {(roleid > 2 && status == 'not started') && (
      <button onClick ={onView}>View and Edit Ballot Items</button>
    )} {(roleid < 3 && status == 'not started') && (
      <div> Not Started </div>
    )}

  </div>
);
}

export default Ballot;