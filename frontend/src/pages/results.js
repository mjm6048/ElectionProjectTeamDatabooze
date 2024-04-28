import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ItemResult from '../components/itemresult';
function Results(props) {
    //databooze=# select * from materialized_ballotitem_positionvotes where ballotid=1;
 //ballotid | itemid | itemname  | itemtype | candidateid | firstname | lastname  | num_votes
  // Access the passed state containing the results
  const { state } = useLocation();
 const results = state.results.result;
 const usersvoted = state.results.status.usernames;
const votednum = usersvoted.length;
const percentage = votednum/parseInt(state.results.status.usernumber);

 const groupedResults = results.reduce((acc, result) => {
  if (!acc[result.itemid]) {
    acc[result.itemid] = [];
  }
  acc[result.itemid].push(result);
  return acc;
}, {});
  // Render the results
  return (
    <div>
      <h2>Results</h2>
       {Object.keys(groupedResults).map((id, index) => (
        <ItemResult key={index} data={groupedResults[id]} id ={groupedResults[id][0].itemname} />
      ))}
      <h2>Status</h2>
      <h3>Users that voted</h3>
      <ul>
        {usersvoted.map((user, index) => (
          <li key={index}>{user.username}</li>
        ))}
      </ul>
      <h3>Percentage: {percentage}%</h3>
  </div>
  );
}

export default Results;
