import React from 'react';
import Lightbox from 'react-image-lightbox';
import { uploadFile } from '../../../actions/fileActions';
import { connect } from 'react-redux';

const customStyles = {
	overlay : {
	    position          : 'fixed',
	    zIndex 			  : 9999
	}
}

class NewFileBlock extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			isOpen: false,
            lightboxDisplay: '',
            title: '',
            details: '',
            file_link: '',
            tags: '',
            changed: false,
            project_id: 0
		}
		this.onChange = this.onChange.bind(this);
		this.doneClicked = this.doneClicked.bind(this);
		this.newFileBlockDelete = this.newFileBlockDelete.bind(this);
	}

	componentWillMount(){
		this.setState({ project_id: this.props.file.project_id });
		if(this.props.file.file_link){
			this.setState ({
				lightboxDisplay:	<Lightbox
						reactModalStyle={customStyles}
                        mainSrc={this.props.file.file_link}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    /> 
	    	});
		}
		this.setState({
			title: this.props.file.title,
			details: this.props.file.description
		});
	}
	
	doneClicked(e){	
		e.preventDefault();
		if(this.state.changed){
			this.props.uploadFile(this.state).then(
				(res) => {
					console.log(this.state);
					this.setState({ changed: false });
				},
				(err) => { this.context.router.push('/notfound');}
			);	
		}
	}
  	
  	newFileBlockDelete(e){
  		this.props.newFileDeleteClicked(this.props.id);
  	}

	onChange(e){
		e.preventDefault();
		if(!this.state.changed){
			this.setState({ changed: true, [e.target.name]: e.target.value });
		}
		else{
			this.setState({ [e.target.name]: e.target.value });
		}
	}

	imgOrNot(type){
		if(type){ //type is not null
			type = type.toString();
			if(type.indexOf('image') !== -1){
				return true;
			}
			return false;
		}
		return false;
	}

	toDisplayName(name){
		if(name === 'null'){
			return <p></p>;
		}
		return <span className="plain-background"><h5>{name}</h5></span>;
	}

	render(){
		const {
            isOpen, lightboxDisplay
        } = this.state;
		const nonImg = this.toDisplayName('upload');
		const imgBool = false;
		return(
			<div>
				<div className="single-new-file container-fluid" >
					<div className="file-title-write"><input type='text' placeholder="Title*" onChange={this.onChange} value={this.state.title ? this.state.title : ''} name="title" /></div>
					<div className="col-sm-12 file-image" >
						{imgBool ? <img className="img-responsive image-file-style" onClick={() => this.setState({ isOpen: true })} src={ this.props.file.file_link } alt=""/> : nonImg}
					</div>
					<div className="file-abstract-input">
						<textarea type='text' placeholder="File Details" value={this.state.details} onChange={this.onChange} name="details" rows='5'></textarea>
					</div>
					<div className="row file-btns">
						<button className="btn delete-file-btn" onClick={this.newFileBlockDelete}>Delete File Block</button>
						<button className="btn upload-media-btn">Upload Additional Media</button>
						<button className="btn done-file-btn" disabled={!this.state.changed} onClick={this.doneClicked}> Done </button>
					</div>
					{isOpen ? lightboxDisplay : ''}
					
				</div>
				<hr className="hr-display"/>
			</div>
		);
	}
}
NewFileBlock.propTypes = {
	file: React.PropTypes.object,
	newFileDeleteClicked: React.PropTypes.func
}
//updateFileItem: React.PropTypes.func,
//fileChanged: React.PropTypes.func

NewFileBlock.contextTypes = {
	router: React.PropTypes.object.isRequired
}

function mapStateToProps(state){
	return { auth: state.auth };
}

export default connect(mapStateToProps, {uploadFile})(NewFileBlock);
