console.log("--running publish--");

const ghpages = require('gh-pages');
const path = require('path');

ghpages.publish(path.resolve(__dirname + '/../public'), {
  branch: 'master',
  repo: 'https://' + process.env.GH_TOKEN + '@github.com/typestyle/typestyle.github.io.git'
}, (err) => {
  if (err) {
    console.log('--publish failed!--', err)
    return;
  }
  console.log("--publish done--");
});

