import { Card, Button } from 'react-bootstrap';
import Link from 'next/link';
import useSWR from 'swr';
import Error from 'next/error';

function ArtworkCard({ objectID }) {
  const { data, error } = useSWR(
    `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`
  );

  if (error) {
    return <Error statusCode={404} />;
  }

  if (!data) {
    return null;
  }

  const { primaryImageSmall, title, objectDate, classification, medium } = data;

  return (
    <Card style={{ width: '18rem', height: '40rem' }}>
      <Card.Img
        id="card-img"
        variant="top"
        src={primaryImageSmall || 'https://via.placeholder.com/375x375.png?text=[+Not+Available+]'}
      />
      <Card.Body style={{ display: 'flex', flexDirection: 'column' }}>
        <div>
          <Card.Title style={{ maxHeight: '100px', overflowY: 'hidden' }}>{title || 'N/A'}</Card.Title>
          <Card.Text className="card-text">
          <span className="regular-text">Object Date:</span> {objectDate || 'N/A'}
          <br />
          <span className="regular-text">Classification:</span> {classification || 'N/A'}
          <br />
          <span className="regular-text">Medium:</span> {medium || 'N/A'}
          </Card.Text>
        </div>
        
        <div id="card-btn" style={{ marginTop: 'auto' }}>
          <Link href={`/artwork/${objectID}`} passHref>
            <Button variant="success">ID: ({objectID})</Button>
          </Link>
        </div>
        
      </Card.Body>
    </Card>
  );
}

export default ArtworkCard;