import * as React from 'react';

import { tintData, isColorful } from './utils';

interface ReactImageTintProps {
  src: string;
  color: string;
  alt?: string;
  cache?: boolean;
};

interface ReactImageTintState {
  src: string;
};

export class ReactImageTint extends React.Component<ReactImageTintProps, ReactImageTintState> {
  _mounted: boolean = false;

  constructor(props: ReactImageTintProps) {
    super(props);

    this.state = {
      src: props.src
    };
  }

  componentDidMount() {
    this._mounted = true;

    this.applyTint(this.props.src, this.props.color);
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  componentWillReceiveProps(newProps: ReactImageTintProps) {
    if (newProps.src !== this.props.src) {
      this.applyTint(newProps.src, newProps.color);
    }
  }

  applyTint(src: string, color: string) {
    if (!isColorful(src) && this.refs.img) {
      const imgElement = this.refs.img as HTMLImageElement;

      tintData(imgElement, color, { cache: Boolean(this.props.cache) })
        .then((src) => this._mounted && this.setState({ src }));
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