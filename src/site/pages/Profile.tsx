import { useAuth0 } from '@auth0/auth0-react';
import Box from '@cloudscape-design/components/box';
import Header from '@cloudscape-design/components/header';
import Spinner from '@cloudscape-design/components/spinner';

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  return (
    <>
      {isLoading ? (
        <Spinner size="large" />
      ) : (
        isAuthenticated && (
          <div>
            <img src={user?.picture} alt={user?.name} />
            <Header variant="h2">{user?.name}</Header>
            <Box>{user?.email}</Box>
          </div>
        )
      )}
    </>
  );
};

export default Profile;
