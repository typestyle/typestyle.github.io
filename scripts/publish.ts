console.log("--running publish--");

const ghpages = require('gh-pages');
const path = require('path');

ghpages.publish(__dirname, {
  branch: 'master'
}, () => {
  console.log("--publish done--");
});

