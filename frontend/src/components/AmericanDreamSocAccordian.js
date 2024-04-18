import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { AccordionActions } from '@mui/material';
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
        const {societyName,ballots,description,courses,note} = this.state;
        return (
            <div className='Accordion'>
                <Accordion>
                    {/* headding for accordian, just soc name */}
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                        <Typography variant="button"><b>{societyName}</b></Typography>
                    </AccordionSummary>
                    {/* actual content of the accordian when expanded */}
                    <AccordionDetails>
                        <AmericanDreamSocBallotAccordian {...ballots}/>
                    </AccordionDetails>
                    {/* button to create new ballot at bottom of accordian */}
                    <AccordionActions>
                        <button>Create A New Ballot</button>
                    </AccordionActions>
                </Accordion>
            </div>
        );
    }
    componentDidMount(){
        //runs when render is in the DOM
        //get all ballots for socID
    }
}