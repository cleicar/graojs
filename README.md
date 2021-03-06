graoJS
======

graoJS - A full stack MVC NodeJS framework
------------------------------------------

Today, this project is a scaffolding, based on angularjs, twitter bootstrap, jade, express 3.x, mongoose and mongoose-validator.

If you like this project, put your hands in the code and evaluate somethings

- Add passport in package.json of skeleton
- Fix public refs of javascript, css and others. We need support multi domains of APP
-	On schemas, change JSON to FIELDS(it's a literal object)
-	Remove the big injection container by named paramenters. Use modules, it's more natural for nodejs community
-	Remove express encapsulated code and turn on middlewares
-	Add ejs template, jade is very slow
- Add html template
- Add react.js
- https://github.com/baryshev/template-benchmark
- https://github.com/baryshev/template-benchmark
- https://github.com/alubbe/jade-ejs-bench
- Add new depends(social, gallery...)
- Add modeling -> 80%
- Add deployer -> 50%
- Add importer -> 80%
- Add LOG/AUDIT/MONIT
- Add benchmark -> 50%
-	Update all packages(express 4 or koa ? :))

#### RoadMap
-	Fork and tell to us :).

#### INSTALL DEPENDS
- https://nodejs.org/en/download/package-manager/
- https://docs.mongodb.org/manual/tutorial/install-mongodb-on-ubuntu/

##### Ubuntu like:
NodeJS:
- curl --silent --location https://deb.nodesource.com/setup_4.x | sudo bash -

MongoDB:
- sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
- (+14.04) echo "deb http://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/3.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.0.list 
- sudo apt-get update
- sudo apt-get install -y mongodb-org

- Other toys:
- - https://drill.apache.org/docs/install-drill-introduction/
- - https://www.elastic.co/products/kibana
- - https://hadoop.apache.org/
- Views:
- - http://getbootstrap.com/
- - http://getuikit.com/index.html
- - http://metroui.org.ua/
- - http://materializecss.com/mobile.html
- - http://foundation.zurb.com/apps/page-templates.html
- - http://purecss.io/
- - https://onsen.io/v2/
- Improve DOC:
- - swagger.io
- - http://www.fusioncharts.com/blog/2013/12/jsdoc-vs-yuidoc-vs-doxx-vs-docco-choosing-a-javascript-documentation-generator/
- - https://github.com/rtfd/readthedocs.org
- - http://tech.rgou.net/tag/sphinx-pocoo-tag/
- - http://johnmacfarlane.net/pandoc/
- Profiling
- - https://nodesource.com/products/nsolid
- - https://developer.atlassian.com/blog/2015/10/profiling-node-apps/
- - https://www.npmjs.com/package/v8-profiler
- - https://www.codementor.io/nodejs/tutorial/nodejs-profiling
- - https://strongloop.com/strongblog/studio-arc-and-demo/
- - https://nodejs.org/en/docs/guides/simple-profiling/
- - https://nodejs.org/en/blog/uncategorized/profiling-node-js/
- - https://nodesource.com/blog/profiling-node-js-applications/
- - https://www.dynatrace.com/technologies/nodejs-monitoring/
- Passwords
- - https://auth0.com/
- - https://github.com/florianheinemann/passwordless
- - https://medium.com/@ninjudd/passwords-are-obsolete-9ed56d483eb#.owf2p82oa
- - https://stormpath.com/blog/making-expressjs-authentication-fun-again
- - https://github.com/jaredhanson/passport
- - https://github.com/simov/grant
- - https://github.com/jwtk/njwt
- Battle
- - https://github.com/strongloop/loopback-example-relations

##### graoJS install and run:
-	sudo npm install -g graojs
-	grao generate:app demo
-	node demo/index.js 

##### Other command options
-	grao
