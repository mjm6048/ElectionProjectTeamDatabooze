const navigate = useNavigate();


function Ballot() {
const handleViewResults = async (ballotID) => {
  try {
    // Make the API call with the ID parameter
    const response = await fetch(`https://databooze-dev.webdev.gccis.rit.edu/users/login/${ballotID}`);
    const data = await response.json();
    
    navigate('/results', {state: { results: data }});
  } catch (error) {
    console.error('Error fetching results:', error);
  }
};

const handleVote = async (ballotID) => {
    try {
      // Make the API call with the ID parameter
      const response = await fetch(`https://databooze-dev.webdev.gccis.rit.edu/ballots/${ballotID}`);
      const data = await response.json();
      
      navigate('/voting', {state: { ballots: data }});
    } catch (error) {
      console.error('Error fetching results:', error);
    }
  };

  const handleViewStatus = async (ballotID) => {
    try {
      // Make the API call with the ID parameter
      const response = await fetch(`https://databooze-dev.webdev.gccis.rit.edu/ballots/${ballotID}`);
      const data = await response.json();
      
      navigate('/status', {state: { status: data }});
    } catch (error) {
      console.error('Error fetching results:', error);
    }
  };
return (
  <div>
    <h2>BallotName</h2>
    <button onClick={() => handleVote(1)}>Vote</button>
    <button onClick={() => handleViewResults(1)}>View Results</button>
    <button onClick={() => handleViewStatus(1)}>View Status</button>
  </div>
);
}