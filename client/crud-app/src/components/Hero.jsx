import Avatar from 'react-avatar';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Hero() {
const {userInfo} = useSelector(state => state.auth)
const navigate = useNavigate()
  return (
    <Card>

      <Card.Header as="h5">

     Welcome {userInfo?userInfo.username : 'User'}
      </Card.Header>
      <Card.Body>
        <Card.Title>{userInfo?'Save all your favorite guitar chords for easy access :)' : 'Login to ChordSaves'}</Card.Title>
        <Card.Text>
         Welcome to ChordSaves, save all your favorite chords here! Visit us anytime you want access to your favorite chords or those chords you can't seem to remember much!
        </Card.Text>
        <Button variant="primary" onClick={()=>userInfo?navigate('/profile'):navigate('/login')}>{userInfo ? 'Add chord' : 'Login'}</Button>
      </Card.Body>
    </Card>
  );
}

export default Hero;