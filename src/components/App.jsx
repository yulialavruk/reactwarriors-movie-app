import React from "react";
import Filters from "./Filters/Filters";
import MoviesList from "./Movies/MoviesList";

export default class App extends React.Component {
  constructor(){
    super();

    this.initialState = {
      filters: {
        sort_by: "vote_average.desc",
        primary_release_year: ""
      },
      page: 1
    };
    this.state = {...this.initialState};
  };

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

  onChangePage = page =>{
    this.setState({
      page
    })
  };

  onReset = event =>{
    this.setState(this.initialState);
  };

  render() {
    const {filters, page} = this.state;
    return (
      <div className="container">
        <div className="row mt-4">
          <div className="col-4">
            <div className="card" style={{ width: "100%" }}>
              <div className="card-body">
                <h3>Фильтры:</h3>
                <Filters 
                  filters={filters} 
                  page={page}
                  onChangeFilter={this.onChangeFilter}
                  onChangePage={this.onChangePage}
                  onReset={this.onReset}
                />
              </div>
            </div>
          </div>
          <div className="col-8">
            <MoviesList 
              filters={filters}
              page={page}
              onChangePage={this.onChangePage}
            />
          </div>
        </div>
      </div>
    );
  }
}
