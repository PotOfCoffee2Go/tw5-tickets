const fs = require('fs');

// Save web tiddler text from client
module.exports = (cfg, socket, data, callback) => {
  console.log(`\x1b[33mSocket fetch to save tiddler ${data.content.title} \x1b[0m`);
  fs.writeFile(cfg.homeDir + '/public/tiddlers/' + data.content.title + '.tid',
    data.content.tid, (err) => {
    if (err) {
      console.log('\x1b[31mserver.savetid error', err, '\x1b[0m');
    }
    else {
      console.log(`\x1b[33mserver.savetid successful ${data.content.title} \x1b[0m`);
    }
    data.body = {
      successful: err ? false : true,
      error: err,
    }
    callback({ data });
  })
}
