import React from "react";
import CallApi from "../../api/api";
import { Star, StarBorder } from "@material-ui/icons";
import AppContextHOC from "../HOC/AppContextHOC";
import _ from "lodash";

class Favorite extends React.Component {
  constructor() {
    super();

    this.state = {
      isFavorite: false
    };
  }

  markAsFavorite = () => {
    CallApi.post(`/account/${this.props.user.id}/favorite`, {
      params: {
        session_id: this.props.session_id
      },
      body: {
        media_type: "movie",
        media_id: this.props.itemId,
        favorite: this.state.isFavorite ? false : true
      }
    }).then(() => {
      this.setState(prevState => ({
        isFavorite: !prevState.isFavorite
      }));
      this.props.getFavoriteList();
    });
  };

  componentDidMount() {
    this.props.favorite_movies.map(item => {
      if (item.id === this.props.itemId) {
        return this.setState({
          isFavorite: true
        });
      } else {
        return false;
      }
    });
  }

  componentDidUpdate(prevProps) {
    if (!_.isEqual(this.props.favorite_movies, prevProps.favorite_movies)) {
      this.props.favorite_movies.map(item => {
        if (item.id === this.props.itemId) {
          return this.setState({
            isFavorite: true
          });
        } else {
          return false;
        }
      });
    }
  }

  render() {
    console.log(this.props.favorite_movies);
    return (
      <div className="d-inline-flex" onClick={this.markAsFavorite}>
        {this.state.isFavorite ? <Star /> : <StarBorder />}
      </div>
    );
  }
}
export default AppContextHOC(Favorite);
