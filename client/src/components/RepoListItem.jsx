import React from 'react';

const RepoListItem = ({repo}) => (
  <div className="repo">
    <a className="repo-link"href={repo.html_url}>{repo.description || 'Untitled Repo'}</a><br></br>
    <span># forks {repo.forks_count}</span> <br></br>
    <span>created {repo.created_at}</span>
  </div>

)





export default RepoListItem;