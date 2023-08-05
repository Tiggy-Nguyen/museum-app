import { useAtom } from 'jotai';
import { favouritesAtom } from '../store';
import { useState, useEffect } from 'react';
import { Card, Button, Container } from 'react-bootstrap';
import useSWR from 'swr';
import Error from 'next/error';
import { addToFavourites, removeFromFavourites } from '../lib/userData';

function ArtworkCardDetail({ objectID }) {
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
  //const [showAdded, setShowAdded] = useState(favouritesList.includes(objectID));
  const [showAdded, setShowAdded] = useState(false);
  const { data, error } = useSWR(
    objectID ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}` : null
  );

  useEffect(()=>{
    setShowAdded(favouritesList?.includes(objectID))
  }, [favouritesList, objectID])

  if (error) {
    return <Error statusCode={404} />;
  }

  if (!data) {
    return null;
  }

  const {
    primaryImage,
    title,
    objectDate,
    classification,
    medium,
    artistDisplayName,
    creditLine,
    dimensions,
    artistWikidata_URL,
  } = data;

  const favouritesClicked = async () => {
    try{
      if (showAdded) {
      //await setFavouritesList((current) => current.filter((fav) => fav !== objectID));
      // await removeFromFavourites(objectID);
      // setFavouritesList((currentFavourites) => currentFavourites.filter((fav) => fav !== objectID));
      setFavouritesList( await removeFromFavourites(objectID));
      } else {
        //await setFavouritesList((current) => [...current, objectID]);  
        // await addToFavourites(objectID);
        // setFavouritesList((currentFavourites) => [...currentFavourites, objectID]);
        setFavouritesList(await addToFavourites(objectID));
      }
    setShowAdded(!showAdded);
    } catch(error) {
      console.error('Failed to update favourite', error);
    }
    
  };

  return (
    <Container fluid id="nav-container">
      <Card >
        {primaryImage && <Card.Img variant="top" src={primaryImage} />}
        <Card.Body>
          <Card.Title>{title || 'N/A'}</Card.Title>
          <Card.Text>
            <span className="regular-text">Date:</span> {objectDate || 'N/A'}
            <br />
            <span className="regular-text">Classification:</span> {classification || 'N/A'}
            <br />
            <span className="regular-text">Medium:</span> {medium || 'N/A'}
            <br />
            <br />
            <span className="regular-text">Artist: </span>
              {artistDisplayName && !artistDisplayName.startsWith('Anonymous') ? (
                <>
                  {artistDisplayName} {'( '}
                  <a href={artistWikidata_URL} target="_blank" rel="noreferrer" style={{ color: 'rgb(4, 179, 88)' }}>wiki</a>
                  {' )'}                                  
                </>
              ) : (
                artistDisplayName.startsWith('Anonymous') ? artistDisplayName : 'N/A'
              )}
            
            <br />
            <span className="regular-text">Credit Line:</span> {creditLine || 'N/A'}
            <br />
            <span className="regular-text"> Dimensions:</span> {dimensions || 'N/A'}
            <br />
            <Button
              variant={showAdded ? 'primary' : 'outline-primary'}
              onClick={favouritesClicked}
            >
              {showAdded ? '+ Favourite (added)' : '+ Favourite'}
            </Button>
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default ArtworkCardDetail;
