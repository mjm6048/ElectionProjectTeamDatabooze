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
                <div>
                    <p>This is where the infromation for the ballot will do, candidates, initative ect.</p>
                </div>
                <div>
                    <p>this button will either say edit or results based on if the ballot has expired yet</p>
                    <button>Click me</button>
                </div>
            </>
        )
    }
    //once the You may call setState() immediately in componentDidMount(). It will trigger an extra rendering, but it will happen before the browser updates the screen.
    componentDidMount(){
        //called after added to dom.
  }
}