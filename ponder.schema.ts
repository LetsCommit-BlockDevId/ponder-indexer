import {onchainTable, primaryKey} from "ponder";

// ========================= ERC20 =========================

export const account = onchainTable("account", (t) => ({
    id: t.hex().primaryKey(),
    from: t.hex().notNull(),
    to: t.hex().notNull(),
    amount: t.bigint().notNull(),
}));

// ========================= Event =========================

export const createEvent = onchainTable("event", (t) => ({
    id: t.bigint().primaryKey(),
    title: t.varchar(),
    description: t.varchar(),
    location: t.varchar(),
    imageUri: t.varchar(),
    priceAmount: t.bigint().notNull(),
    commitmentAmount: t.bigint().notNull(),
    totalSession: t.int8({mode: "number"}).notNull(),
    maxParticipant: t.int8({mode: "number"}).notNull(), // Session Number
    startSaleDate: t.bigint().notNull(),
    endSaleDate: t.bigint().notNull(),
    organizer: t.hex().notNull(),
}));

export const eventTag = onchainTable("event_tag", (t) => ({
    id: t.bigint(), // Event Id
    index: t.integer(), // Index
    tagName: t.varchar().notNull()
}), (table) => ({ // Constraints & indexes
    eventTagPk: primaryKey({columns: [table.id, table.index]}),
}));

export const enrollEvent = onchainTable("enroll", (t) => ({
    id: t.bigint(), // Event ID
    participant: t.hex().notNull(), // Participant Address
    debitAmount: t.bigint().notNull()
}), (table) => ({ // Constraints & indexes
    enrollPk: primaryKey({columns: [table.id, table.participant]}),
}));

export const createSession = onchainTable("session", (t) => ({
    id: t.bigint(), // Event ID
    session: t.int8({mode: "number"}).notNull(), // Session Number
    title: t.varchar().notNull(),
    startSessionTime: t.bigint().notNull(),
    endSessionTime: t.bigint().notNull(),
    attendToken: t.varchar(),
}), (table) => ({ // Constraints & indexes
    sessionPk: primaryKey({columns: [table.id, table.session]}),
}));

export const attendSessionEvent = onchainTable("attend_event_session", (t) => ({
    id: t.bigint(), // Event ID
    session: t.int8({mode: "number"}).notNull(), // Session Number
    participant: t.hex().notNull(), // Participant Address
    attendToken: t.hex().notNull(), // Token needed for attend
}), (table) => ({ // Constraints & indexes
    attendEventSessionPk: primaryKey({columns: [table.id, table.session, table.participant]}),
}));


export const organizerClaimHistory = onchainTable("organizer_claim_history", (t) => ({
    id: t.bigint(), // Event ID
    condition: t.char({enum: ['F', 'L']}).notNull(),
    organizer: t.hex().notNull(),
    claimAmount: t.bigint().notNull()
}), (table) => ({ // Constraints & indexes
    organizerClaimHistoryPk: primaryKey({columns: [table.id, table.condition]}),
}));


export const organizerClaimUnattendedHistory = onchainTable("organizer_claim_unattended_history", (t) => ({
    id: t.bigint().notNull(), // Event ID
    session: t.int8({mode: "number"}).notNull(), // Session Number
    unattendedPerson: t.int8({mode: "number"}).notNull(),
    organizer: t.hex().notNull(),
    claimAmount: t.bigint().notNull()
}), (table) => ({ // Constraints & indexes
    organizerClaimUnattendedHistoryPk: primaryKey({columns: [table.id, table.session]}),
}));

