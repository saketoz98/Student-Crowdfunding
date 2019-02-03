import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0xb09fa9b620ba8bb44e8eef2468a04af38c17712c'
);

export default instance;