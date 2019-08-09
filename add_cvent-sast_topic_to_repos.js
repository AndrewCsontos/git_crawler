const fs = require('fs');
const Octokit = require('@octokit/rest')

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

const repos = ['account-service'
  , 'admin'
  , 'api'
  , 'authenticator'
  , 'checkin-web'
  , 'document-service'
  , 'earth-portal'
  , 'endeavor'
  , 'endeavor-builder-lambda'
  , 'endeavor-ingestion-lambda'
  , 'endeavor-pdf'
  , 'endeavor-service'
  , 'ent-killer'
  , 'enterprise-manager'
  , 'enterprise-service'
  , 'event-service'
  , 'floor-plan-creator'
  , 'guestlist-service'
  , 'home-2018'
  , 'honorable-nyan'
  , 'lemmings'
  , 'leonardo-zone'
  , 'narrative-service'
  , 'notification-service'
  , 'onsite'
  , 'onsite-builder'
  , 'owlery'
  , 'property-liaison'
  , 'property-service'
  , 'proposal-manager'
  , 'proposal-service'
  , 'propose-pdf-worker'
  , 'render-engine'
  , 'S3'
  , 'venue-mapper'];


const start = async function() {


  for (var i=0; i< repos.length; i++) {
    var repoName = repos[i];

    console.log(repoName);

    const result = await octokit.repos.listTopics({owner: 'SocialTables', repo: repoName})
    topics = result.data.names;
    console.log(topics);
    const addResult = await addTopic(repoName, topics, 'cvent-sast');
    console.log(addResult);
    console.log();

  }
}

// Call start

console.log('do not use this.  It is used to set a topic on a repo')
start();


const addTopic = async function (repoName, existingTopics, newTopic) {

  if (existingTopics.includes(newTopic)) {
    return existingTopics;
  }

  var newTopics = (topics) ? existingTopics.slice(0) : [];
  newTopics.push(newTopic);

  const result = await octokit.repos.replaceTopics({
    owner: 'SocialTables',
    repo: repoName,
    names: newTopics
  })
  return result.data.names;
}
