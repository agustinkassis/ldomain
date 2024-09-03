import { CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { useState } from "react";
import { StepProps } from "../../types/step";
import { Button } from "@/components/ui/button";
import GuideModal from "../guide/guide-modal";
import { InfoIcon, Loader2 } from "lucide-react";

export default function RewriteStep({
  children,
  handleNext,
  handlePrevious,
}: StepProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleVerify = async () => {
    setIsLoading(true);
    setTimeout(() => {
      handleNext();
      setIsLoading(false);
    }, 600);
  };

  return (
    <>
      <GuideModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
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

            <Button
              variant='outline'
              className='w-full'
              onClick={() => setIsModalOpen(true)}
            >
              <InfoIcon className='mr-2' />
              Setup Instructions
            </Button>
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

          <div className='text-right'>Verify Rules</div>
        </Button>
      </CardFooter>
    </>
  );
}
