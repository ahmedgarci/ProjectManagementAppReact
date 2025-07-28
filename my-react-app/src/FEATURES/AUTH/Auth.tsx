import Box from '@mui/material/Box';
import { useState } from 'react';
import { RegisterForm } from './RegisterForm';
import { AuthForm } from './AuthForm';
import { Button, Divider, Typography } from '@mui/material';


export function Auth() {
  const [form,setForm] = useState<string>("auth");
  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        p: 2,
        fontFamily: "'Poppins', sans-serif",
      }}
    >
       <Box
        sx={{
          width: 380,
          bgcolor: 'rgba(255, 255, 255, 0.15)',
          borderRadius: 4,
          backdropFilter: 'blur(12px)',
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
          border: '1px solid rgba(255, 255, 255, 0.18)',
          p: 5,
          textAlign: 'center',
          color: '#222',
        }}
      >
         <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            mb: 2,
            letterSpacing: 1,
            color: '#333',
          }}
        >
          Welcome to Task Net
        </Typography>
        <Box
  sx={{
    display: 'flex',
    justifyContent: 'center',
    gap: 4,
    mb: 3,
  }}
>
  <Button
    variant="contained"
    size="large"
    onClick={() => setForm("auth")}
    sx={{
      color: 'white',
      bgcolor: 'black',
      textTransform: 'none',
      px: 4,
      borderRadius: 2,
      fontWeight: 'medium',
      '&:hover': {
        bgcolor: '#333',
      },
    }}
  >
    Login
  </Button>

  <Button
    variant="contained"
    size="large"
    onClick={() => setForm("register")}
    sx={{
      color: 'white',
      bgcolor: 'black',
      textTransform: 'none',
      px: 4,
      borderRadius: 2,
      fontWeight: 'medium',
      '&:hover': {
        bgcolor: '#333',
      },
    }}
  >
    Register
  </Button>
</Box>
        {form === "auth" ?  <AuthForm/>                    : 
        <RegisterForm/>
        }
         <Divider sx={{marginTop:"15px"}}>OR </Divider>
        <Button
          variant="contained"
          size="large"
          fullWidth
          sx={{
            marginTop:"15px",
            background: 'black',
            color: '#fff',
            fontWeight: 700,
            py: 1.8,
            borderRadius: 3,
            boxShadow:
              '0 4px 15px 0 ',
           
          }}
        >
          Login With Google
        </Button>
       </Box>
    </Box>
  );
}
