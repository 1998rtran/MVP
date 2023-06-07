import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const SignOut = () => {
  const { logout } = useAuth0();

  return (
    <button onClick={() => logout({ logoutParams: { returnTo: 'http://localhost:3000' } })}>
      Sign Out
    </button>
  );
};

export default SignOut;