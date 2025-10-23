import React from "react";
import assest01 from "./../../assets/signup/Location.png";
import assest02 from "./../../assets/signup/category.png";
import assest03 from "./../../assets/signup/boxtime.png";
import assest04 from "./../../assets/signup/videosquare.png";

const SignUpLeft: React.FC = () => {
  return (
    <div className="w-full md:w-1/2 py-10 px-[7%] h-[100vh]  flex flex-col justify-center
      bg-[#194F9F]  text-white dark:text-neutral-100 transition-colors duration-300"
    >
      {/* Heading */}
      <div className="text-[28px] font-bold lato-font mb-8">
        Grow Your Travel Business with Daandi Kaanthi Adventures
      </div>

      {/* Feature Grid */}
      <div className="grid grid-cols-2 grid-rows-2 gap-6 mb-10">
        <div className="flex items-center space-x-4">
          <img src={assest01} alt="Reach New Destinations" className="w-8 h-8" />
          <span className="text-sm font-semibold lato-font">
            Access New <br /> Mountain Routes
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <img src={assest02} alt="Partner Support" className="w-8 h-8" />
          <span className="text-sm font-semibold lato-font">
            Partner Support <br /> & Guidance
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <img src={assest03} alt="Training" className="w-8 h-8" />
          <span className="text-sm font-semibold lato-font">
            Agent Training <br /> Programs
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <img src={assest04} alt="Marketing Support" className="w-8 h-8" />
          <span className="text-sm font-semibold lato-font">
            Marketing & <br /> Promotional Help
          </span>
        </div>
      </div>

      {/* Signup Instructions */}
      <div className="lato-font">
        <h2 className="text-base font-bold pb-2">
          Become a Daandi Kaanthi Travel Agent
        </h2>
        <p className="text-sm mb-2">
          Join our network of trusted travel partners and grow your business.
        </p>
        <ul className="list-disc pl-6">
          <li className="text-sm font-medium">GSTIN Number</li>
          <li className="text-sm font-medium">Indian Nationality ID</li>
          <li className="text-sm font-medium">Business Registration Proof</li>
          <li className="text-sm font-medium">Bank Account Details</li>
        </ul>
      </div>
    </div>
  );
};

export default SignUpLeft;
