import { CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { useState } from "react";
import { StepProps } from "../../types/step";
import { Button } from "@/components/ui/button";

export default function RewriteStep({
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
                src='https://img-cdn.pixlr.com/image-generator/history/66d11f3f55d0cd31dc916086/4352ec2f-b53f-4507-b6ec-39452ba2701f/preview.webp'
                alt='Rewrite .well-known'
                layout='fill'
                objectFit='cover'
                objectPosition='0px -10px'
                className='w-full h-auto rounded-lg'
              />
            </div>
            <Label htmlFor='domain' className='text-lg font-medium p-0'>
              Rewrite .well-known
            </Label>
            <p className='text-xs sm:text-sm text-muted-foreground'>
              Origin:
              <span className='bg-slate-200 p-1 rounded-md'>
                DOMAIN/.well-known/(path)
              </span>{" "}
            </p>
            <p className='text-xs sm:text-sm text-muted-foreground'>
              Rewrite to:
              <span className='bg-slate-200 p-1 rounded-md'>
                https://api.lightningdomain.io/rewrite/(path)
              </span>{" "}
              .
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
