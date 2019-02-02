import React, { Component } from 'react';
import { Card, Button } from 'semantic-ui-react';
import factory from '../ethereum/factory';
import Layout from '../components/Layout';
import { Link } from '../routes';
import ipfs, {getJSON} from '../IPFS';
import Campaign from '../ethereum/campaign';
import campaign from '../ethereum/campaign';

class CampaignIndex extends Component {
  state = {
    campaignInfo : [],
    loading : true
  }
  static async getInitialProps() {
    const campaigns = await factory.methods.getDeployedCampaigns().call();
    
    // for (let add in campaigns){
    //   const campaign = Campaign(add);
    //   let ipfsHash = await campaign.methods.getipfshash().call();
    //   console.log(ipfsHash);
    // } 
    
    return { campaigns };
  }

  // byte_to_image=(msg)=>{
  //   var arrayBuffer = msg.imageBuffer;
  //   var bytes = new Uint8Array(arrayBuffer);

  //   return 'data:image/png;base64,'+encode(bytes);
  // } 
  async componentDidMount(){
    console.log('*************************');
    this.props.campaigns.forEach(async (add)=>{
      const campaign = Campaign(add);
      let ipfsTextHash = await campaign.methods.gettexthash().call();
      let ipfsImageHash = await campaign.methods.getimghash().call();
      // let imghash = await ipfs.cat(ipfsImageHash)
      const textData = await getJSON(ipfsTextHash);
      const parsedtextdata = JSON.parse(textData);
      const data = {...parsedtextdata,ipfsImageHash:ipfsImageHash};
      this.setState({campaignInfo:this.state.campaignInfo.concat(data),loading:false});
    })
  }
  renderCampaigns() {

    console.log(this.props.campaigns);

    const items = this.props.campaigns.map((address,index) => {
      const dataCampaign = this.state.campaignInfo[index];
      console.log(dataCampaign);
      const projectName = this.state.campaignInfo[index].projectName;
      console.log(projectName);
      
      // const img = ipfsImageHash.toString("base64");
      // console.log(ipfsImageHash);
      
      return {
        header : projectName,
        description: (
          <div>
            {/* <img src={`data:image/jpeg;base64/${img}`} alt="no img"/> */}

            <Link route={`/campaigns/${address}`}>

              <a>View Project</a>
            </Link>
          </div>         
        ),
        fluid: true
      };
    });

    return <Card.Group items={items} />;
  }
 
  render() {
   
    return (
      <Layout>
        <div>
          <h3>Open Campaigns</h3>
          <Link route="/campaigns/new">
            <a>
              <Button
                floated="right"
                content="Create Campaign"
                icon="add circle"
                primary
              />
            </a>
          </Link>
          {
            this.state.loading ? <div>..Loading</div> : this.renderCampaigns()
          }
          
        </div>
      </Layout>
    );
  }
}

export default CampaignIndex;