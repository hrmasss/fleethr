import { Skeleton } from "@/components/ui/skeleton";

export default function FormSkeleton() {
  return (
    <div className="flex flex-col space-y-2">
      <Skeleton className="h-6 w-[200px]" />
      <Skeleton className="h-4 w-[250px]" />
      <div className="space-y-6 pt-6">
        <div className="space-y-2">
          <Skeleton className="h-4 w-[300px]" />
          <Skeleton className="h-8 w-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-[300px]" />
          <Skeleton className="h-8 w-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-[300px]" />
          <Skeleton className="h-20 w-full" />
        </div>
        <Skeleton className="h-10 w-24" />
      </div>
    </div>
  );
}
