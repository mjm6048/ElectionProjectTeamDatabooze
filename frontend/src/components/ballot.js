import '../index.css';
import { useNavigate, useLocation } from 'react-router-dom';

function Ballot({name, isActive, onVote, onViewResults}) {

return (
  <div className = "ballot-box">
    <h3>{name}</h3>
    {isActive ? (
    <button onClick={onVote}>Vote</button>
    ):(
    <button onClick={onViewResults}>View Results</button>
    )
  }
  </div>
);
}

export default Ballot;