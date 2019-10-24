const Service = require('red-bed').Service;
const path = require('path');

class HappnerComponentService extends Service {

  constructor(config, common){
    super(config, common);
    this.__registeredFlows = {};
  }

  async init(){

  }

  async start(){

  }

  async stop(){

  }

  defaults(){

  }

  attach$happn($happn){
    this.$happn = $happn;
  }

  async callFlow(flowName, payload, callback){
    if (!this.__registeredFlows[flowName]) return callback(new Error(`flow with name ${flowName} does not exist`));
    this.__registeredFlows[flowName].node.send({
      payload,
      callback
    });
  }

  getFlows(){
    return this.common.utils.fileReadDataObject(`${this.config.projectPath}${path.sep}node-red${path.sep}red-bed-flows.json`);
  }

  getFlowData(flowId){
    return this.getFlows()
      .find((flow) => {
        return flow.id === flowId;
      });
  }

  async registerInNode(node, config){
    let flow = this.getFlowData(node.z);
    this.__registeredFlows[flow.label] = {
      flow,
      node,
      config
    };
  }
}

module.exports = HappnerComponentService;
