import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
const Login = () => {
  return (
    <div>
        <div className='container-fluid   d-flex align-items-center justify-content-center bg-light  ' style={{height:"100vh"}} >
        <Form className='card bg-white  p-5 pt-3 pb-4 ' style={{margin:"100px"}}  >
            <h2 className="text-center text-primary mb-4 " > Wolcome to task traker login from .</h2>
            <InputGroup className='mb-3' style={{ width: '500px' }}>
                <InputGroup.Text style={{ width: '157px' }}>Email</InputGroup.Text>
                <Form.Control type= "email" placeholder='email' required />
            </InputGroup>
            <InputGroup className='mb-3' style={{ width: '500px' }}>
                <InputGroup.Text style={{ width: '157px' }}>Password</InputGroup.Text>
                <Form.Control type= "password" placeholder='password' required />
            </InputGroup>
            <div className="d-flex align-items-center justify-content-center  " >
                <Button className= "px-5 py-2 my-3" type= "submit" > login </Button>
            </div>
        </Form>
    </div>
    </div>
  )
}

export default Login;
