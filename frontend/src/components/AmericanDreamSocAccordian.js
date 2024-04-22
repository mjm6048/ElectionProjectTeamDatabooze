import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { AccordionActions } from '@mui/material';
import axios from "axios";
import AmericanDreamBallotAccordian from './AmericanDreamBallotAccordian';
// This page will show all societies in an accordian. when expanded will display ADBALLOTACCORDIAN 
export default class AmericanDreamSocAccordian extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            societyName: props.societyName,
            societyID: props.societyID,
            ballots: {},
        }
    }
    render(){
        const {societyName,ballots,societyID} = this.state;
        return (
            <div className='Accordion'>
                <Accordion>
                    {/* headding for accordian, just soc name */}
                    <AccordionSummary
                    // expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                        <Typography variant="button"><b>{societyName}</b></Typography>
                    </AccordionSummary>
                    {/* actual content of the accordian when expanded */}
                    <AccordionDetails>
                        <AmericanDreamBallotAccordian 
                            ballotID = {ballots.ballotID}
                            ballotName = {ballots.ballotName}
                            startDate = {ballots.startDate}
                            endDate = {ballots.endDate}
                            societyID = {societyID}
                        />
                    </AccordionDetails>
                    {/* button to create new ballot at bottom of accordian */}
                    <AccordionActions>
                        <button>Create A New Ballot</button>
                    </AccordionActions>
                </Accordion>
            </div>
        );
    }
    /* 
    axios.get("https://databooze-dev.webdev.gccis.rit.edu/societies", {
        params: {
            societyID: {societyID}
        }
    })
    */
    async componentDidMount(){
        //runs when render is in the DOM
        //get all ballots for socID
        const {societyID} = this.state;
        try {
            var token = localStorage.getItem("adtoken");
            await axios.get("http://localhost:5001/societies/ballots",{ headers: {"Authorization" : `Bearer ${token}`}, params: {"societyID" : societyID} })
            .then((res) => {
                this.setState({
                    ballots:res
                });
          });
        }catch(error){
            alert("Error encountered while getting ballots");
        }
    }
}