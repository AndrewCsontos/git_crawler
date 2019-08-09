const fs = require('fs');
const Octokit = require('@octokit/rest')
const octokit = new Octokit({
    auth: 'token ' + process.env.GIT_ACCESS_KEY,
    previews: [
        'mercy-preview'
    ]
})

const options = octokit.repos.listForOrg.endpoint.merge({ org: 'SocialTables', type: 'all' })
octokit.paginate(options)
  .then(repos => {
    console.log(repos.length);
    saveJson(repos);
  })

  function saveJson(repos) {
      var json = JSON.stringify(repos);

    fs.writeFile('data.txt', json, (err) => {  
        if (err) throw err;
        console.log('Data saved!');
    });
  }

