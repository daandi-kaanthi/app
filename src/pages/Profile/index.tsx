"use client";
import { PackageModal } from "./UserInquiries";
import { ConenctWalletButton } from "../../components/ui/Button/ThirdwebLoginButton";

export function ProfilePage() {

  return (
    <div className="overflow-auto max-h-screen py-12 px-4 md:px-8 flex flex-col gap-8 justify-center">
        {/* <ProfileCarasoul items={cards} loggedIn={loggedIn} /> */}
        <ConenctWalletButton/>
        <PackageModal/>
    </div>
  );
}

export default ProfilePage;