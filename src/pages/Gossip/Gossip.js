import React from 'react';
import WriteGossip from '@/pages/Gossip/components/WriteGossip';
import GossipWritings from '@/pages/Gossip/components/GossipWritings';

class Gossip extends React.Component {
  render() {
    return (
      <React.Fragment>
        <WriteGossip/>
        <GossipWritings/>
      </React.Fragment>
    );
  }
}

export default Gossip;
