import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Container, Menu, Input } from "semantic-ui-react";
import "../styling/Navbar.css";
import AlertMessage from "./AlertMessage";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";

class NavBar extends Component {
  state = { activeItem: "latest news" };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    let createArticleButton;
    let flashMessage;
    let loginActions;

    const { activeItem } = this.state;
    const { t } = useTranslation();

    if (this.props.showFlash === true) {
      flashMessage = <AlertMessage />;
    }

    if (this.props.currentUser.attributes.role === "research_group") {
      createArticleButton = (
        <Menu.Item id="create-article-button" as={NavLink} to="/createarticle">
          Create Article
        </Menu.Item>
      );
    }

    if (this.props.currentUser.isSignedIn === false) {
      loginActions = (
        <>
          <Menu.Item as={NavLink} to="/login-form" id="login-button">
            Log In
          </Menu.Item>
          <Menu.Item as={NavLink} to="/signup" id="sign-up-button">
            Sign Up
          </Menu.Item>
        </>
      );
    }
    return (
      <>
        <div className="ui stackable menu">
          <Container>
            <Menu.Item className="header logo" to="/">
              GNOSIS
            </Menu.Item>
            <Menu.Item id="homebutton" as={NavLink} to="/">
              Home
            </Menu.Item>
            <div className="ui simple dropdown item">
              Categories <i className="dropdown icon" />
              <Menu secondary id="navbar">
                <Menu.Item
                  name="environment"
                  active={activeItem === "home"}
                  onClick={this.handleItemClick}
                />
                <Menu.Item
                  name="medicine"
                  active={activeItem === "home"}
                  onClick={this.handleItemClick}
                />
                <Menu.Item
                  name="outreach"
                  active={activeItem === "home"}
                  onClick={this.handleItemClick}
                />
              </Menu>
            </div>
            <div className="ui simple dropdown item">
              {t('navbar.languages')} <i className="dropdown icon" />
              <Menu secondary id="language">
                <Menu.Item
                  name="Swedish"
                  // <i> PUT IN A FLAG!!!
                  onClick={this.handleItemClick}
                />
                <Menu.Item name="English" onClick={this.handleItemClick} />
              </Menu>
            </div>
            <Menu.Menu position="right">
              <Menu.Item>
                <Input icon="search" placeholder="Search..." />
              </Menu.Item>
              {createArticleButton}

              {loginActions}
            </Menu.Menu>
          </Container>
        </div>
        <Container>{flashMessage}</Container>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.reduxTokenAuth.currentUser,
    showFlash: state.flashes.showFlash
  };
};
export default connect(mapStateToProps)(NavBar);
