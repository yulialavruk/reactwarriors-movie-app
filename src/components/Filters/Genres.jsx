import React from "react";

export default class Genres extends React.Component{

onChangeGenres = event =>{
    const with_genres = this.props.with_genres;
    const check = event.target.checked;
    const value = event.target.value;
    if (check) {
      	this.props.onChangeFilter({
        	target : {
          		name: "with_genres",
          		value: [...with_genres, value]
        	}
      	})
    } else {
      	const index = with_genres.indexOf(value);
      	if (index > -1) {
        	with_genres.splice(index, 1);
        	this.props.onChangeFilter({
          		target:{
            		name: "with_genres",
            		value: [...with_genres]
 	         	}
        	})
      	} 
    }
 };

	render(){
		const {genres, with_genres} = this.props;
		return(
			genres.map(genre=>(
	            <div className="form-check" key={genre.id}>
	              <input 
	                className="form-check-input" 
	                type="checkbox"
	                id={genre.id}
	                name="with_genres"
	                checked={with_genres.find(element=>(Number(element) === Number(genre.id)))}
	                value={genre.id}
	                onChange={this.onChangeGenres}
	              />
	              <label className="form-check-label" htmlFor={genre.id}>
	                {genre.name}
	              </label>
	            </div>
         	))
		)
	}
}