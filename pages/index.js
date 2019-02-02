import React, { Component } from 'react';
import { Card, Button } from 'semantic-ui-react';
import factory from '../ethereum/factory';
import Layout from '../components/Layout';
import { Link } from '../routes';
import {getJSON} from '../IPFS';
import Campaign from '../ethereum/campaign';
import campaign from '../ethereum/campaign';

class CampaignIndex extends Component {
  state = {
    campaignInfo : []
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
  async componentDidMount(){
    this.props.campaigns.forEach(async (add)=>{
      const campaign = Campaign(add);
      let ipfsHash = await campaign.methods.getipfshash().call();
      const data = await getJSON(ipfsHash);
      this.setState({campaignInfo:this.state.campaignInfo.concat(JSON.parse(data))});
    })
  }
  renderCampaigns() {

    console.log(this.props.campaigns);

    const items = this.props.campaigns.map(address => {
      return {
        header : address,
        description: (
            <Link route={`/campaigns/${address}`}>
              <a>View Campaign</a>
            </Link>
          
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

          {this.renderCampaigns()}
        </div>
      </Layout>
    );
  }
}

export default CampaignIndex;