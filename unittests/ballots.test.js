import * as utils from './utils.js';




test(`Fields cannot be empty spaces`,()=>{
const result = utils.isValidBallot({name:" ", description: "dfsdfgsd",startDate: "1.10.2024", endDate: "2.10.2024", societyID: 12});
    expect(result).toBe(false);

 });

test(`Start date cannot be after end date`,()=>{
    const result = utils.isValidBallot({name:"election 2024", description: "dfsdfgsd",startDate: "03.10.2024", endDate: "02.10.2024", societyID: 12});
        expect(result).toBe(false);
    
    });