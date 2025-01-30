import { Component } from 'react';
import { Search } from './components/Search/Search/Search';

class App extends Component {
  handleSearch = (query: string) => {
    console.log('Поисковый запрос:', query);
  };

  render() {
    return (
      <div>
        <Search onSearch={this.handleSearch} />
      </div>
    );
  }
}

export default App;
