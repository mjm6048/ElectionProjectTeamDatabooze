import React from 'react';
import axios from 'axios';

export default class AmericanDreamCreateCandidate extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            titles: '',
            candidateDescription: '',
            photo: '',
            clicked: false
        };
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        // Call the post endpoint with all necessary data in order to create a new Candidate.
        alert(" This should make a POST request with the data from this.state");
        // try {
        //     const response = await axios.post("http://localhost:5001/create-candidate", this.state);
        //     console.log(response.data);
        //     // Handle success
        // } catch(error) {
        //     console.error("Error encountered while creating candidate:", error);
        //     // Handle error
        // }
    }

    handleCancel = () => {
        this.setState({
            firstName: '',
            lastName: '',
            titles: '',
            candidateDescription: '',
            photo: '',
            clicked: false
        });
    }

    render(){
        const { firstName, lastName, titles, candidateDescription, photo, clicked } = this.state;
        if (!clicked) {
            return <button onClick={() => this.setState({ clicked: true })}>Create New Candidate</button>;
        }

        return (
            <>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="firstName">First Name:</label>
                    <input type="text" id="firstName" name="firstName" value={firstName} onChange={this.handleChange} /><br /><br />
                    
                    <label htmlFor="lastName">Last Name:</label>
                    <input type="text" id="lastName" name="lastName" value={lastName} onChange={this.handleChange} /><br /><br />
                    
                    <label htmlFor="titles">Titles:</label>
                    <input type="text" id="titles" name="titles" value={titles} onChange={this.handleChange} /><br /><br />
                    
                    <label htmlFor="candidateDescription">Candidate Description:</label>
                    <textarea id="candidateDescription" name="candidateDescription" value={candidateDescription} onChange={this.handleChange}></textarea><br /><br />
                    
                    <label htmlFor="photo">Photo URL:</label>
                    <input type="text" id="photo" name="photo" value={photo} onChange={this.handleChange} /><br /><br />

                    <input type="submit" value="Submit" />
                    <button type="button" onClick={this.handleCancel}>Cancel</button>
                </form>
            </>
        );
    }
}
