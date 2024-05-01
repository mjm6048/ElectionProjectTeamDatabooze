import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { AccordionActions, Button } from "@mui/material";
import axios from "axios";
import AmericanDreamBallotAccordian from "./AmericanDreamBallotAccordian";
import AmericanDreamCreateBallot from "./AmericanDreamCreateBallot";
import { useNavigate } from "react-router-dom";

const AmericanDreamSocAccordian = (props) => {
  const { societyName, societyID } = props;
  const [ballots, setBallots] = React.useState([]);
  const navigate = useNavigate();
  const roleID = localStorage.getItem("adroleid");
  const handleViewStatistics = () => {
    navigate(`/societyStatistics?societyID=${societyID}`, {
      state: { societyID }
    });
  };

  React.useEffect(() => {
    const fetchBallots = async () => {
      try {
        const token = localStorage.getItem("adtoken");
        const response = await axios.get(
          "http://localhost:5001/societies/ballots",
          {
            headers: { Authorization: `Bearer ${token}` },
            params: { societyID: societyID }
          }
        );
        setBallots(response.data);
      } catch (error) {
        alert("Error encountered while getting ballots");
      }
    };

    fetchBallots();
  }, [societyID]);

  return (
    <div className="Accordion">
      <Accordion>
        <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
          <Typography variant="button">
            <b>SocietyName: {societyName}</b>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <AmericanDreamCreateBallot societyID={societyID} />
          {ballots.map((b) => (
            <div key={b.ballotID}>
              <AmericanDreamBallotAccordian
                ballotID={b.ballotid}
                ballotName={b.ballotname}
                startDate={b.startdate}
                endDate={b.enddate}
                societyID={societyID}
              />
            </div>
          ))}
        </AccordionDetails>
        <AccordionActions>
          {roleID === "4" && (
            <Button
              variant="contained"
              color="primary"
              onClick={handleViewStatistics}
            >
              View Statistics
            </Button>
          )}
        </AccordionActions>
      </Accordion>
    </div>
  );
};

export default AmericanDreamSocAccordian;
