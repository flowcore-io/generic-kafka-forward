import { type Static, t } from "elysia"

export const SourceEventDto = t.Object({
  aggregator: t.String({ description: "Aggregator name (e.g. 'flow-type.name.0')" }),
  dataCore: t.String({ description: "UUID of the data core" }),
  eventId: t.String({ description: "Time UUID of the event, when it was stored" }),
  eventType: t.String({ description: "Event type (e.g. 'letter-clicked.0')" }),
  metadata: t.Record(t.String(), t.String(), {
    description: "Metadata related to the event (e.g. url, user id, etc.)",
  }),
  payload: t.Any({ description: "Event data" }),
  timeBucket: t.String({ description: "Timebucket of the event, when it was stored" }),
  validTime: t.String({ description: "Event timestamp, when this event is valid" }),
})

export type SourceEvent<T = unknown> = Static<typeof SourceEventDto> & { payload: T }
