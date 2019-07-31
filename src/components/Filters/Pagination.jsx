import React from "react";
import PropTypes from "prop-types";

export default class Pagination extends React.Component{
	static propTypes = {
		page: PropTypes.number.isRequired,
		total_pages: PropTypes.number.isRequired,
		onChangePage: PropTypes.func.isRequired
	};

	render(){
		const {onChangePage, page, total_pages} = this.props;
		return (
			<div>
				<div className="btn-group">
			        <button 
			            type="button" 
			            className="btn btn-light mr-2"
			            disabled={page === 1}
			            onClick={onChangePage.bind(null,page-1, total_pages)}
			        >
			            Назад
			        </button>
			        <button 
			            type="button" 
			            className="btn btn-light"
			            onClick={onChangePage.bind(null,page+1, total_pages)}
			        >
			        	Вперед
			        </button>
			    </div>
		        <div>{page} of {total_pages}</div>
	        </div>
		)
	}
}