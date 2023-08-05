import { Card, Form, Button, Alert } from "react-bootstrap";
import {useState, useEffect} from "react";
import { useRouter } from "next/router";
import { favouritesAtom, searchHistoryAtom } from "@/store";
import { useAtom } from "jotai";
import { getFavourites, getHistory } from "@/lib/userData";
import { authenticateUser } from "../lib/authenticate";

export default function Login(){
    const [userName, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message,setMessage] = useState("");
    const router = useRouter();
    const [favouritesList, setFavourites] = useAtom(favouritesAtom);
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
    const [isLoading, setIsLoading] = useState(false);

    async function updateAtoms(){
      try {
          setFavourites(await getFavourites());
          setSearchHistory(await getHistory());
        } catch (error) {
          console.error('Error updating atoms:', error);
        }
   }

   useEffect(() => {
    if (isLoading) {
      
      getFavourites()
        .then((favorites) => {
          setFavourites(favorites);
        })
        .catch((error) => {
          console.error('Error fetching favorites:', error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [isLoading, setFavourites]);


    async function handleSubmit(e){
        e.preventDefault();

        setIsLoading(true);
        authenticateUser(userName, password)
      .then(() => {
        router.push("/favourites");
      })
      .catch((err) => {
        setMessage(err.message);
        setIsLoading(false); 
      });
    }

  return (
    <>
      <Card bg="light">
        <Card.Body><h2>Login</h2>Enter your login information below:</Card.Body>
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
        <Button variant="primary" className="pull-right bg-success" type="submit">Login</Button>
      </Form>
      <br>
      </br>
       {message && <Alert variant = "danger">{message}</Alert>}
    </>
  );
}