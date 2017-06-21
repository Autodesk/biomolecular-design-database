import React from 'react';
import './modal.css';

class CommentItem extends React.Component{

	componentWillMount(){
		console.log(this.props.comment);
	}

	render() {
		return (
			<div className="single-comment">
				<h5>{this.props.comment.username} :</h5>
				<p>{this.props.comment.comment} </p>
			</div>
		);
	}
}

CommentItem.propTypes = {
	comment: React.PropTypes.object.isRequired
}

export default CommentItem;