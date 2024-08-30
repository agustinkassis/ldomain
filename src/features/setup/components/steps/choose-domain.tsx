/* eslint-disable @next/next/no-img-element */
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";

export default function ChooseDomainStep() {
  return (
    <>
      <div className='w-full h-[200px] relative mb-2'>
        <Image
          src='https://img-cdn.pixlr.com/image-generator/history/66d1204c8e23d2e54e0fd87c/2649a35c-e555-4944-aad8-da1fd3c2bac5/preview.webp'
          alt='Choose Domain'
          layout='fill'
          objectFit='cover'
          objectPosition='0px -10px'
          className='w-full h-auto rounded-lg'
        />
      </div>
      <Label htmlFor='domain' className='text-lg font-medium'>
        Choose Domain
      </Label>
      <Input
        id='domain'
        placeholder='Enter your domain name'
        className='w-full'
      />
    </>
  );
}
