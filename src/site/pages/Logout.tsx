import { useAuth0 } from '@auth0/auth0-react';
import Button from '@cloudscape-design/components/button';

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <Button
      variant="primary"
      onClick={() =>
        logout({ logoutParams: { returnTo: window.location.origin } })
      }
    >
      Log Out
    </Button>
  );
};

export default LogoutButton;
