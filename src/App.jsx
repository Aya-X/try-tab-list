import { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';

const baseURL = `https://b3e1e9f6-150d-4710-9425-d75523c9d46a.mock.pstmn.io/movies`;

function useCount(initCount) {
  const [count, setCount] = useState(initCount);

  const handleClick = () => {
    setCount(count + 1);
  };

  return { count, handleClick };
}

function useFetchMovies(genre) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const genreList = ['top', 'fantasy', 'horror'];

    if (!genreList.includes(genre)) {
      alert('請選擇正確按鈕');
      setIsLoading(true);
    }

    const getData = () => {
      setIsLoading(true);

      fetch(`${baseURL}/${genre}`)
        .then((res) => res.json())
        .catch((error) => console.error('Error:', error))
        .then((result) => {
          console.log(result);

          setData(result);
          setIsLoading(false);
        });
    };

    if (genreList.includes(genre)) {
      getData();
    }
  }, [genre]);

  return { data, isLoading };
}

function MovieList(props) {
  const { data, isLoading } = props;

  return (
    <ul>
      {isLoading && <li>LOADING...</li>}

      {!isLoading &&
        data &&
        data.map((item, index) => {
          return <li key={index}>{item}</li>;
        })}
    </ul>
  );
}

function App() {
  const [genre, setGenre] = useState('top');
  const { data, isLoading } = useFetchMovies(genre);

  const topCount = useCount(0);
  const fantasyCount = useCount(0);
  const horrorCount = useCount(0);

  return (
    <>
      <Container>
        <TabButton
          type='button'
          isBorder={genre === 'top'}
          onClick={() => {
            setGenre('top');
            topCount.handleClick();
          }}
        >
          top ({topCount.count})
        </TabButton>
        <TabButton
          type='button'
          isBorder={genre === 'fantasy'}
          onClick={() => {
            setGenre('fantasy');
            fantasyCount.handleClick();
          }}
        >
          fantasy ({fantasyCount.count})
        </TabButton>
        <TabButton
          type='button'
          isBorder={genre === 'horror'}
          onClick={() => {
            setGenre('horror');
            horrorCount.handleClick();
          }}
        >
          horror ({horrorCount.count})
        </TabButton>

        <TabButton
          type='button'
          isBorder={genre === 'drama'}
          onClick={() => setGenre('drama')}
        >
          drama
        </TabButton>

        <MovieList data={data} isLoading={isLoading}></MovieList>
      </Container>
    </>
  );
}

export default App;

const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
`;

const TabButton = styled.button`
  padding: 12px 16px;
  border: none;
  border-bottom: 2px solid #ffffff;
  color: #52b5d1;
  cursor: pointer;
  transition: border-bottom 0.3s;

  &:hover {
    border-bottom: 2px solid #52b5d1;
  }

  ${({ isBorder }) =>
    isBorder &&
    css`
      border-bottom: 2px solid #52b5d1;
    `}
`;
