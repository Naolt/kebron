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
import { Plus, Trash2 } from "lucide-react";

const bankAccountSchema = z.object({
  bankName: z.string().min(2, "Bank name is required"),
  iban: z.string().min(2, "IBAN is required"),
  accountHolder: z.string().min(2, "Account holder name is required"),
  description: z.string().min(2, "Description is required"),
});

const formSchema = z.object({
  onlineGivingLink: z.string().url("Please enter a valid URL"),
  bankAccounts: z
    .array(bankAccountSchema)
    .min(1, "At least one bank account is required"),
});

export default function DonationsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      onlineGivingLink: "",
      bankAccounts: [],
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
            bankAccounts: data.bankAccounts || [],
          });
        }
        console.log(data);
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

  const addBankAccount = () => {
    const currentAccounts = form.getValues("bankAccounts") || [];
    form.setValue("bankAccounts", [
      ...currentAccounts,
      { bankName: "", iban: "", accountHolder: "", description: "" },
    ]);
  };

  const removeBankAccount = (index: number) => {
    const currentAccounts = form.getValues("bankAccounts") || [];
    form.setValue(
      "bankAccounts",
      currentAccounts.filter((_, i) => i !== index),
      { shouldDirty: true }
    );
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

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="flex justify-between items-center col-span-full">
                  <h3 className="text-lg font-medium">Bank Accounts</h3>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={addBankAccount}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Account
                  </Button>
                </div>

                {form.watch("bankAccounts")?.map((_, index) => (
                  <div key={index} className="p-4 border rounded-lg space-y-4 ">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">Bank Account {index + 1}</h4>
                      {index > 0 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeBankAccount(index)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>

                    <FormField
                      control={form.control}
                      name={`bankAccounts.${index}.description`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Account Description</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g., General Fund"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`bankAccounts.${index}.bankName`}
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
                      name={`bankAccounts.${index}.iban`}
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
                      name={`bankAccounts.${index}.accountHolder`}
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
                ))}
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
