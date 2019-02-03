import React, { Component } from 'react';
import { Form, Button, Input, Message, TextArea } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import { Router } from '../../routes';
import {setJSON} from '../../IPFS';
import ipfs from '../../IPFS';

class CampaignNew extends Component {
  state = {
    minimumContribution: '',
    errorMessage: '',
    loading: false,
    projectName : '',
    description : '',
    imageBuffer : null,
    ipfsTextHash : '',
    ipfsImageHash : '',
    imgurl : ''

  };

  captureFile = (event)=> {
    event.preventDefault()
    const file = event.target.files[0]
    const reader = new FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = () => {
      this.setState({ imageBuffer: Buffer(reader.result) })
      console.log('buffer', this.state.imageBuffer)
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
          imgurl : this.state.imgurl
        });

        // await ipfs.files.add(data, (error, result) => {
        //   if(error) {
        //     console.error(error)
        //     return
        //   }
          
        //     this.setState({ ipfsHash: result[0].hash })
        //     console.log('ifpsHash', this.state.ipfsHash)
        //   });
        const ipfsTextHash = await setJSON(data);
        console.log(ipfsTextHash);
        this.setState({ipfsTextHash});
        
        // const ipfsImageHash = await ipfs.add(this.state.imageBuffer);
        // console.log(ipfsImageHash);
        // this.setState({ipfsImageHash});

        

      try {
        console.log("**********try start*************");
      
        const accounts = await web3.eth.getAccounts();
        console.log(accounts);
        await factory.methods
          .createCampaign(this.state.minimumContribution, this.state.ipfsTextHash)
          .send({
            from: accounts[0]
          });
        console.log("project done");
        // change here
        Router.pushRoute('/campaigns');
      } catch (err) {
        this.setState({ errorMessage: err.message });
      }

      this.setState({ loading: false });
  }

  render() {
    return (
      <Layout>
        <h3>Create a Project</h3>

        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <label>Funding Goal</label>
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

            <Form.Field
              id='form-textarea-control-opinion'
              control={TextArea}
              label='Description'
              placeholder='Describe Your Project'
              value = {this.state.description}
              onChange = {event=> this.setState({description: event.target.value})}
            />
            <Form.Field>
            <label>Enter image URL</label>
            <Input
              type = 'text'
              value = {this.state.imgurl}
              onChange = {event=> this.setState({imgurl:event.target.value})}
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

