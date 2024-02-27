import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Avatar from 'react-avatar'
import { useSelector } from 'react-redux';
import { Heading,Center } from '@chakra-ui/react';
import { useState } from 'react';
import { useUpdateMutation } from '../app/slices/userApiSlice';

const Profile = () => {
  const {userInfo} = useSelector(state => state.auth)
  const [selectedFile,setSelectedFile] = useState()
  const [email,setEmail] = useState('')
  const [username,setUsername] = useState('')
  const [firstname,setFirstname] = useState('')
  const [lastname,setLastname] = useState('')
 
  const [previewSource,setPreviewSource] = useState()
  const [update] = useUpdateMutation()
  const handleSubmit = async (e)=>{
    e.preventDefault()

   const res = await update({email:email,username:username,profilePic:selectedFile,firstname:firstname,lastname:lastname}).unwrap()
   console.log(res)


  }
  const previewFile = (file) =>{
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = ()=>{
      setPreviewSource(reader.result)
    }
  }
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
  
  
   previewFile(file)
  
  };
  


  return (
         <>
 <Center className='mt-3'><Heading className='d-flex align-items-center'>Update your profile</Heading></Center>   
          <Container style={{width:'400px', marginTop:'2rem', marginBottom:'5rem'}}>
       
    
    
          <Form onSubmit={handleSubmit}>
                    <div style={{display:'flex',justifyContent:'center'}}>
                    

                    <Avatar name={userInfo.username} size="100" round={true} />
                    </div>
       
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control onChange={(e)=>setEmail(e.target.value)} name='email' type="email" value={userInfo.email} />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Username</Form.Label>
        <Form.Control onChange={(e)=>setUsername(e.target.value)} name='username' type="text" placeholder={userInfo.username} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>First Name</Form.Label>
        <Form.Control onChange={(e)=>setFirstname(e.target.value)} name='firstname' type="text" placeholder="Enter your firstname" />
        <Form.Label>Last Name</Form.Label>
        <Form.Control onChange={(e)=>setLastname(e.target.value)} name='lastname' type="text" placeholder="Enter your lastname" />
        <Form.File type = 'file' onChange={handleFileChange} />
      </Form.Group>
      {previewSource && (<img src={previewSource} style={{height:'300px'}}/>)}
     
      <Button variant="primary" type="submit">
        Edit
      </Button>
    </Form>
    </Container>
    </>
    
  )
}

export default Profile