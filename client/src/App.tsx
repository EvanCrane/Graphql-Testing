import React, { useState } from 'react';
import classNames from 'classnames'
import { Nav, NavItem, NavLink, TabContent, TabPane, Row, Col, Card, CardTitle, CardText, Button } from 'reactstrap';
import Queries from './components/Queries';
import Mutations from './components/Mutations';
import './App.css';

function App() {

  const [activeTab, setActiveTab] = useState('1');

  function toggle(tab: string) {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Graphql Testing App</h1>
      </header>
      <div className='body'>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classNames({ active: activeTab === '1' })}
              onClick={() => { toggle('1'); }}
            >
              <h2>Queries </h2>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classNames({ active: activeTab === '2' })}
              onClick={() => { toggle('2'); }}
            >
              <h2> Mutations </h2>
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
          <Row>
                <Col sm="12">
            {activeTab === '1' ? <Queries /> : null}
            </Col>
            </Row>
          </TabPane>
          <TabPane tabId="2">
          <Row>
                <Col sm="12">
            {activeTab === '2' ? <Mutations /> : null}
            </Col>
            </Row>
          </TabPane>
        </TabContent>
      </div>
    </div>
  );
}

export default App;
