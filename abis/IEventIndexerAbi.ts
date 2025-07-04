export const IEventIndexerAbi = [{
    "type": "event",
    "name": "AttendEventSession",
    "inputs": [{"name": "eventId", "type": "uint256", "indexed": true, "internalType": "uint256"}, {
        "name": "session",
        "type": "uint8",
        "indexed": true,
        "internalType": "uint8"
    }, {"name": "participant", "type": "address", "indexed": true, "internalType": "address"}, {
        "name": "attendToken",
        "type": "bytes",
        "indexed": false,
        "internalType": "bytes"
    }],
    "anonymous": false
}, {
    "type": "event",
    "name": "CreateEvent",
    "inputs": [{"name": "eventId", "type": "uint256", "indexed": true, "internalType": "uint256"}, {
        "name": "organizer",
        "type": "address",
        "indexed": true,
        "internalType": "address"
    }, {
        "name": "priceAmount",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
    }, {
        "name": "commitmentAmount",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
    }, {"name": "totalSession", "type": "uint8", "indexed": false, "internalType": "uint8"}, {
        "name": "maxParticipant",
        "type": "uint8",
        "indexed": false,
        "internalType": "uint8"
    }, {
        "name": "startSaleDate",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
    }, {"name": "endSaleDate", "type": "uint256", "indexed": false, "internalType": "uint256"}],
    "anonymous": false
}, {
    "type": "event",
    "name": "CreateEventMetadata",
    "inputs": [{"name": "eventId", "type": "uint256", "indexed": true, "internalType": "uint256"}, {
        "name": "title",
        "type": "string",
        "indexed": false,
        "internalType": "string"
    }, {"name": "description", "type": "string", "indexed": false, "internalType": "string"}, {
        "name": "location",
        "type": "string",
        "indexed": false,
        "internalType": "string"
    }, {"name": "imageUri", "type": "string", "indexed": false, "internalType": "string"}, {
        "name": "tag",
        "type": "string[5]",
        "indexed": false,
        "internalType": "string[5]"
    }],
    "anonymous": false
}, {
    "type": "event",
    "name": "CreateSession",
    "inputs": [{"name": "eventId", "type": "uint256", "indexed": true, "internalType": "uint256"}, {
        "name": "session",
        "type": "uint8",
        "indexed": true,
        "internalType": "uint8"
    }, {"name": "title", "type": "string", "indexed": false, "internalType": "string"}, {
        "name": "startSessionTime",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
    }, {"name": "endSessionTime", "type": "uint256", "indexed": false, "internalType": "uint256"}],
    "anonymous": false
}, {
    "type": "event",
    "name": "EnrollEvent",
    "inputs": [{
        "name": "eventId",
        "type": "uint256",
        "indexed": true,
        "internalType": "uint256"
    }, {"name": "participant", "type": "address", "indexed": true, "internalType": "address"}, {
        "name": "debitAmount",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
    }],
    "anonymous": false
}, {
    "type": "event",
    "name": "GenerateSessionToken",
    "inputs": [{"name": "eventId", "type": "uint256", "indexed": true, "internalType": "uint256"}, {
        "name": "session",
        "type": "uint8",
        "indexed": true,
        "internalType": "uint8"
    }, {"name": "token", "type": "string", "indexed": false, "internalType": "string"}],
    "anonymous": false
}, {
    "type": "event",
    "name": "OrganizerClaimUnattended",
    "inputs": [{"name": "eventId", "type": "uint256", "indexed": true, "internalType": "uint256"}, {
        "name": "session",
        "type": "uint8",
        "indexed": true,
        "internalType": "uint8"
    }, {"name": "unattendedPerson", "type": "uint8", "indexed": false, "internalType": "uint8"}, {
        "name": "organizer",
        "type": "address",
        "indexed": false,
        "internalType": "address"
    }, {"name": "claimAmount", "type": "uint256", "indexed": false, "internalType": "uint256"}],
    "anonymous": false
}, {
    "type": "event",
    "name": "OrganizerFirstClaim",
    "inputs": [{"name": "eventId", "type": "uint256", "indexed": true, "internalType": "uint256"}, {
        "name": "organizer",
        "type": "address",
        "indexed": false,
        "internalType": "address"
    }, {"name": "claimAmount", "type": "uint256", "indexed": false, "internalType": "uint256"}],
    "anonymous": false
}, {
    "type": "event",
    "name": "OrganizerLastClaim",
    "inputs": [{"name": "eventId", "type": "uint256", "indexed": true, "internalType": "uint256"}, {
        "name": "organizer",
        "type": "address",
        "indexed": false,
        "internalType": "address"
    }, {"name": "claimAmount", "type": "uint256", "indexed": false, "internalType": "uint256"}],
    "anonymous": false
}, {
    "type": "event",
    "name": "SetSessionCode",
    "inputs": [{"name": "eventId", "type": "uint256", "indexed": true, "internalType": "uint256"}, {
        "name": "session",
        "type": "uint8",
        "indexed": true,
        "internalType": "uint8"
    }, {"name": "organizer", "type": "address", "indexed": false, "internalType": "address"}, {
        "name": "releasedAmount",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
    }],
    "anonymous": false
}] as const;
