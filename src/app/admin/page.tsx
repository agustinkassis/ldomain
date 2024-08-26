import { Button } from "@/components/ui/button";

export default function Dashboard() {
  return (
    <>
      <div className='flex items-center'>
        <h1 className='text-lg font-semibold md:text-2xl'>Dashboard</h1>
      </div>
      <div
        className='flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm'
        x-chunk='dashboard-02-chunk-1'
      >
        <div className='flex flex-col items-center gap-1 text-center'>
          <h3 className='text-2xl font-bold tracking-tight'>Empty Dashboard</h3>
          <p className='text-sm text-muted-foreground'>
            The dasboard is under construction.
          </p>
        </div>
      </div>
    </>
  );
}
