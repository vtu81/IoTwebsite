import { useState } from 'react';
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

const AccountPassword = () => {
  return (
    <Formik
      enableReinitialize={true}
      initialValues={{
        old_password: '',
        password: '',
        confirm: '',
      }}
      validationSchema={
        Yup.object().shape({
          old_password: Yup.string().max(255).required('Old password is required'),
          password: Yup.string().max(255).required('Password is required'),
          confirm: Yup.string().max(255).required('Confirm is required'),
        })
      }
      onSubmit={(values, {setSubmitting}) => {
        console.log(values);
        if(values.password != values.confirm)
        {
          window.alert('Password and confirm password don\'t match!');
          setSubmitting(false);
          return;
        }
        var md5 = require("blueimp-md5");
        var password_hash = md5(values.password);
        var old_password_hash = md5(values.old_password);
        console.log('password md5 hash: ', password_hash);
        console.log('old password md5 hash: ', old_password_hash);

        fetch('/update_password',{
          method:'post',
          headers:{
            "Access-Control-Allow-Origin": "*",
            "Accept": 'application/json',
            "Content-Type": "application/json;charset=UTF-8",
          },
          body: JSON.stringify({
            "user_name": window.sessionStorage.getItem('user_name')?window.sessionStorage.getItem('user_name'):'Guest',
            "old_password_hash": old_password_hash,
            "password_hash": password_hash,
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
              subheader="Update password"
              title="Password"
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
                    error={Boolean(touched.old_password && errors.old_password)}
                    helperText={touched.old_password && errors.old_password}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    fullWidth
                    type="password"
                    label="Old Password"
                    name="old_password"
                    required
                    value={values.old_password}
                    variant="outlined"
                  />
                </Grid>
                <br/>
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <TextField
                    error={Boolean(touched.password && errors.password)}
                    helperText={touched.password && errors.password}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    fullWidth
                    type="password"
                    label="Password"
                    name="password"
                    required
                    value={values.password}
                    variant="outlined"
                  />
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <TextField
                    error={Boolean(touched.confirm && errors.confirm)}
                    helperText={touched.confirm && errors.confirm}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    fullWidth
                    label="Confirm password"
                    name="confirm"
                    required
                    type="password"
                    value={values.confirm}
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
              >
                Update
              </Button>
            </Box>
          </Card>
        </form>)}
    </Formik>
  );
};

export default AccountPassword;
