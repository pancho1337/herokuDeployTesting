import React from 'react';
import RepoListItem from './RepoListItem.jsx';

const RepoList = ({repos, state}) => {
  if (state.loadingRepos) {
    return <h3>loading</h3>
  }

  return(
    <div className="repo-list-container">
      <h4> Repo List Component </h4>
      <div className="username-image">
        <h3>Top Dog: {repos[0].owner.login}</h3>
        <img className="github-avatar" src={repos[0].owner.avatar_url}/>
      </div>
      {repos.map(repo => {
        return <RepoListItem repo={repo} key={repo._id}/>
      })}
    </div>
  )
}

export default RepoList;