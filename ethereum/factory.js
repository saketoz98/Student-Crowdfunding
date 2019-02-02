import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0xfae46a9028d237b3a837f9d188042def27f03aef'
);

export default instance;