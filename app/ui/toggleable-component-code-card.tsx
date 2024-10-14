"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Check, Copy, RotateCcw } from "lucide-react";
import { useState } from "react";
import { highlight } from "sugar-high";
import { toast } from "sonner";

export const ToggleableComponentCard = ({
  component: Component,
  code,
  title,
  animateAble = false,
}) => {
  const [showCode, setShowCode] = useState(false);
  const [copied, setCopied] = useState(false);
  const [key, setKey] = useState(0);
  const codeHtml = highlight(code);

  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 5000);
      toast.success("Code copied to clipboard!");
    });
  };

  return (
    <Card className="w-full relative p-4 mb-4 max-w-full">
      <h2 className="text-lg font-semibold mb-2">{title}</h2>

      <div className="absolute top-4 right-4 flex items-center space-x-2 flex-row">
        {animateAble && (
          <RotateCcw
            className=" text-black rounded-md px-2 flex items-center size-8"
            onClick={() => setKey(key + 1)}
          />
        )}
        <Label htmlFor={`code-view-toggle-${title}`}>View</Label>

        <Switch
          id={`code-view-toggle-${title}`}
          checked={showCode}
          onCheckedChange={setShowCode}
        />
        <Label htmlFor={`code-view-toggle-${title}`}>Code</Label>
      </div>
      {showCode ? (
        <div className="relative">
          <Button
            className="absolute top-4 right-4 text-white rounded-md px-2"
            onClick={handleCopy}
          >
            {copied ? (
              <Check className="size-4" />
            ) : (
              <Copy className="size-4" />
            )}
          </Button>

          <pre className="p-4 bg-stone-200 rounded-md overflow-x-auto whitespace-pre-wrap max-h-[75dvh] min-h-[75dvh]">
            <code dangerouslySetInnerHTML={{ __html: codeHtml }} />
          </pre>
        </div>
      ) : (
        <div className="max-h-[75dvh] ">
          <Component key={key} />
        </div>
      )}
    </Card>
  );
};
