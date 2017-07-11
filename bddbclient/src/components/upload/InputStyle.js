import React from 'react';
import classnames from 'classnames';
import './upload.css';

const InputStyle = ({field, value, label, error, type, onChange}) => {
	return (
		<div className={classnames('form-group', {'has-error': error})}>
			<input type={type} value={value} onChange={onChange} name={field} className="input-form-control" placeholder={label}/>
			{error && <span className="help-block">{error}</span>}
		</div>
	);
}

InputStyle.propTypes = {
	field: React.PropTypes.string.isRequired,
	value: React.PropTypes.string.isRequired,
	label: React.PropTypes.string,
	error: React.PropTypes.string,
	type: React.PropTypes.string.isRequired,
	onChange: React.PropTypes.func.isRequired
}

InputStyle.defaultProps= {
	type: 'text'
}

export default InputStyle;