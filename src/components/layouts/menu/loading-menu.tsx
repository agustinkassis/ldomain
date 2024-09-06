import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingMenu() {
  return (
    <div className='flex flex-col gap-4 pt-2'>
      <Skeleton className='h-6 w-[70px]' />
      <Skeleton className='h-6 w-[170px]' />
      <Skeleton className='h-6 w-[120px]' />
      <Skeleton className='h-6 w-[150px]' />
      <Skeleton className='h-6 w-[170px]' />
    </div>
  );
}
