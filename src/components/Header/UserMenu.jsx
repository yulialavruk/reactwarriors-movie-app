import React from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import withUser from "../HOC/withUser";
import withAuth from "../HOC/withAuth";

class UserMenu extends React.Component {
  constructor() {
    super();

    this.state = {
      dropdownOpen: false
    };
  }

  toggleDropdown = () => {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  };

  render() {
    const { dropdownOpen } = this.state;
    const { user, onLogOut, session_id } = this.props;
    return (
      <Dropdown isOpen={dropdownOpen} toggle={this.toggleDropdown}>
        <DropdownToggle
          tag="div"
          onClick={this.toggleDropdown}
          data-toggle="dropdown"
          aria-expanded={dropdownOpen}
        >
          <img
            width="40"
            className="rounded-circle"
            src={`https://secure.gravatar.com/avatar/${user.avatar.gravatar.hash}.jpg?s=64"`}
            alt=""
            onClick={this.toggleDropdown}
          />
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem
            onClick={() => {
              onLogOut(session_id);
            }}
          >
            Выйти
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }
}

export default withUser(withAuth(UserMenu));
