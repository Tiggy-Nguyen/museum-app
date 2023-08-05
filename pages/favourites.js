import { useAtom } from 'jotai';
import { favouritesAtom } from '../store';
import { Container, Row, Col, Card } from 'react-bootstrap';
import ArtworkCard from '@/components/ArtworkCard';

function Favourites() {
    const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
    if(!favouritesList) return null;
    
    return (
      <Container fluid>
        <Row className="gy-4">
          {favouritesList.length > 0 ? (
            favouritesList.map((objectID) => (
              <Col lg={3} key={objectID}>
                <ArtworkCard objectID={objectID} />
              </Col>
            ))
          ) : (
            <Col>
              <Card>
                <Card.Body>
                  <h4>Nothing Here</h4>
                  <p>Try adding some new artwork to the list.</p>
                </Card.Body>
              </Card>
            </Col>
          )}
        </Row>
      </Container>
    );
  }
  
  export default Favourites;