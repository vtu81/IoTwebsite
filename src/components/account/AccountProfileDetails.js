import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField
} from '@material-ui/core';
import * as Yup from 'yup';
import { Formik } from 'formik';


const AccountProfileDetails = ({account}) => {
  return (
    <Formik
      enableReinitialize={true}
      initialValues={{
        email: account.email?account.email:'',
        phone_number: account.phone_number?account.phone_number:'',
      }}
      validationSchema={
        Yup.object().shape({
          email: Yup.string().email('Must be a valid email').max(64).required('Email is required'),
        })
      }
      onSubmit={(values, {setSubmitting}) => {
        console.log(values);
        fetch('/update_account',{
          method:'post',
          headers:{
            "Access-Control-Allow-Origin": "*",
            "Accept": 'application/json',
            "Content-Type": "application/json;charset=UTF-8",
          },
          body: JSON.stringify({
            "user_name": window.sessionStorage.getItem('user_name')?window.sessionStorage.getItem('user_name'):'Guest',
            "email": values.email,
            "phone_number": values.phone_number
          })
        }).then(res=>{
          res.json().then((ret)=>{
            console.log(ret);
            if(ret.success) // Successfully add/update!
            {
              window.alert(ret.msg);
              console.log(ret.msg);
              setSubmitting(false);
            }
            else
            {
              window.alert(ret.msg);
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
          <Card>
            <CardHeader
              subheader="The information can be edited"
              title="Profile"
            />
            <Divider />
            <CardContent>
              <Grid
                container
                spacing={3}
              >
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <TextField
                    error={Boolean(touched.email && errors.email)}
                    helperText={touched.email && errors.email}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    fullWidth
                    type="email"
                    label="Email Address"
                    name="email"
                    required
                    value={values.email}
                    variant="outlined"
                  />
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <TextField
                    fullWidth
                    label="Phone Number"
                    name="phone_number"
                    onChange={handleChange}
                    type="number"
                    value={values.phone_number}
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </CardContent>
            {/* <Divider /> */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                p: 2
              }}
            >
              <Button
                color="primary"
                variant="contained"
                disabled={isSubmitting}
                type="submit"
                onClick={() => {
                  
                }}
              >
                Save details
              </Button>
            </Box>
          </Card>
        </form>)}
    </Formik>
  );
};

export default AccountProfileDetails;
