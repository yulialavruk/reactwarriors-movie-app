import React from "react";
import CallApi from "../../api/api";
import { Bookmark, BookmarkBorder } from "@material-ui/icons";
import AppContextHOC from "../HOC/AppContextHOC";
import _ from "lodash";

class WillWatch extends React.PureComponent {
  constructor() {
    super();

    this.state = {
      isLoading: false
    };
  }

  addToWatchList = () => {
    if (this.props.session_id) {
      this.setState(
        {
          isLoading: true
        },
        () => {
          CallApi.post(`/account/${this.props.user.id}/watchlist`, {
            params: {
              session_id: this.props.session_id
            },
            body: {
              media_type: "movie",
              media_id: this.props.itemId,
              watchlist: !this.getCurrentWatchList(
                this.props.watchlist,
                this.props.itemId
              )
            }
          }).then(() => {
            this.props.getWatchList().then(() => {
              this.setState({
                isLoading: false
              });
            });
          });
        }
      );
    } else {
      this.props.toggleLoginModal();
    }
  };

  getCurrentWatchList = _.memoize((watchlist, itemId) =>
    watchlist.some(item => item.id === itemId)
  );
  // componentDidMount() {
  //   this.props.watchlist.map(item => {
  //     if (item.id === this.props.itemId) {
  //       return this.setState({
  //         isWillWatch: true
  //       });
  //     } else {
  //       return false;
  //     }
  //   });
  // }

  // componentDidUpdate(prevProps) {
  //   if (!_.isEqual(this.props.watchlist, prevProps.watchlist)) {
  //     this.props.watchlist.map(item => {
  //       if (item.id === this.props.itemId) {
  //         return this.setState({
  //           isWillWatch: true
  //         });
  //       } else {
  //         return false;
  //       }
  //     });
  //   }
  // }

  render() {
    const isWillWatch = this.getCurrentWatchList(
      this.props.watchlist,
      this.props.itemId
    );
    return (
      <div
        className="d-inline-flex"
        onClick={this.addToWatchList}
        style={{ pointerEvents: this.state.isLoading ? "none" : "auto" }}
      >
        {isWillWatch ? <Bookmark /> : <BookmarkBorder />}
      </div>
    );
  }
}
export default AppContextHOC(WillWatch);
