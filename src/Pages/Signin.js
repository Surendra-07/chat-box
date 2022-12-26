import React from 'react';
import { Button, Col, Container, Grid, Icon, Panel, Row } from 'rsuite';

const Signin = () => {
  return (
    <Container>
      <Grid>
        <Row>
          <Col xs={24} md={12} mdOffset={6}>
            <Panel>
              <div className="text-center">
                <h1>Welcome to Chat</h1>
                <p>Progressive chat platform for neophytes</p>

                <Button block color="blue">
                  <Icon icon="facebook" /> continue with facebook
                </Button>
              </div>
            </Panel>
          </Col>
        </Row>
      </Grid>
    </Container>
  );
};

export default Signin;
