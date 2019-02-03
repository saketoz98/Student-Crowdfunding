import React, { Component } from 'react';
import { Card, Button ,Image} from 'semantic-ui-react';
import factory from '../ethereum/factory';
import Layout from '../components/Layout';
import { Link } from '../routes';
import ipfs, { getJSON } from '../IPFS';
import Campaign from '../ethereum/campaign';
import campaign from '../ethereum/campaign';
import Head from 'next/head'





class CampaignIndex extends Component {
  state = {
    campaignInfo: [],
    loading: true
  }


  static async getInitialProps() {
    const campaigns = await factory.methods.getDeployedCampaigns().call();

    return { campaigns };
  }

//   async componentDidMount() {
    
//     console.log('*************************');
//     const newarray = [];
//         await Promise.all(this.props.campaigns.forEach(async (add) => {
//             const campaign = Campaign(add);
//             let ipfsTextHash = await campaign.methods.gettexthash().call();
//             // let ipfsImageHash = await campaign.methods.getimghash().call();
//             // let imghash = await ipfs.cat(ipfsImageHash)
//             const textData = await getJSON(ipfsTextHash);
//             const parsedtextdata = JSON.parse(textData);
//             const data = { ...parsedtextdata};
//             newarray.push(data);
//         })
//     ).catch(function(error){
//         console.log();
        
//     })
//     console.log(newarray);

//     console.log("componentdidmount");
//     this.setState({ campaignInfo: newarray, loading: false });

//   }


  renderCampaigns() {
    console.log("rederCampaign");
    console.log(this.props.campaigns);
    const items = this.props.campaigns.map((address, index) => {
    //   const dataCampaign = this.state.campaignInfo[index];
    //   const projectName = dataCampaign.projectName;
    //   const imgurl = dataCampaign.imgurl;

      // const img = ipfsImageHash.toString("base64");
      // console.log(ipfsImageHash);
        console.log('here!!!!!!!');
        
      return {
        header: address,
        description: (
          <div>
            {/* <Image src={imgurl} alt="no img" size='medium' wrapped/> */}
            <br/><br/>

            <Button inverted color='blue'  >
                <Link route={`/campaigns/${address}`}>

                <a>View Project</a>
                </Link>
            </Button>
            
          </div>
        ),
        
      };
    });

    return <Card.Group items={items} />;
  }

  render() {

    return (
      <Layout>
        <div>
          <Head>
            <title>Crowd Funding</title>
          </Head>
          <h3 class="ui red label">Open Projects</h3> <br></br><br></br>
          <Link route="/campaigns/new">
            <a>
              <Button
                floated="right"
                content="Create Project"
                icon="add circle"
                primary
              />
            </a>
          </Link>
          {
            (this.renderCampaigns())
          }

        </div>
      </Layout>
    );
  }
}

export default CampaignIndex;