const https = require('https');

var options = {
  host: 'api.github.com',
  path: '/orgs/google/repos',
  method: 'GET',
  headers: {'user-agent': 'node.js'}
};

https.get(options, (resp) => {
  let data = '';
  let cntr = 0;
  let langs = [];

  resp.on('data', (chunk) => { data += chunk; });

  resp.on('end', () => {    

    for(var i = 0; i < JSON.parse(data).length; i++){
      langs[i] = JSON.parse(data)[i].language;
    }
    langs.sort();
    for(var i = 0; i < langs.length; i++){
      if (langs[i] === null) {
      } else if (i == 0){
        console.log(langs[i]);
        cntr = 1;          
      } else if (langs[i] != langs[i-1]){
        console.log(cntr);
        console.log(langs[i]);
        cntr = 1;
      } else {
        cntr++;
      }
    }
    console.log(cntr);
  });

}).on("error", (err) => {
  console.log("Error: " + err.message);
});
