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
        <Card.Title>{userInfo && userInfo.role === 'admin' && 'Welcome to the admin panel, manage the users here!'}{userInfo && userInfo.role=='user'&&'Save all your favorite guitar chords for easy access :)'}{!userInfo&&'Login to save your chords here!'}</Card.Title>
        <Card.Text>
      { (userInfo && userInfo.role === 'user' || !userInfo )&&  'Welcome to ChordSaves, save all your favorite chords here! Visit us anytime you want access to your favorite chords or those chords you cant seem to remember much!'}
       {userInfo && userInfo.role === 'admin' && 'You can create new user, update a users data, search for users and delete a user : )'}
        </Card.Text>
       {(userInfo && userInfo.role == 'user' || !userInfo)  && <Button variant="primary" onClick={()=>userInfo?navigate('/profile'):navigate('/login')}>{userInfo ? 'Add chord' : 'Login'}</Button>}
      </Card.Body>
    </Card>
  );
}

export default Hero;