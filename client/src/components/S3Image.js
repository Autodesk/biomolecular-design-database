import React from 'react';
import fetch from 'isomorphic-fetch'

export default class S3Image extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleImage = this.handleImage.bind(this);
  }
  
  componentDidMount() {
    this.handleImage(this.props);
  }
  
  componentWillReceiveProps(nextProps) {
    this.handleImage(nextProps);
  }
  
  handleImage(props) {
    if (props.src) {
      fetch(`/api/files/file/getUrl?saveLink=${props.src}`)
      .then(resp => resp.json())
      .then(({ signedUrl }) => this.setState({ src: signedUrl }))
    }
  }
  
  render() {
    const { src, ...rest } = this.props;
    
    return (
      <img {...rest} src={this.state.src || ''} />
    );
  }
}

/*
Usage

import S3Image from './S3Image';

...

render() {
  <S3Image src="allFiles/1.1....." />
}
 */
