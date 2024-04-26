import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AmericanDreamBallot from './AmericanDreamBallot.js';
import axios from 'axios';
// this page will display an accordian of all ballots for the given soc. when expanded will display ADBallot
export default class AmericanDreamBallotAccordian extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            ballotID: props.ballotID,
            ballotName: props.ballotName,
            startDate: props.startDate,
            endDate: props.endDate,
            societyID: props.societyID,
            ballotItems: [],
            expanded: false
        }
    }

    async handleAccordionChange(){
        try {
            var token = localStorage.getItem("adtoken");
            await axios.get("http://localhost:5001/ballotitem",{ headers: {"Authorization" : `Bearer ${token}`}, params: {"ballotID" : this.state.ballotID} })
            .then((res) => {
                console.log(res);
                this.setState({
                    ballotItems:res.data,
                    expanded: true
                });
          });
        }catch(error){
            console.log(error);
            // alert("Error encountered while getting ballot items");
        }
    }

    render(){
        const {ballotID,ballotName,startDate,endDate,ballotItems} = this.state;
        return (
            <div className='Accordion'>
                <Accordion>
                    {/* headding for accordian, just soc name */}
                    <AccordionSummary
                    // expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    onClick={() => this.handleAccordionChange()}
                    >
                        <Typography variant="button" >{ballotName}</Typography>
                    </AccordionSummary>
                    {/* actual content of the accordian when expanded */}
                    {this.state.expanded && (
                        <AccordionDetails>
                            {ballotItems.map((bi) => (
                                <React.Fragment key={bi.itemid}>
                                    <AmericanDreamBallot 
                                        itemID={bi.itemid}
                                        itemName={bi.itemname}
                                        itemType={bi.itemtype}
                                        numVotesAllowed={bi.numvotesallowed}
                                        maxNumCandidates={bi.maxnumcandidates}
                                        ballotID={this.state.ballotID}
                                    />
                                    <hr />
                                </React.Fragment>
                            ))}
                        </AccordionDetails>
                    )}
                </Accordion>
            </div>
        );
    }
    async componentDidMount(){
        //runs when render is in the DOM
        //get all ballots for socID

    }
}

// import * as React from 'react';
// import Accordion from '@mui/material/Accordion';
// import AccordionSummary from '@mui/material/AccordionSummary';
// import AccordionDetails from '@mui/material/AccordionDetails';
// import Typography from '@mui/material/Typography';
// import AmericanDreamBallot from './AmericanDreamBallot.js';
// import axios from 'axios';

// export default class AmericanDreamBallotAccordion extends React.Component {
//     constructor(props){
//         super(props);
//         this.state = {
//             ballotID: props.ballotID,
//             ballotName: props.ballotName,
//             startDate: props.startDate,
//             endDate: props.endDate,
//             societyID: props.societyID,
//             ballotItems: [],
//             expanded: false // Track which accordion is expanded
//         }
//     }

//     // Method to fetch data for a specific accordion panel
//     fetchData = async () => {
//         try {
//             var token = localStorage.getItem("adtoken");
//             await axios.get("http://localhost:5001/ballotitems",{ headers: {"Authorization" : `Bearer ${token}`}, params: {"ballotID" : this.state.ballotID} })
//             .then((res) => {
//                 console.log(res);
//                 this.setState({
//                     ballotItems: res.data
//                 });
//             });
//         } catch(error) {
//             console.log(error);
//             // Handle error
//         }
//     }

//     // Method to handle accordion panel expand/collapse
//     handleAccordionChange = (panel) => (event, isExpanded) => {
//         if (isExpanded) {
//             // Fetch data when panel is expanded
//             this.fetchData();
//         }
//         this.setState({ expanded: isExpanded ? panel : false });
//     };

//     render(){
//         const { ballotID, ballotName, startDate, endDate, ballotItems, expanded } = this.state;
//         return (
//             <div className='Accordion'>
//                 <Accordion expanded={expanded == 'panel1'} onChange={this.handleAccordionChange('panel1')}>
//                     <AccordionSummary
//                         aria-controls="panel1a-content"
//                         id="panel1a-header"
//                     >
//                         <Typography variant="button">{ballotName}</Typography>
//                     </AccordionSummary>
//                     <AccordionDetails>
//                         {
//                             ballotItems.map((bi) => {
//                                 return (
//                                     <React.Fragment key={bi.itemid}>
//                                         <AmericanDreamBallot 
//                                             itemID={bi.itemid}
//                                             itemName={bi.itemname}
//                                             itemType={bi.itemtype}
//                                             numVotesAllowed={bi.numvotesallowed}
//                                             maxNumCandidates={bi.maxnumcandidates}
//                                             ballotID={this.state.ballotID}
//                                         />
//                                         <hr />
//                                     </React.Fragment>
//                                 )
//                             })
//                         }
//                     </AccordionDetails>
//                 </Accordion>
//             </div>
//         );
//     }
// }






