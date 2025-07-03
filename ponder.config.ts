import {createConfig, type DatabaseConfig} from "ponder";
import {IEventIndexerAbi, IEventIndexerAddress} from "./abis/IEventIndexerAbi";


const postgreDb = {
    kind: "postgres",
    connectionString: process.env.DATABASE_URL,
    poolConfig: {
        max: 10,
        ssl: false,
    },
} as const satisfies DatabaseConfig;

const pgDb = {
    kind: "pglite",
} as const satisfies DatabaseConfig;

export default createConfig({
    chains: {
        localhost: {
            id: 31337,
            rpc: process.env.RPC_LOCALHOST,
            pollingInterval: 1_000,
            disableCache: true
        },
    },
    database: postgreDb,
    contracts: {
        // WeCan: {
        //     chain: "localhost",
        //     abi: WeCanAbi,
        //     address: WeCanAddress,
        //     startBlock: undefined,
        // },
        LetsCommit: {
            chain: "localhost",
            abi: IEventIndexerAbi,
            address: IEventIndexerAddress,
            startBlock: 0,
        }
    },
    // blocks: {
    //     WeCanUpdate: {
    //         chain: "localhost",
    //         startBlock: 0,
    //         interval: 1
    //     },
    // }
});

