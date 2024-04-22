import React from 'react'

export default class AmericanDreamBallot extends React.Component{
  //constructor is imperative to React Components
  constructor(props){
    super(props);
    this.state = {
      itemID: props.itemID,
      itemName: props.itemName,
      itemType: props.itemType,
      numVotesAllowed: props.numVotesAllowed,
      maxNumCandidates: props.maxNumCandidates,
      ballotID: props.ballotID
    }
  }
  //render shows the structure of the page before and after data is loaded
    render(){
      const {itemID,itemName,itemType,numVotesAllowed,maxNumCandidates} = this.state;
        return(
            <>
              <form>
                <label htmlFor="itemID">Item ID:</label>
                <input type="number" id="itemID" name="itemID" readOnly value={itemID} /><br /><br />
                
                <label htmlFor="itemName">Item Name:</label>
                <input type="text" id="itemName" name="itemName" readOnly value={itemName} /><br /><br />
                
                <label htmlFor="itemType">Item Type:</label>
                <select id="itemType" name="itemType" disabled value={itemType}>
                  <option value="initiative">Initiative</option>
                  <option value="position">Position</option>
                </select><br /><br />
                
                <label htmlFor="numVotesAllowed">Number of Votes Allowed:</label>
                <input type="number" id="numVotesAllowed" name="numVotesAllowed" readOnly value={numVotesAllowed} /><br /><br />
                
                <label htmlFor="maxNumCandidates">Max Number of Candidates:</label>
                <input type="number" id="maxNumCandidates" name="maxNumCandidates" readOnly value={maxNumCandidates} /><br /><br />
              </form>
            </>
        )
    }
    //once the You may call setState() immediately in componentDidMount(). It will trigger an extra rendering, but it will happen before the browser updates the screen.
    componentDidMount(){
      //called after added to dom.
  }
}