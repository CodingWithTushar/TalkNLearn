import { useState } from "react";
import { Input, PasswordInput } from "../components/input";
import { Projector } from "lucide-react";
import { Link } from "react-router-dom";
import useSignUp from "../hooks/useSignUp";

const SignUpPage = () => {
  const [formData, setformData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { SingUpFn, isPending, error } = useSignUp();

  const handleSignUp = async (e) => {
    e.preventDefault();
    SingUpFn(formData);
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="max-w-5xl flex items-center mx-auto font-semibold border-2 p-9 gap-5 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-200 overflow-hidden">
        <div className="flex flex-col">
          <div className="flex gap-3 items-center justify-start">
            <Projector className="size-9 text-primary" />
            <span className="text-3xl font-bold font-mono bg-clip-text text-transparent tracking-wider bg-gradient-to-r from-primary to-secondary ">
              TalkNLearn
            </span>
          </div>
          {error && (
            <div className="alert alert-error my-2">
              <span>{error.response.data.message}</span>
            </div>
          )}
          <form className="mt-1 space-y-2" onSubmit={handleSignUp}>
            <div className="mt-1">
              <h3 className="text-xl">Create An Account</h3>
              <h4 className="text-sm font-medium opacity-70">
                Join TalkNLearn and Start your language learning journey
              </h4>
            </div>
            <Input
              title={"Full Name"}
              type={"text"}
              placeholder={"John Wick"}
              value={formData.fullName}
              onChange={(e) =>
                setformData({ ...formData, fullName: e.target.value })
              }
            />
            <Input
              title={"Gmail"}
              type={"email"}
              placeholder={"JohnWick01@gmail.com"}
              value={formData.email}
              onChange={(e) =>
                setformData({ ...formData, email: e.target.value })
              }
            />
            <PasswordInput
              title={"Password"}
              placeholder={"JohnWick$9753"}
              value={formData.password}
              onChange={(e) =>
                setformData({ ...formData, password: e.target.value })
              }
            />
            <p className="my-1 opacity-70 text-xs">
              Password must be atleast 6 characters long
            </p>
            <div className="flex gap-1 mt-3 ">
              <input type="checkbox" required />
              <h4 className="text-sm">
                I agree to the{" "}
                <span className="text-primary hover:underline">
                  <Link to={"/"} className="hover:underline">
                    {" "}
                    terms of service
                  </Link>
                </span>{" "}
                and{" "}
                <span className="text-primary hover:underline">
                  <Link to={"/"} className="hover:underline">
                    {" "}
                    privacy policy
                  </Link>
                </span>
              </h4>
            </div>
            <div className="flex items-center justify-center my-2">
              <button
                className="btn btn-primary w-full rounded-full hover:scale-105 mt-2 transition-all duration-200 "
                type="submit"
                disabled={isPending}
              >
                {isPending ? (
                  <>
                    <span className="loading loading-spinner loading-xs"></span>
                    Loading...
                  </>
                ) : (
                  <>Create Account</>
                )}
              </button>
            </div>
            <div className="text-center text-sm ">
              Already have an account?{" "}
              <span className="text-primary hover:underline">
                <Link to={"/login"} className="hover:underline">
                  {" "}
                  Sign In
                </Link>
              </span>
            </div>
          </form>
        </div>
        <div className="hidden  lg:flex lg:w-1/2 items-center justify-center bg-primary/10">
          <div className="max-w-md p-8 ">
            <div className="flex items-center justify-center relative">
              <img
                src="welcome.png"
                alt="Language connection illustration"
                className="w-full h-full"
              />
            </div>
            <div className="text-center mt-1 w-[370px]">
              <h2 className="text-lg">
                "Connect with language partners worldwide"
              </h2>
              <p className="opacity-70 text-sm">
                Practice conversations, make friends, and improve your language
                skills together.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
