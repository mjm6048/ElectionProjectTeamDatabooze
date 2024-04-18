import React from 'react';
import AmericanDreamSocAccordian from './AmericanDreamSocAccordian';

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
    componentDidMount(){
        //runs when render is in the DOM
        //get all Soc 
    }
}