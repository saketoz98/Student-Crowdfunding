import React from 'react';
import { Menu , Segment, Button } from 'semantic-ui-react';
import { Link } from '../routes';
import Head from 'next/head'


export default () => {
  return (
    <div className = "mb-5">
      <Head>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossorigin="anonymous"/>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/js/bootstrap.min.js" integrity="sha384-B0UglyR+jN6CkvvICOB2joaf5I4l3gm9GU6Hc1og6Ls7i6U/mkkaduKaBhlAXv9k" crossorigin="anonymous"></script>
    </Head>

    <nav class="navbar navbar-expand-lg navbar-light bg-light shadow p-3 mb-5 bg-white rounded">
  <a class="navbar-brand" href="#">Crowd-Funding</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <Link route="/">
        <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
        </Link>
      </li>
      <li class="nav-item">
      <Link route="/campaigns">
        <a class="nav-link" href="#">Projects</a>
        </Link>
      </li>

    </ul>
    <Link route="/campaigns/new">
                <a>
                  <Button primary>Create Project </Button>
                </a>
      </Link>

    </div>
    </nav>
    </div>
  
  );
};