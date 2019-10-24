const path = require('path');
module.exports = {
  name: 'meshname',
  happn: {
    secure: true,
    adminUsername: 'admin',
    adminPassword: 'test-admin'
  },
  modules: {
    testComponent: {
      path:path.resolve(__dirname, './components/test-component')
    },
    nodered: {
      path:'happner-red-bed'
    }
  },
  components: {
    testComponent:{
      accessLevel: 'mesh'
    },
    nodered: {
      accessLevel: 'mesh',
      initMethod: 'init',
      startMethod: 'start',
      stopMethod: 'stop',
      config:{
        projectPath:__dirname
      }
    }
  }
};
