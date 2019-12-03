import * as React from 'react';

import { tintData } from './utils';

interface ReactImageTintProps {
  src: string;
  color: string;
  alt: string;
};

interface ReactImageTintState {
  src: string;
};

export class ReactImageTint extends React.Component<ReactImageTintProps, ReactImageTintState> {
  constructor(props: ReactImageTintProps) {
    super(props);

    this.state = {
      src: props.src
    };
  }

  componentDidMount() {
    if (this.refs.img) {
      tintData(this.refs.img as HTMLImageElement, this.props.color)
        .then((src) => this.setState({ src }));
    }
  }

  componentWillReceiveProps(newProps: ReactImageTintProps) {
    if (newProps.src !== this.props.src) {
      tintData(this.refs.img as HTMLImageElement, newProps.color)
        .then((src) => this.setState({ src }));
    }
  }

  render() {
    return (
      <img
        src={this.state.src}
        alt={this.props.alt}
        ref="img"
        crossOrigin="anonymous"
      />
    );
  }
}