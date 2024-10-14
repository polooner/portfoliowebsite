"use client";

import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";

export const ToggleableComponentCard = ({
  component: Component,
  code,
  title,
}) => {
  const [showCode, setShowCode] = useState(false);

  return (
    <Card className="w-full relative p-4 mb-4">
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      <div className="absolute top-4 right-4 flex items-center space-x-2">
        <Label htmlFor={`code-view-toggle-${title}`}>View</Label>
        <Switch
          id={`code-view-toggle-${title}`}
          checked={showCode}
          onCheckedChange={setShowCode}
        />
        <Label htmlFor={`code-view-toggle-${title}`}>Code</Label>
      </div>
      {showCode ? (
        <pre className="p-4 bg-gray-100 rounded-md overflow-x-auto">
          <code>{code}</code>
        </pre>
      ) : (
        <Component />
      )}
    </Card>
  );
};
