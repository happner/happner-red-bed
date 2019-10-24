const HappnerRedBedAuth = require('./auth.js');
const path = require('path');
const fs = require('fs-extra');

module.exports = HappnerRedBedComponent;

function HappnerRedBedComponent() {}

HappnerRedBedComponent.prototype.start = function($happn, callback) {
  this.server.container.services.happnerComponentService.attach$happn($happn);
  this.server.start()
    .then(() => {
      callback();
    })
    .catch(callback);
};

HappnerRedBedComponent.prototype.stop = function($happn, callback) {
  if (this.server) this.server.stop();
  callback();
};

HappnerRedBedComponent.prototype.copyNodes = function(projectPath){
  const nodesPath = path.resolve(__dirname, './nodes');
  const files = fs.readdirSync(nodesPath);
  files.forEach(function (file) {
    try{
      fs.unlinkSync(`${projectPath}${path.sep}nodes$${file}`);
    }catch(e){
      //do nothing
    }
    fs.copySync(`${nodesPath}${path.sep}${file}`, `${projectPath}${path.sep}nodes${path.sep}${file}`);
  });
};

HappnerRedBedComponent.prototype.init = function($happn, callback) {

  const config = $happn._mesh.config.components[$happn.name].config;
  this.__securityService = $happn._mesh.happn.server.services.security;
  this.__webServer = $happn._mesh.happn.server.server;
  this.__authService = HappnerRedBedAuth.create(this.__securityService);

  // $happn._mesh.happn.server.services.connect.middleware.security.config.exclusions.push('/nodered');
  // $happn._mesh.happn.server.services.connect.middleware.security.config.exclusions.push('/admin');
  // $happn._mesh.happn.server.services.connect.middleware.security.config.exclusions.push('/nodered-api');
  // $happn._mesh.happn.server.services.connect.middleware.security.config.exclusions.push('/favicon.ico');

  this.copyNodes(config.projectPath);

  this.server = require('red-bed').Server.create({
    projectPath: config.projectPath,
    serviceName: $happn.info.mesh.name,
    nodered:{
      httpAdminRoot: '/nodered',
      httpNodeRoot: '/nodered-api',
      //webServer: this.__webServer,
      adminAuth: this.__authService
    },
    services:{
      "$happner-component-service":{
        path:path.resolve(__dirname, './services/happner-component/happner-component-service.js')
      }
    }
  });

  this.server.init()
    .then(callback)
    .catch(callback);
};

HappnerRedBedComponent.prototype.callFlow = function($happn, flowName, msg, callback) {
  this.server.container.services.happnerComponentService.callFlow(flowName, msg, callback);
};
