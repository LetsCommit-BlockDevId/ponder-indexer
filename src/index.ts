import {ponder} from "ponder:registry";
import {
    attendSessionEvent,
    createEvent as eventTable,
    createSession,
    enrollEvent,
    eventTag,
    organizerClaimHistory,
    organizerClaimUnattendedHistory
} from "../ponder.schema";


ponder.on("LetsCommit:CreateEvent", ({event, context}) => {

    // Insert Event Context
    context.db
        .insert(eventTable)
        .values({
            id: event.args.eventId,
            priceAmount: event.args.priceAmount,
            commitmentAmount: event.args.commitmentAmount,
            totalSession: event.args.totalSession,
            maxParticipant: event.args.maxParticipant,
            startSaleDate: event.args.startSaleDate,
            endSaleDate: event.args.endSaleDate,
            organizer: event.args.organizer,
        })
        .onConflictDoNothing();
});

ponder.on("LetsCommit:CreateEventMetadata", ({event, context}) => {

    // Insert Event Metadata
    context.db
        .update(eventTable, {id: event.args.eventId})
        .set({
            title: event.args.title,
            description: event.args.description,
            location: event.args.location,
            imageUri: event.args.imageUri,
        })

    // Insert Event Tags
    event.args.tag
        .filter((tag) => tag !== '')
        .forEach((tag, index) => {
            context.db
                .insert(eventTag)
                .values({
                    id: event.args.eventId,
                    index,
                    tagName: tag,
                })
                .onConflictDoNothing()
        })

});

ponder.on("LetsCommit:CreateSession", ({event, context}) => {

    // Insert Session Created w/ Event
    context.db
        .insert(createSession)
        .values({
            id: event.args.eventId,
            session: event.args.session,
            title: event.args.title,
            startSessionTime: event.args.startSessionTime,
            endSessionTime: event.args.endSessionTime,
            // attendToken: '0x0'
        })
        .onConflictDoNothing();

});

ponder.on("LetsCommit:GenerateSessionToken", ({event, context}) => {

    // Insert Session Token Generated
    context.db
        .update(createSession, {id: event.args.eventId, session: event.args.session})
        .set({attendToken: event.args.token})

});


ponder.on("LetsCommit:EnrollEvent", ({event, context}) => {

    // Insert Participant when enrolling an Event
    context.db
        .insert(enrollEvent)
        .values({
            id: event.args.eventId,
            participant: event.args.participant,
            debitAmount: event.args.debitAmount,
        })
        .onConflictDoNothing();

});

// Insert Participant when attending an Event
ponder.on("LetsCommit:AttendEventSession", ({event, context}) => {

    context.db
        .insert(attendSessionEvent)
        .values({
            id: event.args.eventId,
            session: event.args.session,
            participant: event.args.participant,
            attendToken: event.args.attendToken,
        })
        .onConflictDoNothing();

});

ponder.on("LetsCommit:OrganizerFirstClaim", ({event, context}) => {

    context.db
        .insert(organizerClaimHistory)
        .values({
            id: event.args.eventId,
            condition: 'F',
            organizer: event.args.organizer,
            claimAmount: event.args.claimAmount
        })
        .onConflictDoNothing();

});

ponder.on("LetsCommit:OrganizerLastClaim", ({event, context}) => {

    context.db
        .insert(organizerClaimHistory)
        .values({
            id: event.args.eventId,
            condition: 'L',
            organizer: event.args.organizer,
            claimAmount: event.args.claimAmount
        })
        .onConflictDoNothing();

});

ponder.on("LetsCommit:OrganizerClaimUnattended", ({event, context}) => {

    context.db
        .insert(organizerClaimUnattendedHistory)
        .values({
            id: event.args.eventId,
            session: event.args.session,
            unattendedPerson: event.args.unattendedPerson,
            organizer: event.args.organizer,
            claimAmount: event.args.claimAmount,
        })
        .onConflictDoNothing();

});