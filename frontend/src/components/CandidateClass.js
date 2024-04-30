import React from 'react';

export default class CandidateClass extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            candidateID: props.candidateID,
            firstName: props.firstName,
            lastName: props.lastName,
            titles: props.titles,
            candidateDescription: props.candidateDescription,
            photo: props.photo,
            isEditable: false // Flag to track if form is editable
        };
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
        const { candidateID, firstName, lastName, titles, candidateDescription, photo, isEditable } = this.state;
        return (
            <div>
                <h3>Candidate {candidateID}</h3>
                {/* Editable form */}
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="firstName">First Name:</label>
                    <input type="text" id="firstName" name="firstName" value={firstName} readOnly={!isEditable} onChange={this.handleChange} />
                    <br />
                    <label htmlFor="lastName">Last Name:</label>
                    <input type="text" id="lastName" name="lastName" value={lastName} readOnly={!isEditable} onChange={this.handleChange} />
                    <br />
                    <label htmlFor="titles">Titles:</label>
                    <input type="text" id="titles" name="titles" value={titles} readOnly={!isEditable} onChange={this.handleChange} />
                    <br />
                    <label htmlFor="candidateDescription">Candidate Description:</label>
                    <textarea id="candidateDescription" name="candidateDescription" value={candidateDescription} readOnly={!isEditable} onChange={this.handleChange}></textarea>
                    <br />
                    <button type="submit" style={{ display: isEditable ? 'inline-block' : 'none' }}>Submit</button>
                </form>
                {/* Display candidate ID and photo */}
                <img src={photo} alt={`${firstName} ${lastName}`} />
                {/* Button to toggle edit mode */}
                <button type="button" onClick={this.toggleEdit}>{isEditable ? 'Cancel' : 'Edit Candidate'}</button>
            </div>
        );
    }
}
