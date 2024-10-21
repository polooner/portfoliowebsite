"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Check,
  ChevronLeftIcon,
  ChevronRightIcon,
  Copy,
  RotateCcw,
} from "lucide-react";
import { useState } from "react";
import { highlight } from "sugar-high";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export const ToggleableComponentCard = ({
  title,
  contentClassName,
  components,
  ...props
}: {
  title: string;
  contentClassName?: string;
  components: {
    component: React.ComponentType<any>;
    componentProps?: Record<string, any>;
    animateAble?: boolean;
    variant?: string;
    code: string;
  }[];
} & React.HTMLAttributes<HTMLDivElement>) => {
  const [showCode, setShowCode] = useState(false);
  const [copied, setCopied] = useState(false);
  const [key, setKey] = useState(0);
  const [currentComponentIndex, setCurrentComponentIndex] = useState(0);

  const currentComponent = components[currentComponentIndex];
  const codeHtml = highlight(currentComponent.code);

  console.log(currentComponent);

  const handleCopy = () => {
    navigator.clipboard.writeText(currentComponent.code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 5000);
      toast.success("Code copied to clipboard!");
    });
  };

  return (
    <Card
      className="w-full relative p-4 mb-4 max-w-full space-y-4 flex flex-col"
      {...props}
    >
      <div className="flex flex-col w-full">
        <div className="flex items-center space-x-2 flex-row w-full justify-between z-50">
          <h2 className="text-lg font-semibold truncate">
            {title}{" "}
            <span className="text-sm text-stone-600">
              {currentComponent.variant}
            </span>
          </h2>

          <div className="flex items-center space-x-2 flex-row self-start">
            {currentComponent.animateAble && (
              <RotateCcw
                className="text-black rounded-md px-2 flex items-center size-8"
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
        </div>
        <div className="flex items-center justify-center w-fit">
          {components.length > 1 ? (
            <div className="flex items-center justify-between w-fit space-x-1 text-center">
              <Button
                variant="ghost"
                size="icon"
                onClick={() =>
                  setCurrentComponentIndex(
                    (prevIndex) =>
                      (prevIndex - 1 + components.length) % components.length
                  )
                }
                disabled={currentComponentIndex === 0}
              >
                <ChevronLeftIcon className="size-4" />
              </Button>
              <span className="text-sm pointer-events-none w-5 self-center mx-auto items-center">
                {currentComponentIndex + 1}/{components.length}
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() =>
                  setCurrentComponentIndex(
                    (prevIndex) => (prevIndex + 1) % components.length
                  )
                }
                disabled={currentComponentIndex === components.length - 1}
              >
                <ChevronRightIcon className="size-4" />
              </Button>
            </div>
          ) : null}
        </div>
      </div>
      <div>
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
          <div
            className={cn(
              contentClassName ? contentClassName : "max-h-[75dvh] w-full"
            )}
          >
            <currentComponent.component
              key={key}
              {...currentComponent.componentProps}
            />
          </div>
        )}
      </div>
    </Card>
  );
};
