import { Form, Button, Row, Col } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useAtom } from 'jotai';
import { searchHistoryAtom } from '../store';
import { useEffect, useState } from 'react';
import { addToHistory } from '../lib/userData';

function AdvancedSearch() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  const [searchQuery, setSearchQuery] = useState('');
  
  const submitForm = async (data) => {
    let searchString = '';
    
    if (data.searchBy) {
      if (data.searchBy === 'title') {
        searchString += 'title=true&';
      } else if (data.searchBy === 'tags') {
        searchString += 'tags=true&';
      } else if (data.searchBy === 'artistOrCulture') {
        searchString += 'artistOrCulture=true&';
      }
    }
   
    if (data.geoLocation) {
      searchString += `&geoLocation=${data.geoLocation}`;
    }

    if (data.medium) {
      searchString += `&medium=${data.medium}`;
    }
  
    searchString += `&isOnView=${data.isOnView}`;
    searchString += `&isHighlight=${data.isHighlight}`;
    searchString += `&q=${data.q}`;
    setSearchQuery(searchString);

    setSearchHistory(await addToHistory(searchQuery));
    router.push(`/artwork?${searchString}`);
  
  };

  useEffect(() => {
    if (searchQuery) {
      const queryString = `${searchQuery}`;
      setSearchHistory((current) => [...current, queryString]);
    }
  }, [searchQuery, setSearchHistory]);

  return (
    <div className="container">
      <Form onSubmit={handleSubmit(submitForm)}>
        <Form.Group controlId="q">
          <Form.Label>Search Query</Form.Label>
          <Form.Control {...register('q', { required: true })} className={errors.q ? 'is-invalid' : ''} 
          style={{ borderWidth: '1px', borderColor: 'grey', width: '100%' }}/>
          {errors.q && <Form.Text className="text-danger">This field is required.</Form.Text>}
        </Form.Group>
        <br></br>
        
        <Row>
          <Col md={4}>
          <Form.Group controlId="searchBy">
              <Form.Label>Search By</Form.Label>
                <Form.Select {...register('searchBy')} style={{ borderWidth: '1px', borderColor: 'grey',width: '100%' }}>
                  <option value="title">Title</option>
                  <option value="tags">Tags</option>
                  <option value="artistOrCulture">Artist or Culture</option>
                </Form.Select>                  
            </Form.Group>
          </Col>
     
          <Col md={4}>
            <Form.Group controlId="geoLocation">
              <Form.Label>Geo Location</Form.Label>
              <Form.Control {...register('geoLocation')} 
              style={{ borderWidth: '1px', borderColor: 'grey',width: '100%' }}/>
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group controlId="medium">
            <Form.Label>Medium</Form.Label>
            <Form.Control {...register('medium')} 
            style={{ borderWidth: '1px', borderColor: 'grey',width: '100%' }}/>
            </Form.Group>
          </Col>
        </Row>
        <br></br>
        <br></br>
        <br></br>

        <Form.Group controlId="isOnView">
          <Form.Check
            type="checkbox"
            label="Currently on View"
            {...register('isOnView')}
          />
        </Form.Group>

        <Form.Group controlId="isHighlight">
          <Form.Check
            type="checkbox"
            label="Highlighted"
            {...register('isHighlight')}
          />
        </Form.Group>
        <Button variant="primary" type="submit" style={{ marginTop: '10px' }}>
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default AdvancedSearch;
