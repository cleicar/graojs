var path = require( 'path' ) ,
  fs = require( 'fs-extra' ),
  swig = require( 'swig' ),
  path = require( 'path' ),
  wrench = require( 'wrench'),
  __ = require ( 'underscore'),
  prompt = require( 'prompt' );

//"pattern": "[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,4}",
//"message": "Invalid email",

var GraoGenerator = function() {

  var self = this;

  this.config = {};
  this.defaults = {};
  this.skelPath = null;
  this.skelFilename = null;
  this.skelDefaultFilename = 'skeleton.json';
  this.currentDir = process.cwd();
  this.defaultSkels = {
    "app": "skeletons/app",
    "bundle": "skeletons/bundle",
    "schemabundle": "skeletons/schemabundle",
    "schema": "skeletons/schema"
  };
  this.args = {};
  this.argsSwig = {};

  this.init = function( type, skeleton ) {
    this.skelPath = skeleton === null
                  ? path.join( __dirname, '/../../', this.defaultSkels[type] )
                  : skeleton;

    this.skelFilename = path.join( this.skelPath, this.skelDefaultFilename );
    this.config = JSON.parse(
      fs.readFileSync(this.skelFilename, 'utf8').toString().replace(/\n/g,'')
    );

    var defaultData = path.join( process.cwd(), '/config/default.skeleton.json' );
    this.defaults = fs.existsSync( defaultData )
      ? JSON.parse( fs.readFileSync( defaultData ) )
      : {};

    Object.keys( this.defaults ).forEach( function( key ) {
      if( self.config.properties[key] ) {
        self.config.properties[key]['default'] = defaults[key];
      }
    });
  }

  this.generate = function( args, force, callback ) {

    console.log( "\n" + ( 'Loading from: ' + this.skelFilename ).green + "\n" );

    var tpls = this.prepareTplPaths( this.config, this.skelPath, args );

    self.writeTpls( tpls, args, force );

    if ( callback && typeof( callback ) === "function" ) {
      callback( this );
    }

  };

  this.prepareTplPaths = function( config, sourcePath, args ) {

    var sourceFiles = wrench.readdirSyncRecursive( sourcePath );
    var tpls = {};

    for (var i in sourceFiles) {

      if( fs.statSync( path.join( sourcePath, sourceFiles[i] ) ).isFile() ) {

        if (
          ! this.checkIgnore( config.ignores, sourceFiles[i] )
          && this.checkConditions( config.conditions, sourceFiles[i], args )
          ) {

          var file = this.rewrite( config.rewrites, sourceFiles[i]);

          tpls[ path.join( sourcePath, sourceFiles[i] ) ] = this.swigRender(
            path.join( config.target, file ),
            args
          );

        }

      }

    }

    return tpls;
  }

  this.writeTpls = function ( tpls, args, force ) {

    var skelPath = this.skelPath;

    Object.keys( tpls ).forEach( function( tpl ) {

      var dist = tpls[tpl];
      var distDir = path.dirname( dist );

      if( fs.statSync( tpl ).isFile() ) {
        wrench.mkdirSyncRecursive( distDir );

        fs.exists( './' + dist, function ( exists ) {

          if ( ! exists || force ) {
            fs.writeFileSync( dist, self.swigRender( fs.readFileSync( tpl , 'utf-8' ), args ) );
            console.log( ( '+ ' + './' + dist ).green );
          } else {
            console.log( ( '! ' + './' + dist ).red );
          }

        });

      } else {
        this.writeDir( distDir, tpl, dist );
      }
    });
  };

  this.writeDir = function ( distDir, tpl, dist ) {

    wrench.mkdirSyncRecursive( distDir );
    wrench.copyDirSyncRecursive( tpl, dist );
    wrench.readdirSyncRecursive( dist ).forEach( function( file ) {

      file = path.join( dist, file );
      fs.writeFileSync( file, swig.render( fs.readFileSync( file, 'utf-8' ), swig_result ), 'utf-8' );

    });
  };

  this.swigRender = function(content, args) {

    Object.keys( args ).forEach( function( arg ) {
      self.argsSwig[ arg.replace('-', '_') ] = args[arg];
    });

    var locals = { locals:this.argsSwig };

    return swig.render( content, locals );
  }

  this.checkIgnore = function( ignores, file ) {

    for (var i in ignores) {

      var pattern = "^" + ignores[i].replace(/\//g,"\\/").replace(/\./g,"\\.") + ".*";
      var regex = RegExp( pattern );

      if ( file.match( regex ) ) {
        return true;
      }

    }

    return false;

  }

  this.rewrite = function( rewrites, file ) {

    if ( rewrites.hasOwnProperty( file )) {
      return rewrites[ file ];
    } else {
      return file;
    }

  }

  this.checkConditions = function( conditions, file, args ) {

    for (var i in conditions) {

      var condition = conditions[i];

      for ( var j in condition.matches) {

        var pattern = "^" + condition.matches[j].replace(/\//g,"\\/").replace(/\./g,"\\.") + ".*";
        var regex = RegExp( pattern );
        if ( file.match( regex ) ) {

          var rule = true;

          for ( var j in condition.rules) {

            var rl = condition.rules[j];
            if ( rl.value !== args[ rl.arg ]) {
              rule = false;
              break;
            }

          }
          return rule;
        }
      }
    }
    return true;
  }
}

function onErr( err ) {
  console.log( err );
  return 1;
}

module.exports = exports = GraoGenerator;
