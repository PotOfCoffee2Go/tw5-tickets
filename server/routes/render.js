const fs = require('fs');

// Render mustache templates
const Mustache = require('mustache');

// Page templates
const pages = {};

// Render template with dynamic data
const render = (cfg, req, res, template, ctx = {}) => {
  ctx.cfg = cfg;
  return res.send(Mustache.render(template, ctx));
}

// Render errror page
const renderError = (cfg, req, res, error, fname = '') => {
  let ctx = { error, fname };
  return render(cfg, req, res, pages.error, ctx);
}

// Load error page template
module.exports = (cfg) => {
  pages.error = fs.readFileSync(cfg.homeDir + '/server/routes/pages/error.html', { encoding: 'utf8' });
  return {render, renderError};
};
