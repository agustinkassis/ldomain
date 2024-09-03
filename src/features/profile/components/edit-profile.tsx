"use client";
/* eslint-disable @next/next/no-img-element */
import { ChangeEvent, FormEvent, FormEventHandler, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

export default function EditProfile() {
  const [name, setName] = useState("Satoshi Nakamoto");
  const [about, setAbout] = useState("Creator of Bitcoin");
  const [website, setWebsite] = useState("https://bitcoin.org");
  const [avatarUrl, setAvatarUrl] = useState(
    "/placeholder.svg?height=100&width=100"
  );
  const [coverUrl, setCoverUrl] = useState(
    "https://generated.vusercontent.net/placeholder.svg?height=200&width=600&text=Cover+Image"
  );

  const handleAvatarChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target?.files?.[0];
    if (file) {
      setAvatarUrl(
        `https://generated.vusercontent.net//placeholder.svg?height=100&width=100&text=${encodeURIComponent(
          file.name
        )}`
      );
    }
  };

  const handleCoverChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target?.files?.[0];
    if (file) {
      setCoverUrl(
        `https://generated.vusercontent.net//placeholder.svg?height=200&width=600&text=${encodeURIComponent(
          file.name
        )}`
      );
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Profile updated:", {
      name,
      about,
      website,
      avatarUrl,
      coverUrl,
    });
  };

  return (
    <Card className='w-full max-w-2xl mx-auto'>
      <div className='relative group'>
        <div className='h-48 overflow-hidden'>
          <img src={coverUrl} alt='Cover' className='w-full object-cover' />
        </div>
        <div className='absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center'>
          <Label htmlFor='cover' className='cursor-pointer'>
            <Button variant='secondary' size='sm'>
              Change Cover
            </Button>
          </Label>
          <Input
            id='cover'
            type='file'
            accept='image/*'
            className='hidden'
            onChange={handleCoverChange}
          />
        </div>
      </div>
      <CardContent className='relative -mt-16 px-6'>
        <form onSubmit={handleSubmit} className='space-y-6'>
          <div className='flex items-end space-x-4'>
            <div className='relative group'>
              <Avatar className='w-32 h-32 border-4 border-background'>
                <AvatarImage src={avatarUrl} alt='User avatar' />
                <AvatarFallback>SN</AvatarFallback>
              </Avatar>
              <div className='absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-full'>
                <Label htmlFor='avatar' className='cursor-pointer'>
                  <Button variant='secondary' size='sm'>
                    Change
                  </Button>
                </Label>
                <Input
                  id='avatar'
                  type='file'
                  accept='image/*'
                  className='hidden'
                  onChange={handleAvatarChange}
                />
              </div>
            </div>
            <div className='flex-grow'>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder='Your name'
                className='text-2xl font-bold bg-transparent border-none focus:ring-0'
              />
            </div>
          </div>

          <div className='space-y-2'>
            <Label htmlFor='about'>About</Label>
            <Textarea
              id='about'
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              placeholder='Tell us about yourself'
              rows={3}
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='website'>Website</Label>
            <Input
              id='website'
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              placeholder='https://yourwebsite.com'
            />
          </div>

          <Button type='submit' className='w-full'>
            Save Changes
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
