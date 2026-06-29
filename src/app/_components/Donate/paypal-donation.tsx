"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Copy, Check, ExternalLink } from "lucide-react";
import { useState } from "react";

export default function PayPalDonation({
  email,
  donationLink
}: {
  email: string;
  donationLink?: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const openPayPal = () => {
    window.open(`https://www.paypal.me/${email}`, "_blank");
  };

  return (
    <div className="space-y-6">
      {/* Direct Donation Link - If available */}
      {donationLink && (
        <Card className="border-green-200 bg-gradient-to-br from-green-50 to-green-100/50 overflow-hidden">
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M20.07 8.478c.32-2.126-.642-2.478-1.92-2.478H6.34c-.486 0-.9.318-1.05.78L3.05 19.45c-.15.46.19.87.66.87h2.72l.68-4.318.02-.138c.15-.46.56-.78 1.05-.78h1.6c3.28 0 5.84-1.33 6.58-5.18.24-1.27.11-2.33-.62-3.08-.07-.08-.16-.15-.25-.22z" />
                </svg>
              </div>
              <div>
                <CardTitle className="text-green-900">Quick Donation</CardTitle>
                <CardDescription>Fastest way to give</CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            <p className="text-sm text-gray-700">
              Click the button below to donate directly through PayPal with just one click.
            </p>

            <Button
              onClick={() => window.open(donationLink, "_blank")}
              className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-2 rounded-lg transition-all"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Donate via PayPal
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Email Payment Method */}
      <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100/50 overflow-hidden">
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
              <svg
                className="w-6 h-6 text-white"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M20.07 8.478c.32-2.126-.642-2.478-1.92-2.478H6.34c-.486 0-.9.318-1.05.78L3.05 19.45c-.15.46.19.87.66.87h2.72l.68-4.318.02-.138c.15-.46.56-.78 1.05-.78h1.6c3.28 0 5.84-1.33 6.58-5.18.24-1.27.11-2.33-.62-3.08-.07-.08-.16-.15-.25-.22z" />
              </svg>
            </div>
            <div>
              <CardTitle className="text-blue-900">PayPal Email</CardTitle>
              <CardDescription>{donationLink ? "Alternative method" : "Send your donation"}</CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <p className="text-sm text-gray-700">
            Send your donation directly to our PayPal account. Every contribution helps us continue our ministry and serve our community.
          </p>

          {/* Email Display Card */}
          <div className="bg-white rounded-lg border border-blue-200 p-4">
            <p className="text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide">PayPal Email</p>
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-blue-600" />
                <span className="font-mono text-sm font-medium text-gray-900 break-all">
                  {email}
                </span>
              </div>
              <Button
                onClick={handleCopy}
                size="sm"
                variant="outline"
                className="flex-shrink-0 border-blue-200 hover:bg-blue-50"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 mr-1 text-green-600" />
                    <span className="text-green-600 text-xs">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-1" />
                    <span className="text-xs">Copy</span>
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-3">
            <h4 className="font-semibold text-sm text-blue-900">How to donate:</h4>
            <ol className="text-sm text-gray-700 space-y-2 list-decimal list-inside">
              <li>Copy the PayPal email address above</li>
              <li>Go to PayPal.com and log into your account</li>
              <li>Select "Send Money" and paste the email</li>
              <li>Enter the amount and complete the transaction</li>
            </ol>
          </div>

          {/* Direct Button */}
          <Button
            onClick={openPayPal}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-2 rounded-lg transition-all"
          >
            <svg
              className="w-4 h-4 mr-2"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M20.07 8.478c.32-2.126-.642-2.478-1.92-2.478H6.34c-.486 0-.9.318-1.05.78L3.05 19.45c-.15.46.19.87.66.87h2.72l.68-4.318.02-.138c.15-.46.56-.78 1.05-.78h1.6c3.28 0 5.84-1.33 6.58-5.18.24-1.27.11-2.33-.62-3.08-.07-.08-.16-.15-.25-.22z" />
            </svg>
            Send via PayPal
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
