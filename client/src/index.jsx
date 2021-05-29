import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
import axios from 'axios';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: [],
      loadingRepos: true
    }
    this.search = this.search.bind(this);
    this.updateStateFromDB = this.updateStateFromDB.bind(this);
  }

  search (term) {
    console.log(`${term} was searched`);
    let sendBody = {
      username: term
    }
    axios.post('/repos', sendBody)
      .then(sucess => {
        console.log('sucess')
        this.updateStateFromDB(term);
      })
  }

  updateStateFromDB(term) {
    return axios.get(`/repos`)
      .then(repos => {
        console.log('received repos from server: ', repos.data)
        this.setState({
          repos: repos.data
        })
      })
      .then(data => {
        this.setState({
          loadingRepos: false
        })
      })
  }

  componentDidMount() {
    this.updateStateFromDB();
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <Search onSearch={this.search}/>

      <RepoList repos={this.state.repos} state={this.state}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));