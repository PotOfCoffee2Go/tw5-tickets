const fs = require('fs');
const _projectdir = require('path').resolve(__dirname, '..');

// Render mustache templates
const Mustache = require('mustache');

// Load error page template on starup
const pages = {
  error: fs.readFileSync(_projectdir + '/iframes/error.html', { encoding: 'utf8' }),
};

// Render template with dynamic data
const render = (cfg, req, res, template, ctx = {}) => {
  ctx.cfg = cfg;
  if (req.query.format === 'json') return res.json(ctx);
  return res.send(Mustache.render(template, ctx));
}

// Render errror page
const renderError = (cfg, req, res, error, fname = '') => {
  let ctx = { error, fname };
  return render(cfg, req, res, pages.error, ctx);
}

exports.render = render;
exports.renderError = renderError;
