import { Badge } from "./ui/badge";
import { FilterType } from "@/lib/data";
import { Button } from "./ui/button";
import { Filter } from "lucide-react";
const StateAndFilter = ({
  filter,
  completedCount,
  activeCount,
  setFilter,
}) => {
  return (
    <div className="flex justify-between">
      <div className="flex gap-3">
        <Badge
          variant="secondary"
          className="bg-white/50 text-accent-foreground border-info/20"
        >
          {activeCount} {FilterType.active}
        </Badge>
        <Badge
          variant="secondary"
          className="bg-white/50 text-success border-success/20"
        >
          {completedCount} {FilterType.completed}
        </Badge>
      </div>
      <div className="flex gap-3">
        {Object.keys(FilterType).map((type) => (
          <Button
            key={type}
            variant={filter === type ? "gradient" : "ghost"}
            size="sm"
            className="capitalize"
            onClick={() => setFilter(type)}
          >
            <Filter /> {FilterType[type]}
          </Button>
        ))}
      </div>
    </div>
  );
};
export default StateAndFilter;
