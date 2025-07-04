import {createConfig, type DatabaseConfig} from "ponder";
import {IEventIndexerAbi} from "./abis/IEventIndexerAbi";


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
        monadTestnet: {
            id: 10143,
            rpc: process.env.RPC_MONAD_TESTNET,
            pollingInterval: 1_000,
            disableCache: false
        }
    },
    database: postgreDb,
    contracts: {
        LetsCommit: {
            chain: {
                // localhost: {
                //     address: process.env.LETS_COMMIT_ADDRESS_LOCALHOST as `0x${string}`,
                //     startBlock: 0,
                // },
                monadTestnet: {
                    address: process.env.LETS_COMMIT_ADDRESS_MONAD as `0x${string}`,
                    startBlock: 'latest',
                }
            },
            abi: IEventIndexerAbi,
        }
    },
    // blocks: {
    //     WeCanUpdate: {
    //         chain: "localhost",
    //         startBlock: 0,
    //         interval: 1
    //     },
    // }
})