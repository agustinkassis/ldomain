"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-javascript";
import NextJsContent from "./tabs/nextjs-tab";
import ViteContent from "./tabs/vite-tab";
import CloudflareContent from "./tabs/cloudflare-tab";
import WordPressContent from "./tabs/wordpress-tab";

interface GuideModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}
export default function GuideModal({ isOpen, setIsOpen }: GuideModalProps) {
  useEffect(() => {
    Prism.highlightAll();
  }, [isOpen]);

  const platforms = [
    { name: "Next.js", component: NextJsContent },
    { name: "Vite", component: ViteContent },
    { name: "Cloudflare", component: CloudflareContent },
    { name: "WordPress", component: WordPressContent },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant='outline'>Learn Lightning Domains Configuration</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[600px] p-6'>
        <DialogHeader className='mb-4'>
          <DialogTitle className='text-2xl font-semibold'>
            Lightning Domains Configuration Guide
          </DialogTitle>
        </DialogHeader>
        <Tabs defaultValue='Next.js' className='w-full'>
          <TabsList className='grid w-full grid-cols-4 mb-4'>
            {platforms.map((platform) => (
              <TabsTrigger
                key={platform.name}
                value={platform.name}
                className='text-xs sm:text-sm'
              >
                {platform.name}
              </TabsTrigger>
            ))}
          </TabsList>
          {platforms.map((platform) => (
            <TabsContent key={platform.name} value={platform.name}>
              <platform.component />
            </TabsContent>
          ))}
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
