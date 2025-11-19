import DaysAgo from "../../shared/components/ui/DaysAgo";
import { Activity, ActivityType } from "../../types";

type RecentActivitiesProps = {
  logs?: Activity[];
  logsIsloding: boolean;
};
function RecentActivities({ logs, logsIsloding }: RecentActivitiesProps) {
  // TODO: handle erros
  if (logsIsloding) return <div>Loading...</div>;
  return (
    <div className="bg-background-surface border border-border rounded-lg p-6">
      <h2 className="text-text-primary mb-4">Recent Activity</h2>
      <div className="space-y-3">
        {logs?.map((activity) => (
          <div
            key={activity.id}
            className="flex items-start gap-3 pb-3 last:pb-0 border-b border-border-light last:border-0"
          >
            <div
              className={`h-2 w-2 rounded-full ${
                activity.type === ActivityType.ITEM_DELETED ||
                activity.type === ActivityType.CONTAINER_DELETED
                  ? "bg-destructive"
                  : "bg-primary"
              } mt-2 shrink-0`}
            />
            <div className="flex-1 min-w-0">
              <p
                className={
                  activity.type === ActivityType.ITEM_DELETED ||
                  activity.type === ActivityType.CONTAINER_DELETED
                    ? "text-destructive/90"
                    : "text-text-primary"
                }
              >
                {activity.message}
              </p>
            </div>
            <p className="text-text-secondary whitespace-nowrap hidden sm:block">
              <DaysAgo date={activity.createdAt} />
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentActivities;
