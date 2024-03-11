import Button from '@cloudscape-design/components/button';
import Form from '@cloudscape-design/components/form';
import Header from '@cloudscape-design/components/header';
import SpaceBetween from '@cloudscape-design/components/space-between';
import { useContext, useState } from 'react';
import AgentContext from '../context/AgentContext';
import { useNavigate } from 'react-router-dom';
import Container from '@cloudscape-design/components/container';
import FormField from '@cloudscape-design/components/form-field';
import Input from '@cloudscape-design/components/input';

function Register() {
  const [symbol, setSymbol] = useState('');
  const { setAgentData } = useContext(AgentContext);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState('');
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

  const handleLogin = () => {
    setLoading(true);
    setError('');
    fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({ token: token }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.json())
      .then((res) => setAgentData(res))
      .catch((error) => setError(JSON.stringify(error)))
      .finally(() => navigate('/agentdata'));
  };

  return (
    <SpaceBetween size="xs">
      <Container
        header={<Header variant="h2">Register a new Space Trader</Header>}
      >
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
          <SpaceBetween size="xs">
            <FormField label="Symbol" description="Your callsign!">
              <Input
                onChange={({ detail }) => setSymbol(detail.value)}
                value={symbol}
              />
            </FormField>
            <FormField label="Faction" description="Other options coming soon!">
              <Input disabled value={'COSMIC'} />
            </FormField>
          </SpaceBetween>
        </Form>
      </Container>
      <Container header={<Header variant="h3">Already registered?</Header>}>
        <Form
          actions={
            <Button
              loading={loading}
              disabled={loading}
              variant="primary"
              onClick={handleLogin}
            >
              Login
            </Button>
          }
        >
          <FormField
            label="Agent Token"
            description="Enter this instead of creating a new agent."
          >
            <Input
              value={token}
              onChange={({ detail }) => setToken(detail.value)}
            />
          </FormField>
        </Form>
      </Container>
    </SpaceBetween>
  );
}

export default Register;
