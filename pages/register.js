import { Card, Form, Button, Alert } from "react-bootstrap";
import {useState} from "react";
import { useRouter } from "next/router";
import { registerUser } from "../lib/authenticate";

export default function Login(){
    const [userName, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [message,setMessage] = useState("");
    const router = useRouter();
    

    function handleSubmit(e){
        e.preventDefault();
        console.log(userName, password, password2)
       registerUser(userName, password, password2).then(async ()=>{
            router.push("/login")
        }).catch(err=>{

          setMessage(err.message);

        })
    }

  return (
    <>
      <Card bg="light">
        <Card.Body><h2>Register</h2>Register for an account:</Card.Body>
      </Card>
      <br />
      <Form onSubmit={e=>handleSubmit(e)}>
        <Form.Group>
          <Form.Label>User:</Form.Label><Form.Control type="text" id="userName" name="userName" onChange={e=>setUsername(e.target.value)}/>
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Label>Password:</Form.Label><Form.Control type="password" id="password" name="password" onChange={e=>setPassword(e.target.value)} />
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Label>Confirm Password:</Form.Label><Form.Control type="password" id="password2" name="password2" onChange={e=>setPassword2(e.target.value)} />
        </Form.Group>
        <br />
        <Button variant="primary" className="pull-right bg-success" type="submit">Register</Button>
      </Form>
      <br>
      </br>
       {message && <Alert variant = "danger">{message}</Alert>}
    </>
  );
}