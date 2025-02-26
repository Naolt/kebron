"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DonationsLoading from "./loading";

const formSchema = z.object({
  onlineGivingLink: z.string().url("Please enter a valid URL"),
  bankDetails: z.object({
    bankName: z.string().min(2, "Bank name is required"),
    iban: z.string().min(2, "IBAN is required"),
    accountHolder: z.string().min(2, "Account holder name is required"),
  }),
});

export default function DonationsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      onlineGivingLink: "",
      bankDetails: {
        bankName: "",
        iban: "",
        accountHolder: "",
      },
    },
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch("/api/donations/settings");
        if (!response.ok) throw new Error("Failed to fetch settings");
        const data = await response.json();
        if (data) {
          form.reset({
            onlineGivingLink: data.onlineGivingLink || "",
            bankDetails: {
              bankName: data.bankDetails?.bankName || "",
              iban: data.bankDetails?.iban || "",
              accountHolder: data.bankDetails?.accountHolder || "",
            },
          });
        }
      } catch (error) {
        console.error("Error fetching settings:", error);
        toast.error("Failed to load donation settings");
      } finally {
        setIsInitialLoading(false);
      }
    };
    fetchSettings();
  }, [form]);

  if (isInitialLoading) {
    return <DonationsLoading />;
  }

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/donations/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) throw new Error("Failed to update settings");
      toast.success("Donation settings updated successfully");
    } catch (error) {
      console.error("Error updating settings:", error);
      toast.error("Failed to update donation settings");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    form.reset();
  };

  return (
    <div className="p-6">
      <Card className="max-w-[1400px] rounded-none">
        <CardHeader>
          <CardTitle>Donation Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="onlineGivingLink"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Online Giving Link</FormLabel>
                    <FormControl>
                      <Input placeholder="https://..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Bank Details</h3>
                <FormField
                  control={form.control}
                  name="bankDetails.bankName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bank Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="bankDetails.iban"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>IBAN</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="bankDetails.accountHolder"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Account Holder</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {form.formState.isDirty && (
                <div className="flex gap-2">
                  <Button variant="outline" type="button" onClick={handleReset}>
                    Reset Changes
                  </Button>
                  <Button
                    type="submit"
                    //form="donations-form"
                    isLoading={isLoading}
                  >
                    {isLoading ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              )}
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
