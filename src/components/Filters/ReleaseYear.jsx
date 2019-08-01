import React from "react";
import PropTypes from "prop-types";

const getYear = () => {
  const options = [];
  for (let i = 2019; i >= 2000; i--) {
    options.push(i);
  }
  return options;
};
const years = getYear();

export default class ReleaseYear extends React.PureComponent {
  static propTypes = {
    primary_release_year: PropTypes.string.isRequired,
    onChangeFilter: PropTypes.func.isRequired
  };

  render() {
    const { onChangeFilter, primary_release_year } = this.props;
    return (
      <div className="form-group">
        <label htmlFor="primary_release_year">Год релиза:</label>
        <select
          className="form-control"
          id="primary_release_year"
          name="primary_release_year"
          value={primary_release_year}
          onChange={onChangeFilter}
        >
          <option>Выберите год</option>
          {years.map(item => (
            <option value={item} key={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
    );
  }
}
