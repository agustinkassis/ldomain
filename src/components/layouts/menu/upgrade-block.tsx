import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function UpgradeBlock({ isLoading }: { isLoading?: boolean }) {
  return isLoading ? (
    <Skeleton className='w-full h-32' />
  ) : (
    <Card>
      <CardHeader>
        <CardTitle>Upgrade to Pro</CardTitle>
        <CardDescription>
          Unlock all features and get unlimited access to our support team.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button size='sm' className='w-full'>
          Upgrade
        </Button>
      </CardContent>
    </Card>
  );
}
