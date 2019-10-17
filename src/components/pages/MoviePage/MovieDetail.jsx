import React from "react";
import { Table } from "reactstrap";

export default class MovieDetail extends React.Component {
  // constructor() {
  //   super();

  // }

  render() {
    const { movieDetails } = this.props;
    // const production_countr = movieDetails.production_countries.map(
    //   item => item.name
    // );
    const movieDataList = [
      {
        name: "Статус",
        value: movieDetails.status
      },
      {
        name: "Дата выхода",
        value: movieDetails.release_date
      },
      {
        name: "Продолжительность",
        value: movieDetails.runtime + "минут"
      },
      {
        name: "Язык оригинала",
        value: movieDetails.original_language
      },
      {
        name: "Страна",
        value:
          movieDetails && movieDetails.length > 0
            ? movieDetails.production_countries.map(item => item.name)
            : ""
      },
      {
        name: "Бюджет",
        value: movieDetails.budget + "$"
      },
      {
        name: "Сборы",
        value: movieDetails.revenue + "$"
      },
      {
        name: "Компания"
        //value: movieDetails.status
      },
      {
        name: "Жанры"
        //value: movieDetails.status
      }
    ];

    console.log(movieDataList);
    return (
      <Table>
        <tbody>
          {movieDataList.map(item => {
            return (
              <tr key={item.name}>
                <th scope="row">{item.name}</th>
                <td>{item.value}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    );
  }
}
