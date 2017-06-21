import React from 'react';
import './modal.css';
import CommentItem from './CommentItem';

class CommentDisplay extends React.Component{

	componentWillMount(){
		console.log(this.props.comments);
	}

	render() {
		const commentDisplay = this.props.comments.map((comment) => {
			return <CommentItem key={comment.id} comment={comment} />
		});
		return (
			<div>
				{commentDisplay}
			</div>
		);
	}
}

CommentDisplay.propTypes = {
	comments: React.PropTypes.array.isRequired
}



export default CommentDisplay;

