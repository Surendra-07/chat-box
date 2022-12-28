import React from 'react';
import { Alert, Button, Col, Container, Grid, Icon, Panel, Row } from 'rsuite';

import {
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from 'firebase/auth';
import { auth, database } from '../misc/firebase';
import { ref, set } from 'firebase/database';

const Signin = () => {
  const SignInProvider = (auth, provider) => {
    try {
      signInWithPopup(auth, provider).then(result => {
        const user = result.user;

        Alert.success('Signed in');
        set(ref(database, `/profiles/${user.uid}`), {
          username: user.displayName,
          email: user.email,
          createdAt: user.metadata.creationTime,
        });
      });
    } catch (err) {
      Alert.error(err.message, 4000);
    }
  };

  const onGoogleSignIn = () => {
    const provider = new GoogleAuthProvider();
    SignInProvider(auth, provider);
  };
  const onFacebookSignIn = () => {
    const provider = new FacebookAuthProvider();
    console.log(provider);
    SignInProvider(auth, provider);
  };

  return (
    <Container>
      <Grid className="mt-page">
        <Row>
          <Col xs={24} md={12} mdOffset={6}>
            <Panel>
              <div className="text-center">
                <h1>Welcome to Chat</h1>
                <p>Progressive chat platform for neophytes</p>
                <div className="mt-3">
                  <Button block color="blue" onClick={onFacebookSignIn}>
                    <Icon icon="facebook" /> Continue with facebook
                  </Button>
                  <Button block color="green" onClick={onGoogleSignIn}>
                    <Icon icon="google" /> Continue with Google
                  </Button>
                </div>
              </div>
            </Panel>
          </Col>
        </Row>
      </Grid>
    </Container>
  );
};

export default Signin;
