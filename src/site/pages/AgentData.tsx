import { useContext, useState } from 'react';
import AgentContext from '../context/AgentContext';
import { Box, Button, Header } from '@cloudscape-design/components';

function AgentData() {
  const { agentData, setAgentData } = useContext(AgentContext);
  const [loading, setLoading] = useState(false);

  const handleRefresh = () => {
    setLoading(true);
    fetch('/api/agentdata')
      .then((res) => res.json())
      .then((res) => setAgentData(res))
      .finally(() => setLoading(false));
  };

  return (
    <>
      <Header
        variant="h2"
        actions={
          <Button
            variant="icon"
            iconName="refresh"
            onClick={handleRefresh}
            loading={loading}
            disabled={loading}
          />
        }
      >
        Agent Data
      </Header>
      <Box variant="pre">{JSON.stringify(agentData, null, 2)}</Box>
    </>
  );
}

export default AgentData;
