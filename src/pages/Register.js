import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormHelperText,
  Link,
  TextField,
  Typography
} from '@material-ui/core';
import React, { useState, useEffect } from 'react';
var connect_config = require('src/utils/config.json');

const Register = () => {
  const navigate = useNavigate();
  const [registerStatus, setRegisterStatus] = useState({});
  
  useEffect(() => {
    setRegisterStatus({
      'msg': 'Use your email to create new account',
      'color': 'textSecondary'
    });
  }, []);

  return (
    <>
      <Helmet>
        <title>Register | IoTwebsite</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center'
        }}
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              email: '',
              firstName: '',
              lastName: '',
              password: '',
              policy: false
            }}
            validationSchema={
              Yup.object().shape({
                email: Yup.string().email('Must be a valid email').max(64).required('Email is required'),
                // firstName: Yup.string().max(255).required('First name is required'),
                // lastName: Yup.string().max(255).required('Last name is required'),
                userName: Yup.string().max(30).required('User name is required'),
                password: Yup.string().max(255).required('Password is required'),
                policy: Yup.boolean().oneOf([true], 'This field must be checked')
              })
            }
            onSubmit={(values, {setSubmitting}) => {
              var md5 = require("blueimp-md5");
              var password_hash = md5(values.password);
              console.log(values);
              console.log('password md5 hash: ', password_hash);
              var sessionStorage = window.sessionStorage;

              fetch(connect_config.backend_host + '/register',{
                  method:'post',
                  headers:{
                    "Access-Control-Allow-Origin": "*",
                    "Accept": 'application/json',
                    // "Content-Type": "application/x-www-form-urlencoded",
                    "Content-Type": "application/json;charset=UTF-8",
                  },
                  // body:`email=${values.username}&password_hash=${password_hash}`
                  body: JSON.stringify({
                    "user_name": values.userName,
                    "password_hash": password_hash,
                    "email": values.email,
                    "phone_number": values.phoneNumber
                  })
              }).then(res=>{
                res.json().then((ret)=>{
                  console.log(ret);
                  if(ret.success) // Successfully register!
                  {
                    setRegisterStatus({
                      'msg': ret.msg,
                      'color': 'textSecondary'
                    });
                    console.log(ret.msg);
                    sessionStorage.setItem('user_name', values.userName);
                    console.log('sessionStorage.getItem(\'user_name\')', sessionStorage.getItem('user_name'));
                    navigate('/app/dashboard', { replace: true });
                  }
                  else
                  {
                    setRegisterStatus({
                      'msg': ret.msg,
                      'color': 'error.main'
                    });
                    console.log(ret.msg);
                    setSubmitting(false);
                  }
                })
              })
            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values
            }) => (
              <form onSubmit={handleSubmit}>
                <Box sx={{ mb: 0 }}>
                  <Typography
                    color="textPrimary"
                    variant="h2"
                  >
                    Create new account
                  </Typography>
                  <Typography
                    color={registerStatus.color}
                    gutterBottom
                    variant="body2"
                  >
                    {registerStatus.msg}
                  </Typography>
                </Box>
                {/* <TextField
                  error={Boolean(touched.firstName && errors.firstName)}
                  fullWidth
                  helperText={touched.firstName && errors.firstName}
                  label="First name"
                  margin="normal"
                  name="firstName"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.lastName && errors.lastName)}
                  fullWidth
                  helperText={touched.lastName && errors.lastName}
                  label="Last name"
                  margin="normal"
                  name="lastName"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  variant="outlined"
                /> */}
                <TextField
                  error={Boolean(touched.userName && errors.userName)}
                  fullWidth
                  helperText={touched.userName && errors.userName}
                  label="User Name"
                  margin="normal"
                  name="userName"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.userName}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.email && errors.email)}
                  fullWidth
                  helperText={touched.email && errors.email}
                  label="Email Address"
                  margin="normal"
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="email"
                  value={values.email}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  helperText={touched.password && errors.password}
                  label="Password"
                  margin="normal"
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  value={values.password}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.phoneNumber && errors.phoneNumber)}
                  fullWidth
                  helperText={touched.phoneNumber && errors.phoneNumber}
                  label="Phone Number"
                  margin="normal"
                  name="phoneNumber"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="number"
                  value={values.phoneNumber}
                  variant="outlined"
                />
                <Box
                  sx={{
                    alignItems: 'center',
                    display: 'flex',
                    ml: -1
                  }}
                >
                  <Checkbox
                    checked={values.policy}
                    name="policy"
                    onChange={handleChange}
                  />
                  <Typography
                    color="textSecondary"
                    variant="body1"
                  >
                    I have read the
                    {' '}
                    <Link
                      color="primary"
                      component={RouterLink}
                      to="#"
                      underline="always"
                      variant="h6"
                    >
                      Terms and Conditions
                    </Link>
                  </Typography>
                </Box>
                {Boolean(touched.policy && errors.policy) && (
                  <FormHelperText error>
                    {errors.policy}
                  </FormHelperText>
                )}
                <Box sx={{ py: 2 }}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Sign up now
                  </Button>
                </Box>
                <Typography
                  color="textSecondary"
                  variant="body1"
                >
                  Have an account?
                  {' '}
                  <Link
                    component={RouterLink}
                    to="/login"
                    variant="h6"
                  >
                    Sign in
                  </Link>
                </Typography>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </>
  );
};

export default Register;
