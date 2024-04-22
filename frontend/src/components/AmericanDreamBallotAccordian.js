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
        }
    }
    render(){
        const {ballotID,ballotName,startDate,endDate} = this.state;
        return (
            <div className='Accordion'>
                <Accordion>
                    {/* headding for accordian, just soc name */}
                    <AccordionSummary
                    // expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                        <Typography variant="button">{ballotName}</Typography>
                    </AccordionSummary>
                    {/* actual content of the accordian when expanded */}
                    <AccordionDetails>
                        {
                            <AmericanDreamBallot />
                        }
                    </AccordionDetails>
                </Accordion>
            </div>
        );
    }
    async componentDidMount(){
        //runs when render is in the DOM
        //get all ballots for socID
        const {ballotID} = this.state;
        try {
            var token = localStorage.getItem("adtoken");
            await axios.get("http://localhost:5001/ballotitems",{ headers: {"Authorization" : `Bearer ${token}`}, params: {"ballotID" : ballotID} })
            .then((res) => {
                console.log(res);
                this.setState({
                    ballots:res.data
                });
          });
        }catch(error){
            alert("Error encountered while getting ballots");
        }
    }
}