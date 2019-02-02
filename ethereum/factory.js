import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x5496655eeb1d4616130b5f6051d63ffe654e5239'
);

export default instance;