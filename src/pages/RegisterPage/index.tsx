import SignUpLeft from "../../components/Register/SignUpLeft";
import SignUpRight from "../../components/Register/SignUpRight";
import StatusBlocked from "../../components/Register/StatusBlocked";
import { LoaderOne } from "../../components/ui/Text/Loader";
import useUserStatus from "../../hooks/useUserStatus";

const RegisterPage = () => {
  const { status, loading } = useUserStatus();

  if (loading) {
    return (
     <LoaderOne/>
    );
  }

  // Show signup only when status is null or pending
  return (
    <div className="w-full h-[100vh] pb-20 md:py-0 overflow-auto max-h-screen flex flex-col md:flex-row items-center">
      <SignUpLeft />
      {status === "paused" || status==="pending" || status === "rejected" ? <StatusBlocked status={status} /> :
      <SignUpRight />
      }
    </div>
  );
};

export default RegisterPage;
