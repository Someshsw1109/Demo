import Template from "../../components/core/Auth/Template.jsx";
import { useSelector } from "react-redux";

function Signup() {
  // Safely extract loading with a fallback for undefined state
  const { loading } = useSelector((state) => state.auth || { loading: false });

  return (
    loading ? (
      <div className="h-[100vh] flex justify-center items-center">
        <div className="custom-loader"></div>
      </div>
    ) : (
      <Template
        title="Welcome to the SRC Mart"
        description1="Shop Smart, Live Better. Essentials for today, savings for tomorrow, and quality for life."
        formType="signup"
      />
    )
  );
}

export default Signup;
