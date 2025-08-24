import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import React, { useState } from 'react';
import { AuthenticateUser } from '../../SERVICES/Auth/Login';
import type { AuthReq } from '../../SERVICES/Auth/Model/AuthModel';
import {  useNavigate } from 'react-router-dom';
import DisplayError from '../../COMPONENTS/common/DisplayError';
import Loader from '../../COMPONENTS/Loading/Loading';


export function AuthForm() {
    const [auth,setAuth] = useState<AuthReq>({email:null,password:null});
    const [loading,setLoading] = useState<boolean>(false);
    const [error,setError]= useState<string>()
    const navigate = useNavigate()
    async function Login(e:React.MouseEvent<HTMLButtonElement>){
    e.preventDefault();
    try {
      await AuthenticateUser(auth)
     navigate("/dashboard/home")
    } catch (error) {
      setError("invalid Credentials")
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
          {error && <DisplayError error={error}/>}
          {loading ?  <Loader/>
        :
          
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
        </Button>}
        </>
  );
}
