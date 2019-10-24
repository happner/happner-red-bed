var expect = require('expect.js');
var delay = require('await-delay');
var mesh;
var Mesh = require('happner-2');
var config = require('../../__fixtures/test-project/happner-config');

describe(
  'start up mesh with component',
  function() {
    this.timeout(120000);

    before(function(done) {
      mesh = this.mesh = new Mesh();
      mesh.initialize(
        config,
        function(err) {
          if (err) return done(err);
          mesh.start(function(err) {
            if (err) {
              console.log(err.stack);
              return done(err);
            }
            return done();
          });
        }
      );
    });

    after(function(done) {
      mesh.stop({ reconnect: false }, done);
    });

    it('tests a flow execution through the component', function (done){
      mesh.exchange.nodered.callFlow('Flow 1', {test:'payload', arguments:['expected']}, function(e, payload){
        if (e) return done(e);
        expect(payload.test).to.be('payload');
        expect(payload['testComponent::testMethod']).to.be('expected');
        done();
      });
    });
  }
);
