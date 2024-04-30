import React from 'react';
import axios from 'axios';
import AmericanDreamCreateCandidate from './AmericanDreamCreateCandidate'; // Import the AmericanDreamCreateCandidate component

export default class AmericanDreamCreateBallot extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            // itemID: '',
            itemName: '',
            itemType: 'initiative',
            numVotesAllowed: '',
            maxNumCandidates: '',
            clicked: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }

    async handleSubmit(event) {
        event.preventDefault();
        // Call the post endpoint with all necessary data in order to create a new Ballot.
        alert("Nothing is happening yet, you just submitted");
        // try {
        //     const response = await axios.post("http://localhost:5001/create-ballot", this.state);
        //     console.log(response.data);
        //     // Handle success
        // } catch(error) {
        //     console.error("Error encountered while creating ballot:", error);
        //     // Handle error
        // }
    }

    handleCancel() {
        // Set clicked state back to false
        this.setState({ clicked: false });
    }

    render(){
        const { //itemID, 
            itemName, itemType, numVotesAllowed, maxNumCandidates, clicked } = this.state;
        if (!clicked) {
            return <button onClick={() => this.setState({ clicked: true })}>Create New Ballot</button>;
        }

        return (
            <>
                <form onSubmit={this.handleSubmit}>
                    {/*
                    <label htmlFor="itemID">Item ID:</label>
                    <input type="number" id="itemID" name="itemID" value={itemID} onChange={this.handleChange} /><br /><br />
                    */}
                    <label htmlFor="itemName">Item Name:</label>
                    <input type="text" id="itemName" name="itemName" value={itemName} onChange={this.handleChange} /><br /><br />
                    
                    <label htmlFor="itemType">Item Type:</label>
                    <select id="itemType" name="itemType" value={itemType} onChange={this.handleChange}>
                        <option value="initiative">Initiative</option>
                        <option value="position">Position</option>
                    </select><br /><br />
                    
                    <label htmlFor="numVotesAllowed">Number of Votes Allowed:</label>
                    <input type="number" id="numVotesAllowed" name="numVotesAllowed" value={numVotesAllowed} onChange={this.handleChange} /><br /><br />
                    
                    <label htmlFor="maxNumCandidates">Max Number of Candidates:</label>
                    <input type="number" id="maxNumCandidates" name="maxNumCandidates" value={maxNumCandidates} onChange={this.handleChange} /><br /><br />

                    <input type="submit" value="Submit" />
                    <button type="button" onClick={this.handleCancel}>Cancel</button> {/* Cancel button */}
                </form>
                
                {/* Conditionally render AmericanDreamCreateCandidate if itemType is "position" */}
                {itemType === 'position' && <AmericanDreamCreateCandidate />}
            </>
        )
    }
}
