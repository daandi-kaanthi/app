// src/hooks/useUserStatus.ts
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

type UserStatus = "pending" | "active" | "paused" | "rejected" | null;

const useUserStatus = () => {
  const [status, setStatus] = useState<UserStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Mock wallet + contract call
  const checkWalletStatus = async () => {
    setLoading(true);
    // TODO: Replace this with actual smart contract logic
    await new Promise(res => setTimeout(res, 1000));

    // Example status coming from contract
    const walletStatus: UserStatus | null = null; // change for testing: "active", "pending", "paused", "rejected" or null
    setStatus(null);
    setLoading(false);
  
    if (walletStatus === "active") {
      navigate("/profile");
    }
  };

  useEffect(() => {
    checkWalletStatus();
  }, []);

  return { status, loading };
};

export default useUserStatus;
