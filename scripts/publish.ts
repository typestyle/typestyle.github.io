console.log("--running publish--");

const ghpages = require('gh-pages');
const path = require('path');

ghpages.publish(__dirname, {
  branch: 'master'
}, (err) => {
  if (err) {
    console.log('--publish failed!--', err)
    return;
  }
  console.log("--publish done--");
});

