import { EventContainer, SupportedEvent } from "~/midi/event";

type Grouped<T extends object, F extends keyof T> = Pick<T, F> & {
  count: number;
};

export function groupConsecutive<T extends object, F extends keyof T>(
  objects: T[],
  field: F,
  compareFn: (acc: Grouped<T, F>, current: T) => boolean
): Grouped<T, F>[] {
  let grouped: Grouped<T, F>[] = [];
  const lastGrouped = objects.reduce<Grouped<T, F>>(
    (acc, object, index) => {
      if (compareFn(acc, object) === false) {
        if (index > 0) {
          grouped.push(acc);
        }
        return { [field]: object[field], count: 1 } as Grouped<T, F>;
      } else {
        return { ...acc, count: acc.count + 1 };
      }
    },
    { [field]: undefined, count: 0 } as Grouped<T, F>
  );
  grouped.push(lastGrouped);
  return grouped;
}

export function groupConsecutiveEvents(
  events: SupportedEvent[],
  compareFn: (acc: EventContainer | null, current: SupportedEvent) => boolean
): EventContainer[] {
  let containers: EventContainer[] = [];
  const lastGrouped = events.reduce<EventContainer | null>(
    (acc, object, index) => {
      if (compareFn(acc, object) === false) {
        if (index > 0 && acc !== null) {
          containers.push(acc);
        }
        return { type: object["type"], children: [] } as EventContainer;
      } else {
        return {
          ...acc,
          children: [...acc?.children, object]
        } as EventContainer;
      }
    },
    null
  );
  if (lastGrouped !== null) {
    containers.push(lastGrouped);
  }
  return containers;
}
