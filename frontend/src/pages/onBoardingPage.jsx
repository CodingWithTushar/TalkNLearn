import { useState } from "react";
import { Input } from "../components/input";
import { CameraIcon, EarthIcon, MapPinIcon, ShuffleIcon } from "lucide-react";
import { useAuthUser } from "../hooks/useAuthUser";
import { toast } from "react-hot-toast";
import { LANGUAGES } from "../utils/constants";
import useOnBoarding from "../hooks/useOnBoarding";

const OnBoardingPage = () => {
  const { authUser } = useAuthUser();

  const [formData, setformData] = useState({
    fullName: authUser?.fullName || "",
    bio: authUser?.bio || "",
    nativeLanguage: authUser?.nativeLanguage || "",
    learningLanguage: authUser?.learningLanguage || "",
    location: authUser?.location || "",
    profilePic: authUser?.profilePic || "",
  });

  const { OnBoardingFn, isPending, error } = useOnBoarding();

  const handleOnBoarding = async (e) => {
    e.preventDefault();
    OnBoardingFn(formData);
  };

  const handleRandomAvatar = () => {
    const randomNumber = Math.floor(Math.random() * 100) + 1;
    const randomAvatar = `https://avatar.iran.liara.run/public/${randomNumber}.png`;
    setformData({ ...formData, profilePic: randomAvatar });
    toast.success("Random Profile Picture Generated ✅");
  };

  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="card bg-base-200 w-full max-w-3xl shadow-xl hover:shadow-2xl transition-all duration-200">
        <div className="card-body p-6 sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">
            Complete Your Profile
          </h1>
          <form onSubmit={handleOnBoarding} className="space-y-4">
            <div className="flex flex-col items-center justify-center">
              <div className="overflow-hidden">
                {formData.profilePic ? (
                  <img
                    src={formData.profilePic}
                    alt="Profile Preview"
                    className="rounded-full w-16 h-16"
                  />
                ) : (
                  <CameraIcon className="rounded-full w-16 h-16 border p-2" />
                )}
              </div>
              <div className="flex items-center gap-1 mt-3">
                <button
                  className="btn rounded-full"
                  type="button"
                  onClick={handleRandomAvatar}
                >
                  <ShuffleIcon className="size-4" />
                  Generate Random Avatar
                </button>
              </div>
            </div>

            {error && (
              <div className="alert alert-error my-2">
                <span>{error.response.data.message}</span>
              </div>
            )}

            <Input
              title="Full Name"
              value={formData.fullName}
              onChange={(e) =>
                setformData({ ...formData, fullName: e.target.value })
              }
              placeholder="Full Name"
              className="rounded-xl"
            />

            <label className="block text-lg font-medium text-gray-700">
              Bio
            </label>
            <textarea
              value={formData.bio}
              onChange={(e) =>
                setformData({ ...formData, bio: e.target.value })
              }
              placeholder="Tell others about yourself and your language learning goals"
              className="w-full px-3.5 py-2.5 text-md border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 h-24"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="form-control gap-2">
                <label className="block text-lg font-medium text-gray-700">
                  Native Language
                </label>
                <select
                  value={formData.nativeLanguage}
                  onChange={(e) =>
                    setformData({
                      ...formData,
                      nativeLanguage: e.target.value,
                    })
                  }
                  className="select w-full px-3.5 py-2.5 text-md border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                >
                  <option value="">Select your native language</option>
                  {LANGUAGES.map((lang) => (
                    <option key={`native-${lang}`} value={lang.toLowerCase()}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-control gap-2">
                <label className="block text-lg font-medium text-gray-700">
                  Learning Language
                </label>
                <select
                  value={formData.learningLanguage}
                  onChange={(e) =>
                    setformData({
                      ...formData,
                      learningLanguage: e.target.value,
                    })
                  }
                  className="select w-full px-3.5 py-2.5 text-md border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                >
                  <option value="">Select your learning language</option>
                  {LANGUAGES.map((lang) => (
                    <option key={`learn-${lang}`} value={lang.toLowerCase()}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-3">
              <label className="block text-lg font-medium text-gray-700">
                Location
              </label>
              <div className="relative mt-2">
                <MapPinIcon className="absolute top-3 left-3 opacity-70 hidden lg:flex" />
                <input
                  name="location"
                  value={formData.location}
                  onChange={(e) =>
                    setformData({ ...formData, location: e.target.value })
                  }
                  placeholder="City, Country"
                  className="w-full pl-10 pr-4 py-2.5 text-md border border-gray-300 rounded-full shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                  required
                />
              </div>
            </div>

            <button
              className="btn btn-primary w-full rounded-full flex items-center gap-2"
              type="submit"
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <span className="loading loading-spinner loading-xs"></span>
                  Onboarding...
                </>
              ) : (
                <>
                  <EarthIcon className="w-4 h-4" />
                  Complete Onboarding
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OnBoardingPage;
