import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import {
  Container,
  Col,
  Row,
  Button,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import Fade from 'react-reveal';
import Header from './Header';
import endpoints from '../constants/endpoints';
import FallbackSpinner from './FallbackSpinner';
import aboutme from '../constants/aboutme';

const styles = {
  introTextContainer: {
    margin: 10,
    flexDirection: 'column',
    whiteSpace: 'pre-wrap',
    textAlign: 'left',
    fontSize: '1.1rem',
    fontWeight: 500,
    wordWrap: 'break-word',
    overflowWrap: 'break-word',
  },
  introImageContainer: {
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
  ctaContainer: {
    marginTop: '30px',
    textAlign: 'center',
  },
  ctaButton: {
    margin: '10px',
  },
};

function About(props) {
  const { header } = props;
  const [data, setData] = useState(null);

  const parseIntro = (text) => (
    <ReactMarkdown
      children={text}
    />
  );

  useEffect(() => {
    fetch(endpoints.about, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);
  }, []);

  return (
    <>
      <Header title={header} />
      <div className="section-content-container">
        <Container>
          {data
            ? (
              <Fade>
                <Row>
                  <Col className="introTextContainer" style={styles.introTextContainer}>
                    {parseIntro(data.about)}
                    <div style={styles.ctaContainer}>
                      <h3>Let&apos;s Build Something Great Together!</h3>
                      <p>
                        Ready to transform your ideas into impactful digital solutions ?
                        <br />
                        Explore my portfolio to see my work in action.
                      </p>
                      <div>
                        <Button variant="primary" href={aboutme.projects} style={styles.ctaButton}>
                          View My Work
                        </Button>
                        <Button variant="secondary" href={aboutme.home} style={styles.ctaButton}>
                          Let&apos;s Connect
                        </Button>
                      </div>
                    </div>
                  </Col>
                  <Col className="introImageContainer" style={styles.introImageContainer}>
                    <img src={data?.imageSource} alt="profile" />
                  </Col>
                </Row>
              </Fade>
            )
            : <FallbackSpinner />}
        </Container>
      </div>
      <style>
        {`
          @media (max-width: 400px) {
            .introTextContainer {
              font-size: 1.1em !important;
              padding: 0 33px !important;
            }
            .introImageContainer img {
              width: 350px;
              height: auto;
            }
          }
        `}
      </style>
    </>
  );
}

About.propTypes = {
  header: PropTypes.string.isRequired,
};

export default About;
