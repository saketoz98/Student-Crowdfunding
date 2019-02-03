import React, { Component } from 'react';
import { Card, Grid, Button } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import Campaign from '../../ethereum/campaign';
import web3 from '../../ethereum/web3';
import ContributeForm from '../../components/ContributeForm';
import { Link } from '../../routes';
import { getJSON } from '../../IPFS';
class CampaignShow extends Component {
  static async getInitialProps(props) {
    const campaign = Campaign(props.query.address);

    const summary = await campaign.methods.getSummary().call();
    let ipfsTextHash = await campaign.methods.gettexthash().call();
    const textData = await getJSON(ipfsTextHash);
    const parsedtextdata = JSON.parse(textData);


    return {
      address: props.query.address,
      minimumContribution: summary[0],
      balance: summary[1],
      requestsCount: summary[2],
      contributorsCount: summary[3],
      manager: summary[4],
      projectName: parsedtextdata.projectName,
      description: parsedtextdata.description,
      imgurl: parsedtextdata.imgurl
    };
  }

  renderCards() {
    const {
      balance,
      manager,
      minimumContribution,
      requestsCount,
      contributorsCount
    } = this.props;

    const items = [
      {
        header: manager,
        meta: 'Address of Developer',
        description:
          'Blockchain address of the developer.',
        style: { overflowWrap: 'break-word' }
      },
      {
        header: minimumContribution,
        meta: 'Minimum Contribution (wei)',
        description:
          'You must contribute at least this much wei to become an contributor'
      },
      {
        header: requestsCount,
        meta: 'Number of Requests',
        description:
          'A request tries to withdraw money from the contract. Requests must be approved by approvers'
      },
      {
        header: contributorsCount,
        meta: 'Number of Contributors',
        description:
          'Number of people who have already donated to this project'
      },
      {
        header: web3.utils.fromWei(balance, 'ether'),
        meta: 'Campaign Balance (ether)',
        description:
          'The balance is how much money this project has left to spend.'
      }
    ];

    return <Card.Group items={items} />;
  }

  render() {
    console.log(this.props.projectName);

    return (
      <Layout>
        <div class="ui grid ">
        <h1 class="eight wide column ui header">Project : {this.props.projectName}</h1>
        <div class="eight wide column"><h3><div className = "ui teal tag label">Description :</div><br></br>
        {this.props.description}</h3></div>
        </div>
        <br></br><br></br>

        <img src={this.props.imgurl} class="ui large image rounded bordered" ></img>
        <br></br><br></br>

        <div class="ui grid">
          <div class="eight wide column"><hr></hr></div>
        </div>
        
        <h3 class="ui red tag label">Details</h3>
        <br></br><br></br>
        <Grid>
          <Grid.Row>
            <Grid.Column width={10}>{this.renderCards()}</Grid.Column>

            <Grid.Column width={6}>
              <ContributeForm address={this.props.address} />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column>
              <Link route={`/campaigns/${this.props.address}/requests`}>
                <a>
                  <Button primary>View Requests</Button>
                </a>
              </Link>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Layout>
    );
  }
}

export default CampaignShow;