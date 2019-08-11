const fs = require('fs');
const Octokit = require('@octokit/rest')

//Modify REPOS and TOPICS_TO_ADD
const REPOS = [];
const TOPICS_TO_ADD = '';


const octokit = new Octokit({
    auth: 'token ' + process.env.GIT_ACCESS_KEY,
    previews: [
        'mercy-preview' /*this enables the beta topics output */
    ]
})

octokit.hook.error('request', async (error, options) => {
    console.log('we got an error');
    throw error;
})


const start = async function() {

    if (!REPOS.length) {
        return new Error('REPOS constant is empty.  Modify code to add it.')
    }

    if (!TOPICS_TO_ADD) {
        return new Error('TOPICS_TO_ADD constant is empty.  Modify code to add it.')
    }

  for (var i=0; i< REPOS.length; i++) {
    var repoName = REPOS[i];

    console.log(repoName);

    const result = await octokit.repos.listTopics({owner: process.env.GIT_API_ORG, repo: repoName})
    topics = result.data.names;
    console.log(topics);
    const addResult = await addTopic(repoName, topics, TOPICS_TO_ADD);
    console.log(addResult);
    console.log();

  }
}

console.log('Modify code to set REPOS to a list of repositories to change, then TOPICS_TO_ADD with a list of topics')
start()
    .then (console.log)
    .catch(console.error)
;

const addTopic = async function (repoName, existingTopics, newTopic) {

  if (existingTopics.includes(newTopic)) {
    return existingTopics;
  }

  var newTopics = (topics) ? existingTopics.slice(0) : [];
  newTopics.push(newTopic);

  const result = await octokit.repos.replaceTopics({
    owner: process.env.GIT_API_ORG,
    repo: repoName,
    names: newTopics
  })
  return result.data.names;
}
