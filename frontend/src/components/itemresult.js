import React, { useEffect, useState } from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
const ItemResult = ({data, id}) => {
const resultsdata = [];
    if (data) {
        data.forEach(vote => {
      
        if(vote.type == 'position'){
        const candidatename = vote.firstname + " " + vote.lastname;
        resultsdata.push({value:parseInt(vote.num_votes), label:candidatename});
        }
        else
        { const intitiativeResponse =  vote.intitiativeResponse;
          resultsdata.push({value:parseInt(vote.num_votes), label:intitiativeResponse});
        }
      });
    };
return (
    <div>
      <h2>Results</h2>
      <h3>{id}</h3>

<PieChart
  series={[
    {
      data: resultsdata,
      innerRadius: 30,
      outerRadius: 100,
      paddingAngle: 5,
      cornerRadius: 5,
      startAngle: -90,
      endAngle: 180,
      cx: 150,
      cy: 150,
    }
  ]}
  width={500}
  height={300}
/>
    </div>
  );
};

export default ItemResult;
