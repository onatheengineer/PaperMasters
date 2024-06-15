import { Box, Button, Text } from '@chakra-ui/react';
import * as React from 'react';
import { FC, useState } from 'react';

interface reportInterface {
  chainId?: string;
  walletAccount?: string;
}

export const Report: FC<reportInterface> = ({ chainId, walletAccount }) => {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };
  return (
    <Box>
      <Button
        role="button"
        bg={'blue'}
        onClick={() => {
          increment();
        }}
      >
        increment
        <Text>{count}</Text>
      </Button>
    </Box>
  );
};

export default Report;
