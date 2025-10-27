const LoadingOverlay = ({ show = false, message = "Loading..." }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--background)]/50">
      <div className="flex flex-col items-center text-paragraph">
        <div className="w-10 h-10 border-4 border-t-transparent rounded-full animate-spin" />
        <p className="mt-4">{message}</p>
      </div>
    </div>
  );
};

export default LoadingOverlay;
