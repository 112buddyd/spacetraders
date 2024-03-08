import { FormField, Input } from '@cloudscape-design/components';
import Button from '@cloudscape-design/components/button';
import Form from '@cloudscape-design/components/form';
import Header from '@cloudscape-design/components/header';
import SpaceBetween from '@cloudscape-design/components/space-between';
import { useContext, useState } from 'react';
import AgentContext from '../context/AgentContext';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [symbol, setSymbol] = useState('');
  const { setAgentData } = useContext(AgentContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = () => {
    setLoading(true);
    setError('');
    fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify({ symbol: symbol }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.json())
      .then((res) => setAgentData(res))
      .catch((error) => setError(JSON.stringify(error)))
      .finally(() => navigate('/agentdata'));
  };

  return (
    <SpaceBetween size="xs">
      <Header variant="h2">Register a new Space Trader</Header>
      <Form
        actions={
          <Button
            loading={loading}
            disabled={loading}
            variant="primary"
            onClick={handleRegister}
          >
            Register
          </Button>
        }
        errorText={error}
      >
        <FormField label="Symbol" description="Your callsign!">
          <Input
            onChange={({ detail }) => setSymbol(detail.value)}
            value={symbol}
          />
        </FormField>
        <FormField label="Faction" description="Other options coming soon!">
          <Input disabled value={'COSMIC'} />
        </FormField>
      </Form>
    </SpaceBetween>
  );
}

export default Register;
