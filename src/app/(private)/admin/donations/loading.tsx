import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DonationsLoading() {
  return (
    <div className="p-6">
      <Card className="max-w-[1400px] rounded-none">
        <CardHeader>
          <CardTitle>Donation Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {/* Online Giving Link */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-[100px]" />
              <Skeleton className="h-10 w-full" />
            </div>

            {/* Bank Details Section */}
            <div className="space-y-4">
              <Skeleton className="h-6 w-[120px]" />

              {/* Bank Name */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-[80px]" />
                <Skeleton className="h-10 w-full" />
              </div>

              {/* IBAN */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-[40px]" />
                <Skeleton className="h-10 w-full" />
              </div>

              {/* Account Holder */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-[120px]" />
                <Skeleton className="h-10 w-full" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
