import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { StepProps } from "../../types/step";
import { useState } from "react";

export default function VerifyDomainStep({
  children,
  handleNext,
  handlePrevious,
}: StepProps) {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <>
      <CardContent>
        {children}
        <div className='mt-6 space-y-4'>
          <div className='space-y-4'>
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
              Please verify your domain ownership. Instructions will be provided
              here.
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className='flex justify-between'>
        <Button
          variant='outline'
          onClick={handlePrevious}
          disabled={isLoading}
          className='text-sm sm:text-md px-2 sm:px-8'
        >
          Previous
        </Button>

        <Button
          onClick={handleNext}
          disabled={isLoading}
          size={"lg"}
          className='text-sm sm:text-md px-2 sm:px-8'
        >
          Next
        </Button>
      </CardFooter>
    </>
  );
}
