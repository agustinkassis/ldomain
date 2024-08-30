import { Label } from "@/components/ui/label";
import Image from "next/image";
import { useState } from "react";
import { StepProps } from "../../types/step";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function DoneStep({ children, handleNext }: StepProps) {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <>
      <CardContent>
        {children}
        <div className='mt-6 space-y-4'>
          <div className='space-y-4'>
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
          Start Recruiting
        </Button>
      </CardFooter>
    </>
  );
}
