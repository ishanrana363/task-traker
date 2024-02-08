import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
const ForgetPassword = () => {
  return (
    <div>
        <div className='container-fluid   d-flex align-items-center justify-content-center bg-light   ' style={{height:"100vh"}} >
        <Form className='card bg-white w-50  p-5 pt-3 pb-4 '>
            <h2 className="text-center text-primary mb-4 " >Welcome to task traker and forget your password. .</h2>
            <InputGroup className='mb-3 ' style={{ width: '350px', left:"16%" }}>
                <InputGroup.Text>Email</InputGroup.Text>
                <Form.Control type= "email" placeholder='email' required />
            </InputGroup>
            <div className="d-flex align-items-center justify-content-center  " >
                <Button className= "px-5 py-2 my-3" type= "submit" > Forget Password </Button>
            </div>
        </Form>
    </div>
    </div>
  )
}

export default ForgetPassword;