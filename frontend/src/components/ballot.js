import '../index.css';
import { useNavigate, useLocation } from 'react-router-dom';

function Ballot({name, status, onVote, onViewResults, onViewStatus}) {

return (
  <div className = "ballot-box">
    <h3>{name}</h3>
    {status === 'active' && (
        <div>
          <button onClick={onVote}>Vote</button>
          <button onClick={onViewStatus}>View Status</button>
        </div>
      )}
    {status === 'completed' && (
        <button onClick={onViewResults}>View Results</button>
      )}
  </div>
);
}

export default Ballot;