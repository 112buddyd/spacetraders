import Button from '@cloudscape-design/components/button';
import Form from '@cloudscape-design/components/form';
import Header from '@cloudscape-design/components/header';
import SpaceBetween from '@cloudscape-design/components/space-between';
import { useState } from 'react';
import FormField from '@cloudscape-design/components/form-field';
import Input from '@cloudscape-design/components/input';
import Box from '@cloudscape-design/components/box';

function Location() {
  const [system, setSystem] = useState('');
  const [waypoint, setWaypoint] = useState('');
  const [location, setLocation] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const getLocation = () => {
    setLoading(true);
    setError('');
    fetch('/api/location?' + new URLSearchParams({ system, waypoint }))
      .then((res) => res.json())
      .then((res) => setLocation(res))
      .catch((error) => setError(JSON.stringify(error)))
      .finally(() => setLoading(false));
  };

  return (
    <SpaceBetween size="xs">
      <Header variant="h2">Get Location Info</Header>
      <Form
        actions={
          <SpaceBetween size="xs" direction="horizontal">
            <Button variant="normal" onClick={() => setLocation({})}>
              Clear
            </Button>
            <Button
              loading={loading}
              disabled={loading}
              variant="primary"
              onClick={getLocation}
            >
              Lookup
            </Button>
          </SpaceBetween>
        }
        errorText={error}
      >
        <FormField label="System">
          <Input
            onChange={({ detail }) => setSystem(detail.value)}
            value={system}
          />
        </FormField>
        <FormField label="Waypoint">
          <Input
            onChange={({ detail }) => setWaypoint(detail.value)}
            value={waypoint}
          />
        </FormField>
      </Form>
      {!loading && location && (
        <Box variant="pre">{JSON.stringify(location, null, 2)}</Box>
      )}
    </SpaceBetween>
  );
}

export default Location;
