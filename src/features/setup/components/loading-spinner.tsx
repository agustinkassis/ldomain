import { Loader2 } from "lucide-react";

export default function LoadingSpinner() {
  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
      <div className='bg-white rounded-lg p-8 flex flex-col items-center'>
        <Loader2 className='w-16 h-16 animate-spin text-primary' />
        <p className='mt-4 text-lg font-semibold'>Loading...</p>
      </div>
    </div>
  );
}
