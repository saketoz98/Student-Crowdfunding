import React, { Component } from 'react';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import { Router } from '../../routes';
import {setJSON,getJSON} from '../../IPFS';

class CampaignNew extends Component {
  state = {
    minimumContribution: '',
    errorMessage: '',
    loading: false,
    projectName : '',
    description : '',
    imageBuffer : null,
    ipfsHash : ''

  };

  captureFile = (event)=> {
    event.preventDefault()
    const file = event.target.files[0]
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = () => {
      this.setState({ imageBuffer: Buffer(reader.result) })
      console.log('buffer', this.state.buffer)
    }
  }

  onSubmit = async event => {
    event.preventDefault();

    this.setState({ loading: true, 
          errorMessage: '',
          
        });
        // ipfs.files.add(this.state.buffer, (error, result) => {
        //   if(error) {
        //     console.error(error)
        //     return
        //   }
        //   this.simpleStorageInstance.set(result[0].hash, { from: this.state.account }).then((r) => {
        //     return this.setState({ ipfsHash: result[0].hash })
        //     console.log('ifpsHash', this.state.ipfsHash)
        //   })
        // })

        const data = JSON.stringify({
          projectName : this.state.projectName,
          description : this.state.description,
          imageBuffer : this.state.imageBuffer
        });

        // await ipfs.files.add(data, (error, result) => {
        //   if(error) {
        //     console.error(error)
        //     return
        //   }
          
        //     this.setState({ ipfsHash: result[0].hash })
        //     console.log('ifpsHash', this.state.ipfsHash)
        //   });
        const ipfsHash = await setJSON(data);
        console.log(ipfsHash);
        console.log(typeof ipfsHash);
        this.setState({ipfsHash});
        

        

      try {
        console.log("try start");
        const accounts = await web3.eth.getAccounts();
        console.log(accounts);
        await factory.methods
          .createCampaign(this.state.minimumContribution, this.state.ipfsHash)
          .send({
            from: accounts[0]
          });
        console.log("campaign done");
        Router.pushRoute('/');
      } catch (err) {
        this.setState({ errorMessage: err.message });
      }

      this.setState({ loading: false });
  }

  render() {
    return (
      <Layout>
        <h3>Create a Campaign</h3>

        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <label>Minimum Contribution</label>
            <Input
              label="wei"
              labelPosition="right"
              value={this.state.minimumContribution}
              onChange={event =>
                this.setState({ minimumContribution: event.target.value })}
            />
            </Form.Field>
            <Form.Field>
              <label>Project Name</label>
              <Input 
                value = {this.state.projectName}
                onChange = {event=>
                  this.setState({projectName:event.target.value})
                }
              />
            </Form.Field>

            <Form.Field>
            <label>Description</label>
            <Input
              value={this.state.description}
              onChange={event =>
                this.setState({ description:event.target.value })}
            />                            
            </Form.Field>
            <Form.Field>
            <label>Upload Image</label>
            <Input
              type = 'file'
              onChange = {this.captureFile}
            />                            
            </Form.Field>
          <Message error header="Oops!" content={this.state.errorMessage} />
          <Button loading={this.state.loading} primary>
            Create!
          </Button>
        </Form>
      </Layout>
    );
  }
}

export default CampaignNew;

