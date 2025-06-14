import { useState } from "react";
import { Input, PasswordInput } from "../components/input";
import { LogInIcon, Projector } from "lucide-react";
import { Link } from "react-router-dom";
import useLogIn from "../hooks/useLogIn.js";

const LogInPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { LogInFn, isPending, error } = useLogIn();

  const handleLogin = async (e) => {
    e.preventDefault();
    LogInFn(formData);
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center p-2 sm:p-6 md:p-8">
      <div className="w-full max-w-5xl mx-auto border flex flex-col lg:flex-row p-9 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-200 overflow-hidden">
        <div className="w-full lg:w-1/2 flex flex-col p-4 sm:p-8">
          <div className="mb-4 flex items-center justify-start gap-2">
            <Projector className="size-9 text-primary" />
            <span className="text-3xl font-bold font-mono bg-clip-text text-transparent tracking-wider bg-gradient-to-r from-primary to-secondary">
              TalkNLearn
            </span>
          </div>

          {error?.response?.data?.message && (
            <div className="alert alert-error my-2">
              <span>{error.response.data.message}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="w-full">
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-semibold">Welcome Back</h2>
                <p className="text-sm opacity-70">
                  Sign in to your account to continue your language journey
                </p>
              </div>

              <div className="form-control">
                <Input
                  title="Gmail"
                  type="email"
                  placeholder="JohnWick01@gmail.com"
                  autoComplete="email"
                  autoFocus
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>

              <div className="form-control">
                <PasswordInput
                  title="Password"
                  placeholder="JohnWick$9753"
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
              </div>

              <button
                className="btn btn-primary w-full rounded-full hover:scale-105 mt-4 transition-all duration-200"
                type="submit"
                disabled={isPending}
              >
                {isPending ? (
                  <>
                    <span className="loading loading-spinner loading-xs mr-2"></span>
                    Logging...
                  </>
                ) : (
                  <>
                    <LogInIcon className="w-4 h-4 mr-2" />
                    Log In
                  </>
                )}
              </button>

              <div className="text-center">
                <p className="text-sm">
                  Don't have an Account?
                  <Link to={"/signup"} className="text-primary hover:underline ml-1">
                    Create one
                  </Link>
                </p>
              </div>
            </div>
          </form>
        </div>

        <div className="hidden lg:flex w-full lg:w-1/2 bg-primary/10 items-center justify-center">
          <div className="max-w-md p-8">
            <div className="relative aspect-square max-w-sm mx-auto">
              <img
                src="login.png"
                alt="Language connection illustration"
                className="w-full h-full"
              />
            </div>

            <div className="text-center space-y-3 mt-6">
              <h2 className="text-xl font-semibold">
                Connect with language partners worldwide
              </h2>
              <p className="opacity-70">
                Practice conversations, make friends, and improve your language
                skills together
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogInPage;
