import { PropTypes } from 'prop-types';
import Card from 'react-bootstrap/Card';
import { ListGroup } from 'react-bootstrap';

export default function User({ userObj }) {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={userObj.photoURL} />
      <Card.Body>
        <Card.Title>{userObj.displayName}</Card.Title>
        <Card.Text>
          {userObj.email}
        </Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>Last Sign In: {userObj.metadata.lastSignInTime}</ListGroup.Item>
      </ListGroup>
    </Card>
  );
}

User.propTypes = {
  userObj: PropTypes.shape({
    photoURL: PropTypes.string,
    displayName: PropTypes.string,
    email: PropTypes.string,
    metadata: PropTypes.shape({
      lastSignInTime: PropTypes.string,
    }),
  }).isRequired,
};
