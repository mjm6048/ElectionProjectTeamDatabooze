import React from 'react';
import AmericanDreamSocAccordian from './AmericanDreamSocAccordian';
import axios from "axios";

export default class AmericanDreamHome extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            //define varables to be used in content
            societies: [],
        }
    }
    //show content
    render(){
        const {societies} = this.state;
        return(
            <>
            <p>American Dream Homepage</p>
            <p>View all societies</p>
                {
                    societies.map((s) => {
                        return (
                            <div key={s.societyid}>
                                <AmericanDreamSocAccordian 
                                    societyName={s.societyname}
                                    societyID={s.societyid}
                                />
                            </div>
                        );
                    })
                }
            </>
        )
    }
    async componentDidMount(){
        //runs when render is in the DOM
        //get Soc 
        try {
            var token = localStorage.getItem("adtoken");
            await axios.get("http://localhost:5001/societies",{ headers: {"Authorization" : `Bearer ${token}`} })
            .then((res) => {
                console.log(res);
                this.setState({
                    societies:res.data
                });
          });
        }catch(error){
            alert("Error encountered while getting societies");
        }
    }
}