import React from "react";
import CallApi from "../../api/api";
import { Star, StarBorder } from "@material-ui/icons";
import withUser from "../HOC/withUser";
import withAuth from "../HOC/withAuth";

class Favorite extends React.PureComponent {
  constructor() {
    super();

    this.state = {
      isLoading: false
    };
  }

  markAsFavorite = () => {
    const {
      user,
      session_id,
      movieId,
      favorite_movies,
      getFavoriteList,
      toggleLoginModal
    } = this.props;
    if (session_id) {
      this.setState(
        {
          isLoading: true
        },
        () => {
          CallApi.post(`/account/${user.id}/favorite`, {
            params: {
              session_id
            },
            body: {
              media_type: "movie",
              media_id: movieId,
              favorite: !this.getCurrentFavorite(favorite_movies, movieId)
            }
          }).then(() => {
            getFavoriteList(session_id, user.id).then(() => {
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

  getCurrentFavorite = (favorite_movies, movieId) =>
    favorite_movies.some(item => item.id === movieId);

  render() {
    const { isLoading } = this.state;
    const { favorite_movies, movieId } = this.props;
    const isFavorite = this.getCurrentFavorite(favorite_movies, movieId);
    //console.log(isFavorite);
    return (
      <div
        className="d-inline-flex"
        onClick={this.markAsFavorite}
        style={{ pointerEvents: isLoading ? "none" : "auto" }}
      >
        {isFavorite ? <Star /> : <StarBorder />}
      </div>
    );
  }
}

export default withUser(withAuth(Favorite));

// componentDidMount() {
//   this.props.favorite_movies.map(item => {
//     if (item.id === this.props.itemId) {
//       return this.setState({
//         isFavorite: true
//       });
//     } else {
//       return false;
//     }
//   });
// }

// componentDidUpdate(prevProps) {
//   if (!_.isEqual(this.props.favorite_movies, prevProps.favorite_movies)) {
//     this.props.favorite_movies.map(item => {
//       if (item.id === this.props.itemId) {
//         return this.setState({
//           isFavorite: true
//         });
//       } else {
//         return false;
//       }
//     });
//   }
// }
