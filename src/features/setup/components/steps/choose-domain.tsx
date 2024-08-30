import { CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { StepProps } from "../../types/step";

export default function ChooseDomainStep({ children, handleNext }: StepProps) {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <>
      <CardContent>
        {children}
        <div className='mt-6 space-y-4'>
          <div className='space-y-4'>
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
          </div>
        </div>
      </CardContent>
      <CardFooter className='flex justify-between'>
        <div></div>
        <Button
          onClick={handleNext}
          disabled={isLoading}
          size={"lg"}
          className='text-sm sm:text-md px-2 sm:px-8'
        >
          Registrar
        </Button>
      </CardFooter>
    </>
  );
}
