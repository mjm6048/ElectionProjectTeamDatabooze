import React from "react";
import AmericanDreamSocAccordian from "./AmericanDreamSocAccordian";
import axios from "axios";
import { Navigate } from "react-router-dom";

export default class AmericanDreamHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //define varables to be used in content
      societies: [],
      redirectToCreateUser: false,
      redirectToCreateSociety: false,
      redirectToSystemStatistics: false,
      roleID: localStorage.getItem("adroleid")
    };
  }

  handleCreateUser = () => {
    this.setState({ redirectToCreateUser: true });
  };

  handleCreateSociety = () => {
    this.setState({ redirectToCreateSociety: true });
  };

  handleSystemStatistics = () => {
    this.setState({ redirectToSystemStatistics: true });
  };

  //show content
  render() {
    const {
      societies,
      redirectToCreateUser,
      redirectToCreateSociety,
      redirectToSystemStatistics,
      redirectToSocietyStatistics,
      roleID
    } = this.state;
    if (redirectToCreateUser) {
      return <Navigate to="/createUser" />;
    }

    if (redirectToCreateSociety) {
      return <Navigate to="/createSociety" />;
    }

    if (redirectToSystemStatistics) {
      return <Navigate to="/systemStatistics" />;
    }
    return (
      <>
        <p>American Dream Homepage</p>
        <div>
          {roleID === "4" && (
            <>
              <button onClick={this.handleCreateUser}>Create/Edit User</button>
              <button onClick={this.handleCreateSociety}>Create Society</button>
              <button onClick={this.handleSystemStatistics}>
                System Statistics
              </button>
            </>
          )}
        </div>
        <p>View all societies</p>
        {societies.map((s) => {
          return (
            <div key={s.societyid}>
              <AmericanDreamSocAccordian
                societyName={s.societyname}
                societyID={s.societyid}
              />
            </div>
          );
        })}
      </>
    );
  }
  async componentDidMount() {
    //runs when render is in the DOM
    //get Soc
    try {
      var token = localStorage.getItem("adtoken");
      await axios
        .get("https://databooze.webdev.gccis.rit.edu:8001/societies", {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then((res) => {
          console.log(res);
          this.setState({
            societies: res.data
          });
        });
    } catch (error) {
      alert("Error encountered while getting societies");
    }
  }
}
