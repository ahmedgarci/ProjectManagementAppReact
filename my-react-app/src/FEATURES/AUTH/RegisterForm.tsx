import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import React, { useState } from 'react';
import type { RegisterRequest } from '../../SERVICES/Auth/Model/AuthModel';
import Register from '../../SERVICES/Auth/Register';
import { toast } from 'react-toastify';
import DisplayError from '../../COMPONENTS/common/DisplayError';
import Loader from '../../COMPONENTS/Loading/Loading';


export function RegisterForm() {
    const [register,setRegister] = useState<RegisterRequest>({password:"",email:"",jobPosition:"",fullName:""});
    const [error,setErro]= useState<string>()
    const [loading,setLoading] = useState(false)

    async function RegisterUser(){
      setLoading(true)
      try {
          await Register(register)
          toast.success("registred successfully")
      } catch (error:any) {
        setErro(error)
      }finally{
        setLoading(false)
      }
    }

  return (
        <>

<TextField
          label="Full name"
          variant="outlined"
          type="text"
          required
          fullWidth
          onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setRegister((prev)=>({...prev, fullName:e.target.value}))}
          sx={{
            mb: 4,
            backgroundColor: 'rgba(255, 255, 255, 0.85)',
            borderRadius: 2,
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
            },
          }}
        />

        <TextField
          label="Email"
          variant="outlined"
          type="email"
          required
          fullWidth
          onChange={(e:React.ChangeEvent<HTMLInputElement>)=>   setRegister(prev => ({ ...prev, email: e.target.value }))}
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
          label="Position occupied"
          variant="outlined"
          type="text"
          required
          fullWidth
          onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setRegister((prev)=>({...prev, jobPosition:e.target.value}))}
          sx={{
            mb: 4,
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
          onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setRegister((prev)=>({...prev, password:e.target.value}))}
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

          {loading? <Loader/>  :

    
        <Button
          variant="contained"
          size="large"
          fullWidth
          onClick={RegisterUser}
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
          Register
        </Button>
}
      </>
  );
}
