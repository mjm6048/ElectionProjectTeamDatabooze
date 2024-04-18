import React from 'react'

export default class AmericanDreamBallot extends React.Component{
  //constructor is imperative to React Components
  constructor(props){
    super(props);
    this.state = {
      data: {}
    }
  }
  //render shows the structure of the page before and after data is loaded
    render(){
        return(
            <>
            <p>This is a ballot (trust me)</p>
            </>
        )
    }
    //once the You may call setState() immediately in componentDidMount(). It will trigger an extra rendering, but it will happen before the browser updates the screen.
    componentDidMount(){
        //called after added to dom.
  }
}