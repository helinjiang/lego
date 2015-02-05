var path = require('path');
var legorc = require('legorc');
var serveLEGO = require('serve-lego');
var internalIp = require('internal-ip');

var pkg = require(path.join(process.cwd(), 'package.json'));
exports.package = pkg;

// {{ settings for nico

exports.theme = __dirname;
exports.source = process.cwd();
exports.output = path.join(process.cwd(), '_site');
exports.permalink = '{{directory}}/{{filename}}.html';
exports.google = 'UA-50522089-2';
exports.yuanUrl = require('legorc').get('registry');
exports.internalIp = internalIp();
exports.ignorefilter = function(filepath, subdir) {
  var extname = path.extname(filepath);
  var filename = path.basename(filepath);
  // dotfiles
  if (extname === '' && filename.indexOf('.') === 0) {
    return false;
  }
  if (extname === '.tmp' || extname === '.bak') {
    return false;
  }
  if (/\.DS_Store/.test(filepath)) {
    return false;
  }
  if (new RegExp('^' + legorc.get('install.path')).test(subdir) &&
      /\.(md|markdown|html|psd|zip|yml)/.test(path.extname(filepath))) {
    return false;
  }
  if (/^(_site|_theme|node_modules|\.idea)/.test(subdir)) {
    return false;
  }
  return true;
};
exports.writers = [
  'nico.PageWriter',
  'nico.StaticWriter',
  'nico.FileWriter',
  'nico.MochaWriter'
];

exports.middlewares = [
  {
    name: 'Serve LEGO',
    filter: /\.(css|less|js|json|tpl|handlebars|png|gif|jpg|jpeg)$/,
    handle: serveLEGO(exports.output)
  }
];

// end settings }}