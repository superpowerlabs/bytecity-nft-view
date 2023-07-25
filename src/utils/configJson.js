import Brucelee from "@/assets/images/BC_NFT_Picture_BruceLee_001.png"
// import Neko from "@/assets/images/BC_NFT_Picture_Neko_001.png"
// import Mobland from "@/assets/images/BC_NFT_Picture_Mobland_001.png"
const configJson = {
    Brucelee: {
        name: 'Brucelee',
        value: 'Brucelee',
        image: Brucelee,
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
        }
    }
}

const unityLoadConfig = {
    loaderUrl: "/UntiyBuild/NFTViewer.loader.js",
    dataUrl: "/UntiyBuild/NFTViewer.data.gz",
    frameworkUrl: "/UntiyBuild/NFTViewer.framework.js.gz",
    codeUrl: "/UntiyBuild/NFTViewer.wasm.gz",
    streamingAssetsUrl: "/StreamingAssets",
}

export {
    configJson,
    unityLoadConfig
}