import { Label } from "@/components/ui/label";
import Image from "next/image";

/* eslint-disable @next/next/no-img-element */
export default function VerifyDomainStep() {
  return (
    <>
      <div className='w-full h-[200px] relative mb-2'>
        <Image
          src='https://img-cdn.pixlr.com/image-generator/history/66d11da3bb3107af8a41027c/e41c2851-7815-420a-8ee6-fc2fe8746ad7/preview.webp'
          alt='Verify Domain'
          layout='fill'
          objectFit='cover'
          objectPosition='0px -20px'
          className='w-full h-auto rounded-lg'
        />
      </div>
      <Label htmlFor='verify' className='text-sm font-medium'>
        Verify Domain
      </Label>
      <p className='text-xs sm:text-sm text-muted-foreground'>
        Please verify your domain ownership. Instructions will be provided here.
      </p>
    </>
  );
}
