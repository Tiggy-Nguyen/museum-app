import { getToken } from '../lib/authenticate';


async function makeApiRequest(url, method, body = null) {
  const token = await getToken();
  const requestOptions = {
    method: method,
    headers: {
      'Authorization': `JWT ${token}`,
      'Content-Type': 'application/json'
    }
  };
  if (body) {
    requestOptions.body = JSON.stringify(body);
  }

  const response = await fetch(url, requestOptions);
  if (response.status === 200) {
    return response.json();
  } else {
    return [];
  }
}

export async function addToFavourites(id) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/favourites/${id}`;
  return makeApiRequest(url, 'PUT');
}


export async function removeFromFavourites(id) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/favourites/${id}`;
  return makeApiRequest(url, 'DELETE');
}

export async function getFavourites() {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/favourites`;
  return makeApiRequest(url, 'GET');
}

export async function addToHistory(id) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/history/${id}`;
  return makeApiRequest(url, 'PUT');
}

export async function removeFromHistory(id) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/history/${id}`;
  return makeApiRequest(url, 'DELETE');
}

export async function getHistory() {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/history`;
  return makeApiRequest(url, 'GET');
}
