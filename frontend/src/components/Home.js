import React from 'react'
/*
umbrella About section. 
getData fetches the data and doesent need to pass it down any.
while getting data AltLoading will display
*/
export default class Home extends React.Component{
  //constructor is imperative to React Components
  constructor(props){
    super(props);
    this.state = {
      loaded:false,
      data: {}
    }
  }
  //render shows the structure of the page before and after data is loaded
  render(){
    const {loaded,about} = this.state;
    if(!loaded)return(<AltLoading/>);
      return(
        <div>
          <h2>Home Page</h2>
          <h3></h3>
        </div>
      );
    }
    //once the You may call setState() immediately in componentDidMount(). It will trigger an extra rendering, but it will happen before the browser updates the screen.
    componentDidMount(){
    this.setState({
      loaded:true
    });
  }
}