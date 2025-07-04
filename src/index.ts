import {ponder} from "ponder:registry";
import {
    attendSessionEvent,
    createEvent,
    createEvent as eventTable,
    createSession,
    enrollEvent,
    eventTag,
    organizerClaimHistory,
    organizerClaimUnattendedHistory
} from "../ponder.schema";

/* =====================================================================
*  Create Event
* =====================================================================
*/
ponder.on("LetsCommit:CreateEvent", async ({event, context}) => {

    // Insert Event Context
    await context.db
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

ponder.on("LetsCommit:CreateEventMetadata", async ({event, context}) => {

    // Insert Event Metadata
    await context.db
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
        .forEach(async (tag, index) => {

            try {
                await context.db
                    .insert(eventTag)
                    .values({
                        id: event.args.eventId,
                        index,
                        tagName: tag,
                    })
                    .onConflictDoNothing();
            } catch (e) {
                console.log(`Error inserting tag ${tag} for event ${event.args.eventId}:`, e);
            }

        })

});

/* =====================================================================
*  Create Session
* =====================================================================
*/
ponder.on("LetsCommit:CreateSession", async ({event, context}) => {

    // Insert Session Created w/ Event
    await context.db
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

/* =====================================================================
*  Participant Enroll Event
* =====================================================================
*/
ponder.on("LetsCommit:EnrollEvent", async ({event, context}) => {

    // Insert Participant when enrolling an Event
    await context.db
        .insert(enrollEvent)
        .values({
            id: event.args.eventId,
            participant: event.args.participant,
            debitAmount: event.args.debitAmount,
        })
        .onConflictDoNothing();

});

/* =====================================================================
*  Participant Attend Session Event
* =====================================================================
*/
ponder.on("LetsCommit:AttendEventSession", async ({event, context}) => {

    await context.db
        .insert(attendSessionEvent)
        .values({
            id: event.args.eventId,
            session: event.args.session,
            participant: event.args.participant,
            attendToken: event.args.attendToken,
        })
        .onConflictDoNothing();

});

/* =====================================================================
*  Organizer First Claim
* =====================================================================
*/
ponder.on("LetsCommit:OrganizerFirstClaim", async ({event, context}) => {

    await context.db
        .insert(organizerClaimHistory)
        .values({
            id: event.args.eventId,
            session: -1, // After sell and Before any session
            condition: 'F',
            organizer: event.args.organizer,
            claimAmount: event.args.claimAmount
        })
        .onConflictDoNothing();

});

/* =====================================================================
*  Generate Session Token And Release
* =====================================================================
*/
ponder.on("LetsCommit:SetSessionCode", async ({event, context}) => {

    // Insert Session Token Generated
    await context.db
        .insert(organizerClaimHistory)
        .values({
            id: event.args.eventId,
            session: event.args.session,
            condition: 'P',
            organizer: event.args.organizer,
            claimAmount: event.args.releasedAmount
        })
        .onConflictDoNothing();

});

ponder.on("LetsCommit:GenerateSessionToken", async ({event, context}) => {

    // Insert Session Token Generated
    await context.db
        .update(createSession, {id: event.args.eventId, session: event.args.session})
        .set({attendToken: event.args.token})

});

/* =====================================================================
*  Organizer Last Claim
* =====================================================================
*/
ponder.on("LetsCommit:OrganizerLastClaim", async ({event, context}) => {

    const eventEntity = await context.db
        .find(createEvent, {id: event.args.eventId});

    await context.db
        .insert(organizerClaimHistory)
        .values({
            id: event.args.eventId,
            session: eventEntity!.totalSession - 1, // Last Session
            condition: 'L',
            organizer: event.args.organizer,
            claimAmount: event.args.claimAmount
        })
        .onConflictDoNothing();

});

/* =====================================================================
*  Organizer Last Claim Unattended
* =====================================================================
*/
ponder.on("LetsCommit:OrganizerClaimUnattended", async ({event, context}) => {

    await context.db
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