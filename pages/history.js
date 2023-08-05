import React from 'react';
import styles from '@/styles/History.module.css';
import { useAtom } from 'jotai';
import { searchHistoryAtom } from '../store';
import { Card, ListGroup, Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { removeFromHistory } from '../lib/userData';

const History = () => {
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
    const router = useRouter();
    if(!searchHistory) return null;

    let parsedHistory = [];
    searchHistory.forEach(h => {
      let params = new URLSearchParams(h);
      let entries = params.entries();
      parsedHistory.push(Object.fromEntries(entries));
    });

    const historyClicked = async (e, index) => {
      e.stopPropagation();
      
      setSearchHistory(await removeFromHistory(searchHistory[index]));
      router.push(`/artwork?${searchHistory[index]}`);
    };
  
    const removeHistoryClicked = async (e, index) => {
      e.stopPropagation();
      setSearchHistory(await removeFromHistory(searchHistory[index]));
      // await setSearchHistory(current => {
      //   let x = [...current];
      //   x.splice(index, 1);
      //   return x;
      // });
    };
  
    parsedHistory = parsedHistory.map((historyItem, index) => {
        
        return (      
        <ListGroup.Item
          key={index}
          onClick={(e) => historyClicked(e, index)}
          className={styles.historyListItem}
        >
          {Object.keys(historyItem).map((key) => (
            <React.Fragment key={key}>
              {key}: <strong>{historyItem[key]}</strong>&nbsp;
            </React.Fragment>
          ))}
          <Button
            className="float-end"
            variant="danger"
            size="sm"
            onClick={(e) => removeHistoryClicked(e, index)}
          >
            &times;
          </Button>
        </ListGroup.Item>
      );
    });
  
    return (
      <div>
        {parsedHistory.length === 0 ? (
          <Card>
            <Card.Body>
              <Card.Text>Nothing Here. Try searching for some artwork.</Card.Text>
            </Card.Body>
          </Card>
        ) : (
          <ListGroup>{parsedHistory}</ListGroup>
        )}
      </div>
    );
  };
  
  export default History;