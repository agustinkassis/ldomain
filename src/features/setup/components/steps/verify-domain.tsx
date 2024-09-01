import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { StepProps } from "../../types/step";
import { useState } from "react";
import { Loader2 } from "lucide-react";

export default function VerifyDomainStep({
  children,
  handleNext,
  handlePrevious,
}: StepProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleVerify = async () => {
    setIsLoading(true);
    setTimeout(() => {
      handleNext();
      setIsLoading(false);
    }, 600);
  };

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
            <Label htmlFor='domain' className='text-lg font-medium p-0'>
              Verify Domain
            </Label>
            <p className='text-xs sm:text-sm text-muted-foreground'>
              Create a file named{" "}
              <span className='bg-slate-200 p-1 rounded-md'>verify.txt</span>{" "}
              with the following content.
            </p>
            <p className='text-xs sm:text-sm text-muted-foreground bg-slate-200 p-1 rounded-md'>
              24242342342343424242342343423
            </p>
            <p className='text-xs sm:text-sm text-muted-foreground'>
              The file should be accesible at the following URL:
            </p>
            <p className='text-xs sm:text-sm bg-slate-200 p-1 rounded-md'>
              https://yourdomain.com/.well-known/verify.txt
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
          disabled={isLoading}
          onClick={handleVerify}
          size={"lg"}
          className={`text-sm sm:text-md px-2 sm:px-4 flex flex-row gap-2`}
        >
          {isLoading && (
            <div>
              <Loader2 className='w-4 h-4 animate-spin text-white' />
            </div>
          )}

          <div className='text-right'>Verify Ownership</div>
        </Button>
      </CardFooter>
    </>
  );
}
