import { Divider } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import { AuthenticateUser } from '../../SERVICES/Auth/Login';
import type { AuthReq } from '../../SERVICES/Auth/Model/AuthModel';
import {  useNavigate } from 'react-router-dom';
import { AuthTypography } from '../../COMPONENTS/Auth/AuthTypography';


export function AuthForm() {
    const [auth,setAuth] = useState<AuthReq>({email:null,password:null});
    const [error,setErro]= useState<string>()
    const navigate = useNavigate()
    function Login(e:React.MouseEvent<HTMLButtonElement>){
    e.preventDefault();
    try {
      AuthenticateUser(auth)
     navigate("/dashboard/tasks")
    } catch (error) {
      setErro("invalid Credentials")
    }
  }

  return (
    <>

        <TextField
          label="Email"
          variant="outlined"
          type="email"
          required
          fullWidth
          onChange={(e:React.ChangeEvent<HTMLInputElement>)=>   setAuth(prevAuth => ({ ...prevAuth, email: e.target.value }))}
          sx={{
            mb: 3,
            backgroundColor: 'rgba(255, 255, 255, 0.85)',
            borderRadius: 2,
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
            },
          }}
        />

        <TextField
          label="Password"
          variant="outlined"
          type="password"
          required
          fullWidth
          onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setAuth((prevAuth)=>({...prevAuth, password:e.target.value}))}
          sx={{
            mb: 4,
            backgroundColor: 'rgba(255, 255, 255, 0.85)',
            borderRadius: 2,
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
            },
          }}
        />

        <Button
          variant="contained"
          size="large"
          fullWidth
          onClick={Login}
          sx={{
            background: 'black',
            color: '#fff',
            fontWeight: 700,
            py: 1.8,
            borderRadius: 3,
            boxShadow:
              '0 4px 15px 0',
            
          }}
        >
          Login
        </Button>
       
        </>
  );
}
