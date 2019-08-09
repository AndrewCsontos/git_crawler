// Read Synchrously
var fs = require("fs");


console.log("\n *Parsing local file* \n");
var content = fs.readFileSync("data.txt");
var repos = JSON.parse(content);

//console.log(repos[0]);
//doOld(repos);
doNew(repos);

function doNew(records) {

    const createCsvWriter = require('csv-writer').createObjectCsvWriter;
    const csvWriter = createCsvWriter({
        path: 'output.csv',
        header: [
            {id: 'name', title: 'NAME'},
            {id: 'lang', title: 'LANGUAGE'},
            {id: 'url', title: 'URL'},
            {id: 'created', title: 'CREATED'},
            {id: 'push', title: 'LAST PUSH'},
            {id: 'updated', title: 'UPDATED'},
            {id: 'topics', title: 'TOPICS'},
            {id: 'desc', title: 'DESCRIPTION'},
            {id: 'license', title: 'LICENSE'}

        ]
    });
     
    var records = [];
    for (var i=0; i< repos.length; i++) {
        var repo = repos[i];


        //we don't want to report on archived git repos
        if (repo.archived) {
            continue;
        }

        var record = {
            name : repo.name,
            lang : repo.language,
            url : repo.html_url,
            created : repo.created_at.substring(0,10),
            push : repo.pushed_at.substring(0,10),
            updated : repo.updated_at.substring(0,10),
            topics : repo.topics.join('|'),
            desc : repo.description
        }

        if (repo.license) {
            record['license'] = repo.license.key;
        }


        records.push(record);
    }
     
    csvWriter.writeRecords(records)       // returns a promise
        .then(() => {
            console.log('...Done');
        });

}
