"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function Organization() {
  return (
    <>
      <h3 className="text-xl font-bold">Organization details</h3>
      <form className="space-y-4 py-4">
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="name">Name</Label>
          <Input id="name" placeholder="Organization Name" />
        </div>

        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="size">Size</Label>
          <Input
            type="number"
            min="20"
            max="1000"
            id="size"
            placeholder="20-1000"
          />
        </div>

        <div className="grid w-full gap-1.5">
          <Label htmlFor="description">Description</Label>
          <Textarea
            placeholder="Type your organization description here."
            id="description"
          />
        </div>

        <Button type="submit" size="lg">Submit</Button>
      </form>
    </>
  );
}
