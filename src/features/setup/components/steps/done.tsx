import { Label } from "@/components/ui/label";
import Image from "next/image";

export default function DoneStep() {
  return (
    <>
      <div className='w-full h-[200px] relative mb-2'>
        <Image
          src='https://img-cdn.pixlr.com/image-generator/history/66d11fb9e43d2316c7d04015/b1a2edfa-8693-4cc5-a2d7-3ccf0e77f179/preview.webp'
          alt='Rewrite .well-known'
          layout='fill'
          objectFit='cover'
          objectPosition='0px -5px'
          className='w-full h-auto rounded-lg'
        />
      </div>
      <Label htmlFor='pubkey' className='text-xl font-medium'>
        Congratulations
      </Label>
      <p className='text-xs sm:text-sm text-muted-foreground'>
        You are ready to start joining new users.
      </p>
    </>
  );
}
