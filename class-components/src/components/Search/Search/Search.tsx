import React, { Component } from 'react';
import './Search.css';

interface SearchProps {
  onSearch: (query: string) => void;
}

interface SearchState {
  searchTerm: string;
}

export class Search extends Component<SearchProps, SearchState> {
  constructor(props: SearchProps) {
    super(props);
    this.state = {
      searchTerm: '',
    };
  }
  componentDidMount(): void {
    const savedSearch = localStorage.getItem('searchRequest');
    if (savedSearch) {
      this.setState({ searchTerm: savedSearch });
    }
  }

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchTerm: event.target.value });
  };

  handleSearch = () => {
    const { onSearch } = this.props;
    let { searchTerm } = this.state;

    searchTerm = searchTerm.trim();

    localStorage.setItem('searchTerm', searchTerm);

    onSearch(searchTerm);
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
        <button onClick={this.handleSearch} className="search-button">
          Search
        </button>
      </div>
    );
  }
}
