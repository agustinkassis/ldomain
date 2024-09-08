import { useState } from "react";
import { WalletCategory, WalletProvider } from "@/types/wallet";
import providers from "@/features/providers/lib/list";
import {
  Search,
  Wallet,
  Building,
  Network,
  Repeat,
  ArrowLeft,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import WalletProviderButton from "./wallet-provider-button";
import { ScrollArea } from "@/components/ui/scroll-area";

const providerCategories = {
  wallet: {
    label: "Wallets",
    icon: <Wallet className='h-4 w-4' />,
  },
  exchange: {
    label: "Exchanges",
    icon: <Building className='h-4 w-4' />,
  },
  protocol: {
    label: "Protocols",
    icon: <Network className='h-4 w-4' />,
  },
  swap: {
    label: "Swap",
    icon: <Repeat className='h-4 w-4' />,
  },
};

interface CreateWalletDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CreateWalletDialog({
  open,
  onOpenChange,
}: CreateWalletDialogProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("wallet");
  const [selectedProvider, setSelectedProvider] = useState<WalletProvider>();

  const renderProviderList = (category: WalletCategory) => {
    const filteredProviders = providers.filter(
      (provider) =>
        provider.category === category &&
        provider.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
        {filteredProviders.map((provider, k) => (
          <WalletProviderButton
            key={k}
            provider={provider}
            setSelectedProvider={setSelectedProvider}
          />
        ))}
        {filteredProviders.length === 0 && (
          <p className='text-center text-muted-foreground col-span-full'>
            No providers found
          </p>
        )}
      </div>
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[600px] h-[calc(100vh-20px)] flex flex-col mb-[10px]'>
        {!selectedProvider ? (
          <>
            <DialogHeader>
              <DialogTitle>Choose a Provider</DialogTitle>
              <DialogDescription>
                Connect with one of our available providers or protocols.
              </DialogDescription>
            </DialogHeader>
            <Tabs
              defaultValue='exchange'
              className='w-full flex-grow flex flex-col'
              onValueChange={setSelectedCategory}
              value={selectedCategory}
            >
              <TabsList className='grid w-full grid-cols-4'>
                {Object.entries(providerCategories).map(([key, category]) => (
                  <TabsTrigger key={key} value={key}>
                    {category.label}
                  </TabsTrigger>
                ))}
              </TabsList>
              <div className='flex-grow flex flex-col'>
                <div className='relative my-2'>
                  <Search className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
                  <Input
                    placeholder='Search providers'
                    className='pl-8'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <ScrollArea className='flex-grow w-full h-[100px]'>
                  {Object.entries(providerCategories).map(([key, category]) => (
                    <TabsContent key={key} value={key} className='mt-2'>
                      {renderProviderList(key as WalletCategory)}
                    </TabsContent>
                  ))}
                </ScrollArea>
              </div>
            </Tabs>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className='flex flex-row items-center gap-2'>
                <Button
                  variant='outline'
                  onClick={() => setSelectedProvider(undefined)}
                >
                  <ArrowLeft className='h-4 w-4' />
                </Button>
                <div>{selectedProvider.name} Configuration</div>
              </DialogTitle>
              <DialogDescription>
                Follow the steps below to connect your {selectedProvider.name}{" "}
                account.
              </DialogDescription>
            </DialogHeader>
            {selectedProvider?.setupComponent ? (
              <selectedProvider.setupComponent
                setSelectedProvider={setSelectedProvider}
              />
            ) : (
              <div>Not yet implemented</div>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
