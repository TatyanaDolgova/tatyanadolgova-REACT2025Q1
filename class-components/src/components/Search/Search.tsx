import React, { Component } from 'react';
import './Search.css';

interface SearchProps {
  onSearch: (searchTerm: string) => void;
  initialValue: string;
}

interface SearchState {
  searchTerm: string;
}

export class Search extends Component<SearchProps, SearchState> {
  constructor(props: SearchProps) {
    super(props);
    this.state = { searchTerm: props.initialValue };
  }
  componentDidMount() {
    const savedSearch = localStorage.getItem('searchRequest');
    if (savedSearch) {
      this.setState({ searchTerm: savedSearch });
    }
  }

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchTerm: event.target.value });
  };

  handleSearch = () => {
    this.props.onSearch(this.state.searchTerm);
  };

  render() {
    return (
      <div className="search-container">
        <input
          type="text"
          value={this.state.searchTerm}
          placeholder="Enter your query"
          className="search-input"
          onChange={this.handleInputChange}
        />
        <button onClick={this.handleSearch} className="button">
          Search
        </button>
      </div>
    );
  }
}
