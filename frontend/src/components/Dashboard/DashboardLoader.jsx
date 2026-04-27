import { Skeleton } from "../ui/skeleton";

const DashboardLoader = () => {
  return (
    <div className="[&_[data-slot=skeleton]]:bg-primary/60 mx-10 mt-10 mb-20 flex flex-col space-y-10 md:flex-row md:space-y-0 md:space-x-20 lg:mx-10 ">
      <div className="flex flex-col space-y-3">
        <Skeleton className="h-[30vh] w-98 rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </div>
      <div className="flex flex-col space-y-3">
        <Skeleton className="h-[30vh] w-98 rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </div>
      <div className="flex flex-col space-y-3">
        <Skeleton className="h-[30vh] w-98 rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </div>
    </div>
  );
};

export default DashboardLoader;
