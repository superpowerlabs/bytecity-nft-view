import brucelee from "@/assets/images/BC_NFT_Picture_BruceLee_001.png"
// import Neko from "@/assets/images/BC_NFT_Picture_Neko_001.png"
// import bruceleeimmortal from "@/assets/images/BC_NFT_Picture_Mobland_001.png"
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
    }
	// bruceleeimmortal: {
    //     name: 'bruceleeimmortal',
    //     value: 'bruceleeimmortal',
    //     image: bruceleeimmortal,
    //     chain: {
    //         eth: {
    //             label: 'eth',
    //             value: 'eth',
    //             tokenID: {
    //                 min: 1,
    //                 max: 10000
    //             },
    //         }
    //     }
    // }

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