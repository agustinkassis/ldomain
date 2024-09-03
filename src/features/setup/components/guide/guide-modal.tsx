"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import NextJsContent from "./tabs/nextjs-tab";
import ViteContent from "./tabs/vite-tab";
import CloudflareContent from "./tabs/cloudflare-tab";
import WordPressContent from "./tabs/wordpress-tab";

import { useEffect, useState } from "react";
import { Platform } from "../../types/plaform";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import GatsbyContent from "./tabs/gatsby-tab";
import NuxtJsContent from "./tabs/nuxtjs-tab";
import SveltekitContent from "./tabs/sveltekit-tab";
import ParcelContent from "./tabs/parcel-tab";
import ReactCRAContent from "./tabs/react-cra-tab";
import RemixContent from "./tabs/remix-tab";
import ApacheContent from "./tabs/apache-tab";
import NginxContent from "./tabs/nginx-tab";

interface GuideModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const platforms: Platform[] = [
  { name: "Apache", component: ApacheContent },
  { name: "Gatsby", component: GatsbyContent },
  { name: "Next.js", component: NextJsContent },
  { name: "Nginx", component: NginxContent },
  { name: "Nuxt.js", component: NuxtJsContent },
  { name: "Parcel", component: ParcelContent },
  { name: "React (CRA)", component: ReactCRAContent },
  { name: "Remix", component: RemixContent },
  { name: "Sveltekit", component: SveltekitContent },
  { name: "Vite", component: ViteContent },
  { name: "WordPress", component: WordPressContent },
];

export default function GuideModal({ isOpen, setIsOpen }: GuideModalProps) {
  const [currentPlatform, setCurrentPlatform] = useState<Platform>();

  useEffect(() => {
    if (isOpen) {
      setCurrentPlatform(undefined);
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className='sm:max-w-[600px] p-6'>
        <DialogHeader>
          <DialogTitle className='text-2xl font-semibold'>
            {currentPlatform && (
              <Button
                variant='ghost'
                onClick={() => setCurrentPlatform(undefined)}
                className='mb-4 mr-2'
              >
                <ArrowLeft className='h-4 w-4' />
              </Button>
            )}
            Rewrite rules guide
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className='max-h-[400px] w-full rounded-md border p-4'>
          {currentPlatform ? (
            <currentPlatform.component />
          ) : (
            <div className='grid grid-cols-2 gap-4'>
              {platforms.map((platform) => (
                <Button
                  key={platform.name}
                  onClick={() => setCurrentPlatform(platform)}
                  className='h-24 text-lg font-semibold'
                >
                  {platform.name}
                </Button>
              ))}
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
