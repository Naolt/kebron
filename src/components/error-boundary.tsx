"use client";
import { useEffect } from "react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px]">
      <h2>Something went wrong!</h2>
      <button
        onClick={reset}
        className="mt-4 px-4 py-2 bg-primary text-white rounded-md"
      >
        Try again
      </button>
    </div>
  );
}
