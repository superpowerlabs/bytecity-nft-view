import brucelee from "@/assets/images/BC_NFT_Picture_BruceLee_001.png"
import genesis from "@/assets/images/UI-BC_Picture_NFT_Genesis.png"
import oracle from "@/assets/images/UI-BC_Picture_NFT_Oracle.png"
import zeta from "@/assets/images/UI-BC_Picture_NFT_ZetaNite.png"
const configJson = {
    brucelee: {
        name: 'brucelee',
        value: 'brucelee',
        image: brucelee,
        chain: {
            sui: {
                label: 'sui',
                value: 'sui',
                tokenID: {
                    min: 0,
                    max: 9999
                },
            },
            bnbchain: {
                label: 'bnbchain',
                value: 'bnbchain',
                tokenID: {
                    min: 0,
                    max: 9999
                },
            },
            cardano: {
                label: 'cardano',
                value: 'cardano',
                tokenID: {
                    min: 0,
                    max: 9999
                },
            },
            eth: {
                label: 'eth',
                value: 'eth',
                tokenID: {
                    min: 0,
                    max: 9999
                },
            },
            polygon: {
                label: 'polygon',
                value: 'polygon',
                tokenID: {
                    min: 0,
                    max: 9999
                },
            },
            solana: {
                label: 'solana',
                value: 'solana',
                tokenID: {
                    min: 0,
                    max: 9999
                },
            },
            zksync: {
                label: 'zksync',
                value: 'zksync',
                tokenID: {
                    min: 0,
                    max: 9999
                },
            },
            oneplanet: {
                label: 'oneplanet',
                value: 'oneplanet',
                tokenID: {
                    min: 0,
                    max: 999
                },
            },
        }
    },

    zeta: {
        name: 'zeta',
        value: 'zeta',
        image: zeta,
        chain: {
            zetachain: {
                label: 'zetachain',
                value: 'zetachain',
                tokenID: {
                    min: 0,
                    max: 99999
                },
            },
        }
    },

    genesis: {
        name: 'genesis',
        value: 'genesis',
        image: genesis,
        chain: {
            eth: {
                label: 'eth',
                value: 'eth',
                tokenID: {
                    min: 1,
                    max: 2400
                },
            },
        }
    },
    oracle: {
        name: 'oracle',
        value: 'oracle',
        image: oracle,
        chain: {
            eth: {
                label: 'eth',
                value: 'eth',
                tokenID: {
                    min: 1,
                    max: 600
                },
            },
        }
    },
}

const unityLoadConfig = {
    loaderUrl: "/UnityBuild/NFTViewer.loader.js",
    dataUrl: "/UnityBuild/NFTViewer.data.gz",
    frameworkUrl: "/UnityBuild/NFTViewer.framework.js.gz",
    codeUrl: "/UnityBuild/NFTViewer.wasm.gz",
    streamingAssetsUrl: "/StreamingAssets",
}

export {
    configJson,
    unityLoadConfig
}