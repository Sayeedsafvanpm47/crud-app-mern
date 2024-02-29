import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Avatar from 'react-avatar';
import { useDispatch, useSelector } from 'react-redux';
import { Heading, Center } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useUpdateMutation } from '../app/slices/userApiSlice';
import { useNavigate } from 'react-router-dom';
import { setCredentials } from '../app/slices/authSlice';
import { showToastError, showToastSuccess } from '../services/toastServices';
import { useFormik } from 'formik';
import * as Yup from 'yup';


const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  username: Yup.string().min(3, 'Username must be at least 3 characters').required('Username is required'),
  firstname: Yup.string().min(3, 'First name must be at least 3 characters').required('First name is required'),
  lastname: Yup.string().min(3, 'Last name must be at least 3 characters').required('Last name is required'),
});

const Profile = () => {
  const { userInfo } = useSelector(state => state.auth);
  if(userInfo){
 
  const [selectedFile, setSelectedFile] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [previewSource, setPreviewSource] = useState();
  const [update] = useUpdateMutation();

  const formik = useFormik({
    initialValues: {
      email: userInfo.email || '',
      username: userInfo.username || '',
      firstname: userInfo.firstname || '',
      lastname: userInfo.lastname || '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      if (previewSource) {
        uploadImage(previewSource);
      }else showToastError('Please upload an image')
    
      try {
        const updateData = {
          email: values.email,
          username: values.username,
          firstname: values.firstname,
          lastname: values.lastname,
          role : userInfo.role || 'user'
        };
    
        if (previewSource) {
          updateData.profilePic = previewSource;
        }else{
          updateData.profilePic = userInfo.profilePic || ''
        }
    
        const res = await update(updateData).unwrap();
        console.log(res)
        if (res) {
          dispatch(setCredentials({ ...res }));
        }
    
        showToastSuccess('Profile updated successfully');
        navigate('/');
      } catch (error) {
        showToastError('Something went wrong');
        console.log(error)
       
      }
    },
  });

  const uploadImage = (base64EncodedImage) => {
    console.log(base64EncodedImage);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    previewFile(file);
  };

  return (
    <>
      <Center className='mt-3'>
        <Heading className='d-flex align-items-center'>Update your profile</Heading>
      </Center>
      <Container style={{ width: '400px', marginTop: '2rem', marginBottom: '5rem' }}>
        <Form onSubmit={formik.handleSubmit}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            {userInfo && userInfo.profilePic ? (
              <Avatar style={{ border: '1px solid' }} src={`https://res.cloudinary.com/dkxyzzuss/image/upload/${userInfo.profilePic}`} name={userInfo.username} size='100' round={true} />
            ) : (
              <Avatar style={{ border: '1px solid' }} name={userInfo.username} size='100' round={true} />
            )}
          </div>

          <Form.Group className='mb-3' controlId='formBasicEmail'>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              name='email'
              type='email'
           
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email && <div className='error'>{formik.errors.email}</div>}
          </Form.Group>

          <Form.Group className='mb-3' controlId='formBasicPassword'>
            <Form.Label>Username</Form.Label>
            <Form.Control
              name='username'
              type='text'
              placeholder={userInfo.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
            />
            {formik.touched.username && formik.errors.username && <div className='error'>{formik.errors.username}</div>}
          </Form.Group>

          <Form.Group className='mb-3' controlId='formBasicPassword'>
            <Form.Label>First Name</Form.Label>
            <Form.Control
              name='firstname'
              type='text'
              placeholder={userInfo?.firstname || 'Enter your firstname'}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.firstname}
            />
            {formik.touched.firstname && formik.errors.firstname && <div className='error'>{formik.errors.firstname}</div>}
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              name='lastname'
              type='text'
              placeholder={userInfo?.lastname || 'Enter your lastname'}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.lastname}
            />
            {formik.touched.lastname && formik.errors.lastname && <div className='error'>{formik.errors.lastname}</div>}
            <Form.Control style={{marginTop:'1rem'}} type='file' onChange={handleFileChange} />
          </Form.Group>
          {previewSource && <img src={previewSource} alt='Preview' style={{ height: '300px' }} />}

          <Button className='w-100' variant='primary' type='submit'>
            Edit
          </Button>
        </Form>
      </Container>
    </>
  );}
};

export default Profile;
