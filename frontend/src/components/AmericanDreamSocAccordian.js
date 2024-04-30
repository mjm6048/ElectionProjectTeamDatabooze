import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { AccordionActions, Button } from '@mui/material';
import axios from "axios";
import AmericanDreamBallotAccordian from './AmericanDreamBallotAccordian';
import AmericanDreamCreateBallot from './AmericanDreamCreateBallot';

export default class AmericanDreamSocAccordian extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            societyName: props.societyName,
            societyID: props.societyID,
            ballots: [],
        };
    }

    render(){
        const { societyName, ballots, societyID } = this.state;
        return (
            <div className='Accordion'>
                <Accordion>
                    <AccordionSummary
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography variant="button"><b>SocietyName: {societyName}</b></Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <AmericanDreamCreateBallot societyID={societyID} />
                        {
                            ballots.map((b) => {
                                return (
                                    <div key={b.ballotID}>
                                        <AmericanDreamBallotAccordian 
                                            ballotID={b.ballotid}
                                            ballotName={b.ballotname}
                                            startDate={b.startdate}
                                            endDate={b.enddate}
                                            societyID={societyID}
                                        />
                                    </div>
                                );
                            })
                        }
                    </AccordionDetails>
                </Accordion>
                
            </div>
        );
    }

    async componentDidMount(){
        //runs when render is in the DOM
        //get all ballots for socID
        const { societyID } = this.state;
        try {
            var token = localStorage.getItem("adtoken");
            await axios.get("https://databooze.webdev.gccis.rit.edu:8001/societies/ballots",{ headers: {"Authorization" : `Bearer ${token}`}, params: {"societyID" : societyID} })
            .then((res) => {
                this.setState({
                    ballots: res.data
                });
            });
        } catch(error){
            alert("Error encountered while getting ballots");
        }
    }
}
