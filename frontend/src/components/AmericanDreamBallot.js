import React from 'react';
import axios from 'axios';
import CandidateClass from './CandidateClass';
import AmericanDreamCreateCandidate from './AmericanDreamCreateCandidate';

export default class AmericanDreamBallot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemID: props.itemID,
      itemName: props.itemName,
      itemType: props.itemType,
      numVotesAllowed: props.numVotesAllowed,
      maxNumCandidates: props.maxNumCandidates,
      ballotID: props.ballotID,
      isEditable: false,
      candidates: [],
    };
  }

  async componentDidMount() {
    const { itemType, itemID } = this.state;
    // Check if itemType is "position"
    if (itemType === "position") {
      try {
        // Fetch candidates from the endpoint
        const token = localStorage.getItem("adtoken");
        const response = await axios.get("http://localhost:5001/ballotitem/candidates", {
          headers: { "Authorization": `Bearer ${token}` },
          params: { "itemID": itemID }
        });
        console.log(response.data);
        // Update state with fetched candidates
        this.setState({ candidates: response.data });
      } catch (error) {
        console.error("Error fetching candidates:", error);
      }
    }
  }

  // Function to handle form input change
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  // Function to toggle edit mode
  toggleEdit = () => {
    this.setState((prevState) => ({
      isEditable: !prevState.isEditable,
    }));
  };

  // Function to handle form submission
  handleSubmit = (event) => {
    event.preventDefault();
    // Perform any necessary actions here
    console.log('Form submitted:', this.state);
    // Call function within the component (example)
    // this.someFunction();
  };

  render() {
    const { itemID, itemName, itemType, numVotesAllowed, maxNumCandidates, isEditable, candidates } = this.state;
    return (
      <>
        <form onSubmit={this.handleSubmit}>
          {/* Display existing information in input fields */}
          <label htmlFor="itemID"><b>Ballot ID:</b></label>
          <input type="number" id="itemID" name="itemID" value={itemID} onChange={this.handleChange} readOnly={!isEditable} />
          <br />
          <label htmlFor="itemName">Item Name:</label>
          <input type="text" id="itemName" name="itemName" value={itemName} onChange={this.handleChange} readOnly={!isEditable} />
          <br />
          <label htmlFor="itemType">Item Type:</label>
          <select id="itemType" name="itemType" value={itemType} onChange={this.handleChange} disabled={!isEditable}>
            <option value="initiative">Initiative</option>
            <option value="position">Position</option>
          </select>
          <br />
          <label htmlFor="numVotesAllowed">Number of Votes Allowed:</label>
          <input type="number" id="numVotesAllowed" name="numVotesAllowed" value={numVotesAllowed} onChange={this.handleChange} readOnly={!isEditable} />
          <br />
          <label htmlFor="maxNumCandidates">Max Number of Candidates:</label>
          <input type="number" id="maxNumCandidates" name="maxNumCandidates" value={maxNumCandidates} onChange={this.handleChange} readOnly={!isEditable} />
          <br />
        </form>
        <div>
        {isEditable ? (
          <button type="submit" onClick={this.handleSubmit}>Submit</button>
        ) : (
          <button type="button" onClick={this.toggleEdit}>Edit Ballot</button>
        )}
        {/* Cancel button */}
        {isEditable && (
          <button type="button" onClick={this.toggleEdit}>Cancel</button>
        )}
          {/* Render candidates if itemType is "position" */}
          {itemType === "position" && (
            <div>
              <h3>Candidates:</h3>
              <hr />
              {
                candidates.map((candidate, index ) => (
                  <div key={index}>
                    <CandidateClass 
                      candidateID={candidate.candidateid}
                      firstName={candidate.firstname}
                      lastName={candidate.lastname}
                      titles={candidate.titles}
                      photo={candidate.photo}
                      candidateDescription={candidate.candidatedescription}
                    />
                    <hr />
                  </div>
                ))
              }
              <AmericanDreamCreateCandidate />
            </div>
          )}
        </div>
        {/* Edit button */}
        
      </>
    );
  }
}
