import React from "react";
import CallApi from "../../api/api";
import { Bookmark, BookmarkBorder } from "@material-ui/icons";
import AppContextHOC from "../HOC/AppContextHOC";
import _ from "lodash";

class WillWatch extends React.Component {
  constructor() {
    super();

    this.state = {
      isWillWatch: false
    };
  }

  addToWatchList = () => {
    CallApi.post(`/account/${this.props.user.id}/watchlist`, {
      params: {
        session_id: this.props.session_id
      },
      body: {
        media_type: "movie",
        media_id: this.props.itemId,
        watchlist: this.state.isWillWatch ? false : true
      }
    }).then(() => {
      this.setState(prevState => ({
        isWillWatch: !prevState.isWillWatch
      }));
      this.props.getWatchList();
    });
  };

  componentDidMount() {
    this.props.watchlist.map(item => {
      if (item.id === this.props.itemId) {
        return this.setState({
          isWillWatch: true
        });
      } else {
        return false;
      }
    });
  }

  componentDidUpdate(prevProps) {
    if (!_.isEqual(this.props.watchlist, prevProps.watchlist)) {
      this.props.watchlist.map(item => {
        if (item.id === this.props.itemId) {
          return this.setState({
            isWillWatch: true
          });
        } else {
          return false;
        }
      });
    }
  }

  render() {
    console.log(this.props.watchlist);
    return (
      <div className="d-inline-flex" onClick={this.addToWatchList}>
        {this.state.isWillWatch ? <Bookmark /> : <BookmarkBorder />}
      </div>
    );
  }
}
export default AppContextHOC(WillWatch);
