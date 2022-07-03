const fs = require('fs');

// Request web tiddler text from the server
module.exports = (cfg, socket, data, callback) => {
  console.log(`\x1b[33mSocket fetch for static tiddler ${data.content.title} \x1b[0m`);
  fs.readFile(cfg.homeDir + '/public/tiddlers/' + data.content.title, 'utf8', (err, text) => {
    if (err) {
      console.log('\x1b[31mserver.tiddler error', err, '\x1b[0m');
      data.error = err;
      callback({ data });
      return;
    }
    data.body = {
      title: data.content.title.replace(/\.tid$/, ''),
      text: text,
    }
    callback({ data });
  })
}

