import React from "react";
import Filters from "./Filters/Filters";
import MoviesList from "./Movies/MoviesList";

export default class App extends React.Component {
  constructor(){
    super();

    this.state = {
      filters: {
        sort_by: "vote_average.desc"
      }
    };
  }

  onChangeFilter = event =>{
    const name = event.target.name,
          value = event.target.value;
    this.setState(prevState =>({
      filters:{
        ...prevState.filters,
        [name]:value
      }
    }))
  };

  render() {
    const {filters} = this.state;
    return (
      <div className="container">
        <div className="row mt-4">
          <div className="col-4">
            <div className="card" style={{ width: "100%" }}>
              <div className="card-body">
                <h3>Фильтры:</h3>
                <Filters 
                  filters={filters} 
                  onChangeFilter={this.onChangeFilter}
                />
              </div>
            </div>
          </div>
          <div className="col-8">
            <MoviesList 
              filters={filters}
            />
          </div>
        </div>
      </div>
    );
  }
}
