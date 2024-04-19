import React from 'react';
import AmericanDreamSocAccordian from './AmericanDreamSocAccordian';
import axios from "axios";

export default class AmericanDreamHome extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            //define varables to be used in content
            societies: {},
        }
    }
    //show content
    render(){
        return(
            <>
            <p>American Dream Homepage</p>
            <p>View all societies</p>
                {
                    societies.map((society) => {
                        return(
                            <div>
                                <AmericanDreamSocAccordian {...society}/>
                            </div>
                        );
                    })
                }
            </>
        )
    }
    async componentDidMount(){
        //runs when render is in the DOM
        //get all Soc 
        try {
            await axios.get("https://databooze-dev.webdev.gccis.rit.edu/societies")
            .then(response=> { 
                if (response.status === 200) {
                    this.setState({
                        societies:response
                    });
                } else {
                    console.log(response.status);
                    alert("Invalid credentials");
                }
           })
        }catch(error){
            alert("Error encountered while getting societies");
        }
    }
}