import { LoaderIcon } from "lucide-react";
import { useThemeState } from "../hooks/useThemeSelector";

const LoadingPage = () => {
  const { theme } = useThemeState();

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-base-100 text-base-content transition-colors"
      data-theme={theme}
    >
      <div className="flex flex-col items-center gap-4 animate-fade-in">
        <LoaderIcon className="animate-spin w-14 h-14 text-primary" />
        <p className="text-lg font-semibold animate-pulse">
          Loading, please wait...
        </p>
      </div>
    </div>
  );
};

export default LoadingPage;
