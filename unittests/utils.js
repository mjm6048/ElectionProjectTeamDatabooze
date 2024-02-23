

  
function isValidBallot(ballot)
{
   const errors =[];
   // Fields cannot be empty string
   if(/^\s*$/.test(ballot.name) || /^\s*$/.test(ballot.description)|| /^\s*$/.test(ballot.startDate) || /^\s*$/.test(ballot.endDate))
   {
    return false;
   }
   // start date has to be less than end date
   var sd = Date.parse(ballot.startDate);
   var ed = Date.parse(ballot.endDate);
   if(sd>ed)
   {
    return false;
   }
   return true;
}

function isValidCandidate(candidate){
    if(/^\s*$/.test(candidate.username) || /^\s*$/.test(candidate.titles) || /^\s*$/.test(candidate.candidateDescription) || /^\s*$/.test(candidate.photo)){
        return false;
    }else{
        return true;
    }
}

export{
    isValidBallot,
    isValidCandidate
}