import React from 'react';
import { Menu , Segment } from 'semantic-ui-react';
import { Link } from '../routes';

export default () => {
  return (
    <Segment inverted>
      <Menu inverted pointing secondary>
      <Link route="/">
        <a className="item">Crowd-Funding</a>
      </Link>

      <Menu.Menu position="right">
        <Link route="/">
          <a className="item">Campaigns</a>
        </Link>

        <Link route="/campaigns/new">
          <a className="item">+</a>
        </Link>
      </Menu.Menu>
    </Menu>
    </Segment>
  );
};