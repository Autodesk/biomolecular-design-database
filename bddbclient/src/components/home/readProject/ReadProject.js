import React from 'react';
import './modal.css';
import '../Home.css';

class ReadProject extends React.Component {
	constructor(props){
		super(props);
		this.state = {

		}
		this.onChange = this.onChange.bind(this);
	}	

	onChange(e){
		e.preventDefault();
		console.log(this.props.project);
	}
	render(){
		var counter = 0;
		const authors = this.props.project.authors.map((author) => {
			counter++;
			if(counter === 1){ return author; }
			return ', '+author;
		});
		var count = 0;
		const keywords = this.props.project.keywords.map((keyword) => {
			count++;
			if(count === 1){ return keyword; }
			return ', '+keyword;
		})
		const qod = this.props.project.quality_of_documentation;
		var ticks = [];
		for(var i = 0; i < 5; i++){
			if( i < qod){
				ticks.push(<span className='green-tick glyphicon glyphicon-ok-circle' aria-hidden='true'></span>);
			}
			else{
				ticks.push(<span className='glyphicon glyphicon-ok-circle' aria-hidden='true'></span>);
			}
		}
		return(
			<div className="modal-body " >
				<div id="details">
					<div className="sub-part pull-left">
						<div className="sub-title">
							<h5> AUTHORS </h5>
						</div>
						<p className="authors-styling"> {authors} </p>
					</div>
					<div className="sub-part pull-left">
						<div className="sub-title">
							<h5> VERSION </h5>
						</div>
						<p className="authors-styling"> 1.3 Published 5/23/2017 </p>
					</div>
					<div className="sub-part pull-left">
						<div className="sub-title">
							<h5> KEYWORDS </h5>
						</div>
						<p className="authors-styling"> {keywords} </p>
					</div>
					<div className="sub-part pull-left">
						<div className="sub-title">
							<h5> USER RIGHTS <span className="glyphicon glyphicon-question-sign" aria-hidden="true"></span> </h5>
						</div>
						<p className="authors-styling"> {this.props.project.user_rights} </p>
					</div>
					<div className="sub-part pull-left">
						<div className="sub-title">
							<h5> CONTACT</h5>
							<div className="row">
								<i className="fa fa-linkedin" aria-hidden="true"></i>
								<i className="fa fa-envelope-o" aria-hidden="true"></i>
								<i className="fa fa-facebook" aria-hidden="true"></i>
								<i className="fa fa-home" aria-hidden="true"></i>
							</div>
						</div>
					</div>
					<div className="sub-part pull-left">
						<div className="sub-title">
							<hr/>
						</div>
					</div>
					<div className="sub-part pull-left">
						<div className="sub-title">
							<h5> QUALITY OF DOCUMENTATION <span className="glyphicon glyphicon-question-sign" aria-hidden="true"></span> </h5>
							<p className="ticks-details"> 
								<div className="tick">
							        {ticks[0]}
							        {ticks[1]}
							        {ticks[2]}
							        {ticks[3]}
							        {ticks[4]}
						        </div>
							 </p>
						</div>
					</div>
					<div className="sub-part pull-left">
						<div className="col-md-4 views-details">
							<h5> VIEWS<i className="fa fa-eye" aria-hidden="true"> </i> </h5>
							<p className="views-styling"> {this.props.project.views} </p>
						</div>
						<div className="col-md-4 likes-details">
							<h5> APPRECIATIONS  <i className="fa fa-thumbs-o-up" aria-hidden="true"></i> </h5>
							<p className="likes-styling"> {this.props.project.likes} </p>
						</div>
					</div>
					<div className="sub-part-hr pull-left">
						<div className="sub-title">
							<hr/>
						</div>
					</div>
					<div className="sub-part pull-left">
						<div className="sub-title">
							<button className="btn btn-success appreciate-btn"> Appreciate Project </button>
						</div>
					</div>
					<div className="sub-part pull-left row">
							<a href="" className="link-left">Link to Project    </a>
						
							<a href="" className="link-right">  Flag content</a>
					
					</div>
				</div>
				<div id="files">
					<span className="glyphicon glyphicon-remove-circle cross-icon" onClick={this.props.deactivateModal} aria-hidden="true"></span>
    				<h2> {this.props.project.name}  </h2>
    			</div>
			</div>
		);
	}
}

ReadProject.proptypes = {
	project: React.PropTypes.object.isRequired,
	deactivateModal: React.PropTypes.func.isRequired
}

export default ReadProject;