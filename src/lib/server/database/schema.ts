import { boolean, index, integer, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const postTable = pgTable(
  "posts",
  {
    id: varchar("id", { length: 10 }).primaryKey(),
    to: varchar("to", { length: 50 }).notNull(),
    toDisplay: varchar("to_display", { length: 50 }).notNull(),
    text: varchar("text", { length: 100 }).notNull(),
    colour: varchar("colour", { length: 6 }).notNull().default("fff740"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    views: integer("views").notNull().default(0),
    createdByUserId: varchar("created_by_id", { length: 32 }).references(() => userTable.id, {
      onDelete: "set null",
    }),
    createdByIp: text("created_by_ip").notNull(),
  },
  (table) => ({
    toIndex: index("to_index").on(table.to),
  }),
);

export const userTable = pgTable("users", {
  id: varchar("id", { length: 10 }).primaryKey(),
  username: varchar("username", { length: 16 }).unique().notNull(),
  githubId: integer("github_id").unique().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  admin: boolean("admin").default(false).notNull(),
});

export const sessionTable = pgTable("sessions", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id, { onDelete: "cascade" }),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});
