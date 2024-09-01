import { CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { FormEvent, useState } from "react";
import { StepProps } from "../../types/step";
import { Loader2 } from "lucide-react";

export default function ChooseDomainStep({ children, handleNext }: StepProps) {
  const [isLoading, setIsLoading] = useState(false);

  const checkDomain = async (domain: string): Promise<void> => {
    console.info(`Mocking domain check for ${domain}...`);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (domain == "") {
          reject("Domain is empty");
          return;
        }
        resolve();
      }, 500);
    });
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const _data = new FormData(e.currentTarget);
      const data = Object.fromEntries(_data);
      await checkDomain(data.domain.toString());
      handleNext();
    } catch (error) {
      console.error("Error while verifying domain");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <form onSubmit={onSubmit}>
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
            <Label htmlFor='domain' className='text-lg font-medium p-0'>
              Write your domain
            </Label>
            <Input
              id='domain'
              name='domain'
              placeholder='domain.com'
              disabled={isLoading}
              className='w-full mt-0'
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className='flex flex-row justify-between'>
        <div></div>
        <Button
          disabled={isLoading}
          type='submit'
          size={"lg"}
          className={`text-sm sm:text-md px-2 sm:px-4 flex flex-row gap-2`}
        >
          {isLoading && (
            <div className='text-left'>
              <Loader2 className='w-4 h-4 animate-spin text-white' />
            </div>
          )}

          <div className='text-right'>Register</div>
        </Button>
      </CardFooter>
    </form>
  );
}
