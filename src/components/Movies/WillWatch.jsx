import React from "react";
import CallApi from "../../api/api";
import { Bookmark, BookmarkBorder } from "@material-ui/icons";
import withUser from "../HOC/withUser";
import withAuth from "../HOC/withAuth";

class WillWatch extends React.PureComponent {
  constructor() {
    super();

    this.state = {
      isLoading: false
    };
  }

  addToWatchList = () => {
    const {
      user,
      session_id,
      movieId,
      watchlist,
      getWatchList,
      toggleLoginModal
    } = this.props;
    if (session_id) {
      this.setState(
        {
          isLoading: true
        },
        () => {
          CallApi.post(`/account/${user.id}/watchlist`, {
            params: {
              session_id
            },
            body: {
              media_type: "movie",
              media_id: movieId,
              watchlist: !this.getCurrentWatchList(watchlist, movieId)
            }
          }).then(() => {
            getWatchList(session_id, user.id).then(() => {
              this.setState({
                isLoading: false
              });
            });
          });
        }
      );
    } else {
      toggleLoginModal();
    }
  };

  getCurrentWatchList = (watchlist, movieId) =>
    watchlist.some(item => item.id === movieId);

  render() {
    const { isLoading } = this.state;
    const { watchlist, movieId } = this.props;
    const isWillWatch = this.getCurrentWatchList(watchlist, movieId);
    //console.log(isWillWatch);
    return (
      <div
        className="d-inline-flex"
        onClick={this.addToWatchList}
        style={{ pointerEvents: isLoading ? "none" : "auto" }}
      >
        {isWillWatch ? <Bookmark /> : <BookmarkBorder />}
      </div>
    );
  }
}
export default withUser(withAuth(WillWatch));

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
