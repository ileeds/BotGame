import React from "react";
import { Content, List, Tab } from "native-base";

const TabSection = ({ heading, renderFunction }) => {
  return (
    <Tab heading="Received Invites">
      <Content>
        <List>{renderFunction()}</List>
      </Content>
    </Tab>
  );
};

export { TabSection };
