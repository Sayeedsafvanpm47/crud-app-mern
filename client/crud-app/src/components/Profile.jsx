import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Avatar from 'react-avatar'
import { useDispatch, useSelector } from 'react-redux';
import { Heading,Center } from '@chakra-ui/react';
import { useState } from 'react';
import { useUpdateMutation } from '../app/slices/userApiSlice';
import { useNavigate } from 'react-router-dom';
import { setCredentials } from '../app/slices/authSlice';
import { showToastError,showToastSuccess } from '../services/toastServices';

const Profile = () => {
  const {userInfo} = useSelector(state => state.auth)
  const [selectedFile,setSelectedFile] = useState('')
  const [email,setEmail] = useState('')
  const [username,setUsername] = useState('')
  const [firstname,setFirstname] = useState('')
  const [lastname,setLastname] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
 
  const [previewSource,setPreviewSource] = useState()
  const [update] = useUpdateMutation()
  const handleSubmit = async (e)=>{
    e.preventDefault()
    if(!previewSource) return 
    uploadImage(previewSource)

 try {
  const res = await update({email:email,username:username,profilePic:previewSource,firstname:firstname,lastname:lastname}).unwrap()
  console.log('res',res)
   if(res)
   {
     dispatch(setCredentials({...res}))
   }
   showToastSuccess('Profile updated successfully')
   navigate('/')
   if (res.error) {
 
    throw new Error(res.error);
  }
 } catch (error) {
showToastError('File size too large')
    if (error.message.includes('Payload Too Large')) {
      // Handle file size exceeds limit on the frontend
      
    }
 }
 
  }
  const uploadImage = (base64EncodedImage)=>{
    console.log(base64EncodedImage)
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
  setSelectedFile(file)
  
   previewFile(file)
  
  };
  


  return (
         <>
 <Center className='mt-3'><Heading className='d-flex align-items-center'>Update your profile</Heading></Center>   
          <Container style={{width:'400px', marginTop:'2rem', marginBottom:'5rem'}}>
       
    
    
          <Form onSubmit={handleSubmit}>
                    <div style={{display:'flex',justifyContent:'center'}}>
                    {console.log('frontend pic',userInfo.profilePic)}
                

                   {userInfo && userInfo.profilePic ? (<Avatar style={{border:'1px solid'}} src={`https://res.cloudinary.com/dkxyzzuss/image/upload/${userInfo.profilePic}`} name={userInfo.username} size="100" round={true} />) : (<Avatar style={{border:'1px solid'}} name={userInfo.username} size="100" round={true} />)}
                    </div>
       
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control onChange={(e)=>setEmail(e.target.value)} name='email' type="email" value={userInfo.email} />
        <Form.Text className="text-muted">
      
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Username</Form.Label>
        <Form.Control onChange={(e)=>setUsername(e.target.value)} name='username' type="text" placeholder={userInfo.username} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>First Name</Form.Label>
        <Form.Control onChange={(e)=>setFirstname(e.target.value)} placeholder={userInfo?.firstname || "Enter your firstname"} name='firstname' type="text" />
        <Form.Label>Last Name</Form.Label>
        <Form.Control onChange={(e)=>setLastname(e.target.value)} placeholder={userInfo?.lastname || 'Enter your lastname'}  name='lastname' type="text"  />
        <Form.Control type = 'file' onChange={handleFileChange} />
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