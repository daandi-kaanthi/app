"use client";
import { useAuth0 } from "@auth0/auth0-react";
import { AuthenticatedProfile } from "./AuthenticatedProfile";
import { UnauthenticatedProfile } from "./UnauthenticatedProfile";

export function ProfilePage() {
  const { isAuthenticated } = useAuth0();

  return (
    <div
     className="min-h-screen flex flex-col items-center justify-center gap-8 py-6 px-2 md:px-2 text-center">
      {!isAuthenticated ? (
        <UnauthenticatedProfile />
      ) : (
        <AuthenticatedProfile />
      )}
    </div>
  );
}

export default ProfilePage;
