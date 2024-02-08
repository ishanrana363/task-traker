import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button'; 
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import Spinner from 'react-bootstrap/Spinner';
import { useState } from 'react';
import { useEffect } from 'react';
import { createUser } from '../../api/authApi';
import  {Toaster, toast } from "react-hot-toast"
import { useNavigate } from 'react-router-dom';
const SignIn = () => {

    const [showToast,setShowToast] = useState(false);
    const [showPass,setShowPass] = useState(true);
    const [spinner,setSpinner] = useState(false);
    const [userInfo,setUserInfo] = useState({});
    const navigate = useNavigate()

    const showOnToast = () =>{
        setShowToast(p=>!p)
    };
    

    useEffect(()=>{
        if(userInfo.password && userInfo.confirmPassword && (userInfo.password!==userInfo.confirmPassword)){
            setShowPass(true)
        }else{
            setShowPass(false)
        }
    },[userInfo])
    

    const onInputChange = (name,value)=>{
        setUserInfo((prev)=>({
            ...prev,
            [name] : value
        }))
    };

    const {name  ,email  ,address ,phone,age, password,confirmPassword } = userInfo;

    const fromSubmit = async (e) =>{
        e.preventDefault()
        if(userInfo.password!==userInfo.confirmPassword){
            showOnToast()
        }else if(email.length===0){
            toast.error("Your email  required !")
        }else if(name.length===0){
            toast.error("Your name is required.");
        }else if(phone.length===0){
            toast.error("Your phone number is required.");
        }else{
            setSpinner(true)
            const resp = await createUser(userInfo);
            setSpinner(false)
            if(resp){
                toast.success("User account create successfully!")
                navigate("/login")
            }else{
                setSpinner(false)
                toast.error("Something went to worng!")
            }
        }
    }
return (
    <div className='container-fluid   d-flex align-items-center justify-content-center bg-light  ' style={{height:"100vh"}} >
        <Form onSubmit={fromSubmit} className='card bg-white  p-5 pt-3 pb-4 ' style={{margin:"100px"}}  >
            <h2 className="text-center text-primary mb-4 " >Create account.</h2>
            <InputGroup className='mb-3' style={{ width: '500px' }}>
                <InputGroup.Text style={{ width: '157px' }}>Name</InputGroup.Text>
                <Form.Control value={name} onChange= {(e)=>{onInputChange("name",e.target.value)}} 
                type= "text" placeholder='name'  />
            </InputGroup>
            <InputGroup className='mb-3' style={{ width: '500px' }}>
                <InputGroup.Text style={{ width: '157px' }}>Email</InputGroup.Text>
                <Form.Control value={email} onChange= {(e)=>{onInputChange("email",e.target.value)}}
                type= "email" placeholder='email'  />
            </InputGroup>
            <InputGroup className='mb-3' style={{ width: '500px' }}>
                <InputGroup.Text style={{ width: '157px' }}>Address</InputGroup.Text>
                <Form.Control value={address} onChange= {(e)=>{onInputChange("address",e.target.value)}}
                type= "text" placeholder='address'  />
            </InputGroup>
            <InputGroup className='mb-3' style={{ width: '500px' }}>
                <InputGroup.Text style={{ width: '157px' }}>Phone</InputGroup.Text>
                <Form.Control value={phone} onChange= {(e)=>{onInputChange("phone",e.target.value)}}
                type= "number" placeholder='phone number'  />
            </InputGroup>
            <InputGroup className='mb-3' style={{ width: '500px' }}>
                <InputGroup.Text style={{ width: '157px' }}>Age</InputGroup.Text>
                <Form.Control value={age} onChange= {(e)=>{onInputChange("age",e.target.value)}}
                type= "number" placeholder='age'  />
            </InputGroup>
            <InputGroup className='mb-3' style={{ width: '500px' }}>
                <InputGroup.Text style={{ width: '157px' }}>Password</InputGroup.Text>
                <Form.Control  value={password} onChange= {(e)=>{onInputChange("password",e.target.value)}}
                type= "password" placeholder='password'  />
            </InputGroup>
            <InputGroup className='mb-3' style={{ width: '500px' }}>
                <InputGroup.Text style={{ width: '157px' }}>Confirm password</InputGroup.Text>
                <Form.Control value={confirmPassword} onChange= {(e)=>{onInputChange("confirmPassword",e.target.value)}}
                type= "password" placeholder='Confirm password'  />
            </InputGroup>
            { showPass && <p className=" text-danger">your password not match!</p> }
            <div className="d-flex align-items-center justify-content-center  " >
                <Button className= "px-5 py-2 my-3" type= "submit" disabled = {spinner} > Create  { spinner && <Spinner animation="border" variant="balck" className='ms-2' size='sm' /> } </Button>
            </div>
        </Form>
        <ToastContainer className="top-center">
            <Toast show={showToast} onClose={showOnToast}>
                <Toast.Header>
                    <p> Your password not match! </p>
                </Toast.Header>
                <Toast.Body className='text-danger text-center ' >Your password and confirm password not matched!</Toast.Body>
            </Toast>
        </ToastContainer>
        <Toaster position="top-center" />
    </div>
)
}

export default SignIn;