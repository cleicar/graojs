var fs = require('fs'), 
  path = require('path'), 
  rootPath = path.normalize(__dirname) + '/..',
  charset = 'utf-8',
  packageJson = JSON.parse(fs.readFileSync(rootPath+'/package.json', charset));

module.exports = exports = {
  packageJson: packageJson,
  ports : [{{server_ports}}],
  charset: charset,
  db: 'mongodb://{{mongodb_host}}/{{mongodb_db}}',
  rootPath: rootPath,
  localesPath: rootPath + '/config/locales',
  locales: ['pt-br', 'es', 'en'],
  defaultLocale: 'en',
  bundles: rootPath + '/bundles',
  name : packageJson.name,
  description : packageJson.description,
  templateEngine : 'jade',
  secretSession: 'FIXME AND RAND THIS',
  secretSalt: 'FIXME AND RAND THIS',
  hashAlgo: 'sha256',
  log : {
    transport : {
      console : { colorize: true, json : false, timestamp : true, level : 'info' },
      file : { filename : rootPath + '/log/{{name}}.log', json : false, level : 'error' }
    },
    exception : {
      console : { colorize: true, json : false, timestamp : true, level : 'info' },
      file : { filename : rootPath + '/log/{{name}}.log', json : false, level : 'error' }
    },
  }
};