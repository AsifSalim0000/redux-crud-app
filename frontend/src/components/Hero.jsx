import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const Hero = () => {
  return (
    <div className=' py-5'>
          <Container>
      <Row className="my-4">
        <Col>
          <Card className="p-3">
            <Card.Body>
              <Card.Title>Welcome to Our Website</Card.Title>
              <Card.Text>
                We offer a variety of services to help you achieve your goals. Explore our site to learn more.
              </Card.Text>
              <Button variant="primary" href="/about">
                Learn More
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="my-4">
        <Col md={4}>
          <Card className="p-3">
            <Card.Body>
              <Card.Title>Service One</Card.Title>
              <Card.Text>
                Description of the first service offered by your company.
              </Card.Text>
              <Button variant="primary" href="/services/1">
                Learn More
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="p-3">
            <Card.Body>
              <Card.Title>Service Two</Card.Title>
              <Card.Text>
                Description of the second service offered by your company.
              </Card.Text>
              <Button variant="primary" href="/services/2">
                Learn More
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="p-3">
            <Card.Body>
              <Card.Title>Service Three</Card.Title>
              <Card.Text>
                Description of the third service offered by your company.
              </Card.Text>
              <Button variant="primary" href="/services/3">
                Learn More
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
    </div>
  );
};

export default Hero;
