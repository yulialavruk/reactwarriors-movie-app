import React from "react";
import CallApi from "../../api/api";
import { Star, StarBorder } from "@material-ui/icons";
import withUserHOC from "../HOC/withUser";
import withAuthHOC from "../HOC/withAuth";

class Favorite extends React.PureComponent {
  constructor() {
    super();

    this.state = {
      isLoading: false
    };
  }

  markAsFavorite = () => {
    if (this.props.session_id) {
      this.setState(
        {
          isLoading: true
        },
        () => {
          CallApi.post(`/account/${this.props.user.id}/favorite`, {
            params: {
              session_id: this.props.session_id
            },
            body: {
              media_type: "movie",
              media_id: this.props.itemId,
              favorite: !this.getCurrentFavorite(
                this.props.favorite_movies,
                this.props.itemId
              )
            }
          }).then(() => {
            this.props.getFavoriteList().then(() => {
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

  getCurrentFavorite = (favorite_movies, itemId) =>
    favorite_movies.some(item => item.id === itemId);

  render() {
    const isFavorite = this.getCurrentFavorite(
      this.props.favorite_movies,
      this.props.itemId
    );
    //console.log(isFavorite);
    return (
      <div
        className="d-inline-flex"
        onClick={this.markAsFavorite}
        style={{ pointerEvents: this.state.isLoading ? "none" : "auto" }}
      >
        {isFavorite ? <Star /> : <StarBorder />}
      </div>
    );
  }
}

export default withUserHOC(withAuthHOC(Favorite));

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
