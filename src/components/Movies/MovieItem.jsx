import React from "react";
import Favorite from "./Favorite";

class MovieItem extends React.Component {
  // state = {
  //   favorite: false,
  //   watchlist: false
  // };

  // componentDidUpdate(prevProps) {
  //   if (this.props.favorite_list !== prevProps.favorite_list) {
  //     this.props.favorite_list.map(item => {
  //       if (item.id === this.props.item.id) {
  //         return this.setState(prevState => ({
  //           favorite: !prevState.favorite
  //         }));
  //       } else {
  //         return false;
  //       }
  //     });
  //   }
  // if (!_.isEqual(this.props.filters, prevProps.filters)) {
  //   console.log("bbb");
  //   this.props.favor.map(item => {
  //     if (item.id === this.props.item.id) {
  //       return this.setState(prevState => ({
  //         favorite: !prevState.favorite
  //       }));
  //     } else {
  //       return false;
  //     }
  //   });
  // }
  // }

  // markAsFavorite = () => {
  //   CallApi.post(`/account/${this.props.user.id}/favorite`, {
  //     params: {
  //       session_id: this.props.session_id
  //     },
  //     body: {
  //       media_type: "movie",
  //       media_id: this.props.item.id,
  //       favorite: this.state.favorite ? false : true
  //     }
  //   }).then(() => {
  //     this.setState(prevState => ({
  //       favorite: !prevState.favorite
  //     }));
  //   });
  // };

  render() {
    const { item } = this.props;
    return (
      <div className="card" style={{ width: "100%" }}>
        <img
          className="card-img-top card-img--height"
          src={`https://image.tmdb.org/t/p/w500${item.backdrop_path ||
            item.poster_path}`}
          alt=""
        />
        <div className="card-body">
          <h6 className="card-title">{item.title}</h6>
          <div className="card-text">Рейтинг: {item.vote_average}</div>
          <Favorite itemId={item.id} />
        </div>
      </div>
    );
  }
}

export default MovieItem;
