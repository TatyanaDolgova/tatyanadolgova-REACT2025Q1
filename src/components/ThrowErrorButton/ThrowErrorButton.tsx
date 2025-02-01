import { Component } from 'react';

interface ThrowErrorButtonState {
  hasError: boolean;
}

export class ThrowErrorButton extends Component<object, ThrowErrorButtonState> {
  constructor(props: object) {
    super(props);
    this.state = { hasError: false };
  }

  handleClick = () => {
    this.setState({ hasError: true });
  };

  render() {
    if (this.state.hasError) {
      throw new Error('Something went wrong in ThrowErrorButton!');
    }

    return (
      <button className="button error-button" onClick={this.handleClick}>
        Throw error
      </button>
    );
  }
}
