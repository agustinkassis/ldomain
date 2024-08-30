import { Label } from "@/components/ui/label";
import Image from "next/image";

export default function RewriteStep() {
  return (
    <>
      <div className='w-full h-[200px] relative mb-2'>
        <Image
          src='https://img-cdn.pixlr.com/image-generator/history/66d11f3f55d0cd31dc916086/4352ec2f-b53f-4507-b6ec-39452ba2701f/preview.webp'
          alt='Rewrite .well-known'
          layout='fill'
          objectFit='cover'
          objectPosition='0px -10px'
          className='w-full h-auto rounded-lg'
        />
      </div>
      <Label htmlFor='rewrite' className='text-sm font-medium'>
        Rewrite .well-known
      </Label>
      <p className='text-xs sm:text-sm text-muted-foreground'>
        Rewrite your .well-known file. Detailed steps will be shown here.
      </p>
    </>
  );
}
