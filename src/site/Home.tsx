import { useEffect, useState } from 'react';
import Box from '@cloudscape-design/components/box';
import Button from '@cloudscape-design/components/button';
import SpaceBetween from '@cloudscape-design/components/space-between';

function Home() {
  const [count, setCount] = useState(0);
  const [time, setTime] = useState();

  useEffect(() => {
    fetch('/api/time')
      .then((res) => res.json())
      .then((data) => setTime(data.time));
  }, []);
  return (
    <SpaceBetween size="xs">
      <Box>Hello, there! It's currently {time}!</Box>
      <Button variant="normal" onClick={() => setCount(count + 1)}>
        Clicked {count} times!
      </Button>
    </SpaceBetween>
  );
}

export default Home;
