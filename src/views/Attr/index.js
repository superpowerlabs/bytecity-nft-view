import React, { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate} from "react-router-dom";
import http from "@/utils/axios";
import { url } from "@/utils/configUri";
import s from "./index.module.less"
import AvatarInfo from "@/components/AvatarInfo";
import NftList from "@/components/NftList";
import { message, Select, Input } from "antd";

const config = {
    Brucelee: {
        name: 'Brucelee',
        value: 'Brucelee',
        chain: {
            Binance: {
                label: 'Binance',
                value: 'Binance',
                tokenID: {
                    min: 100,
                    max: 200
                },
            },
            test: {
                label: 'test',
                value: 'test',
                tokenID: {
                    min: 101,
                    max: 201
                },
            },
        }
    },
    Mobland: {
        name: 'Mobland',
        value: 'Mobland',
        chain: {
            Mobland: {
                label: 'Mobland',
                value: 'Mobland',
                tokenID: {
                    min: 1000,
                    max: 2000
                },
            },
            test1: {
                label: 'test1',
                value: 'test1',
                tokenID: {
                    min: 1001,
                    max: 2001
                },
            },
        }
    },
    Neko: {
        name: 'Neko',
        value: 'Neko',
        chain: {
            Neko: {
                label: 'Neko',
                value: 'Neko',
                tokenID: {
                    min: 10000,
                    max: 20000
                },
            },
            test2: {
                label: 'test2',
                value: 'test2',
                tokenID: {
                    min: 10001,
                    max: 20001
                },
            },
        }
    },
}


async function sleep(millis) {
    return new Promise((resolve) => setTimeout(resolve, millis));
}

const localUserInfo = JSON.parse(localStorage.getItem('userInfo') || '{}')
const Attr = (props) => {
    const navigate = useNavigate();
    const { type, chain, id } = useParams();

    console.log(useParams());

    const [userInfo, setUserInfo] = useState(localUserInfo);
    const [tokenId, setTokenId] = useState(1);
    const [logined, setLogined] = useState(false)
    const [avatarUrl, setAvatarUrl] = useState('');
    const [activeSeries, setActiveSeries] = useState('Brucelee');
    const [chainArr, setChainArr] = useState([]);
    const [selChain, setSelChain] = useState('');
    const [tokenIdArea, setTokenIdArea] = useState({});
    const [showObjData, setShowObjData] = useState({});
    const [showArrData, setShowArrData] = useState([]);
    const [nftListData, setNftListData] = useState([])
    // const [errorTips, setErrorTips] = useState('');
    const dataIsNull = useMemo(() => {
        if (JSON.stringify(showObjData) === '{}' || Object.keys(showObjData)?.length === 0) {
            return true
        }
        return false
    }, [showObjData])

    useEffect(() => {
        if (type && chain && id) {
            getMetaData(type, chain, Number(id))
        }
    }, [type, chain, id])


    const getMetaData = (type, chain, id) => {
        http("post", url.getData, {
            TokenId: id,
            Market: chain,
            Series: type,
        }).then(res => {
            if (res && res?.data && res?.code === 0) {
                const data = { ...res?.data };
                setAvatarUrl(data?.Image)
                const skinData = { ...data?.Skin };
                const attrs = [...skinData?.attrs];
                delete skinData?.attrs;
                delete data?.Skin
                delete data?.Image
                // console.log(skinData);
                // console.log(data);

                setShowObjData({
                    ...data,
                    ...skinData
                })
                setShowArrData([...attrs])


            } else {
                message.error({ content: 'GetData Error!' })
            }
        })
    }

    useEffect(() => {
        const chainObj = { ...config[activeSeries]?.chain };
        let chainarr = [];
        Object.keys(chainObj).forEach(key => {
            chainarr.push(chainObj[key])
        });
        setChainArr([...chainarr]);
        setSelChain(chainarr[0]?.value)
    }, [activeSeries])

    useEffect(() => {
        if (selChain) {
            const tokenArea = { ...config[activeSeries]?.chain[selChain]?.tokenID }
            setTokenIdArea(tokenArea);
            setTokenId(tokenArea?.min)
        }
    }, [selChain,activeSeries])

    useEffect(()=>{
        if(userInfo && JSON.stringify(userInfo) !== '{}'){
            localStorage.setItem('userInfo',JSON.stringify(userInfo));
            setLogined(true);
            getNftListData()
        }
    },[userInfo])

    const getNftListData = (()=>{
        if(userInfo && JSON.stringify(userInfo) !== '{}' && userInfo?.Email){
            http(
                'get',
                'https://api2.byte.city/v1/nft/get-bruce?email=eumenes@superpower.io',
                {}
                ).then(res=>{
                    if(res && res?.success && res?.assets){
                        setNftListData([...res?.assets || []])
                    }
                }).catch(error=>{
                    message.error({content:'getNftList failed'})
                    setNftListData([])
                })
        }
    })

    const handleSeriesChange = (value) => {
        console.log(value);
        if (value !== activeSeries) {
            setActiveSeries(value);
        }
    }

    const handleChainChange = (value) => {
        // console.log(value);
        setSelChain(value)
    }

    const handleTokenIdChange = (e) => {
        const { value: inputValue } = e.target;

        const reg = /^[1-9]\d*$/;
        if (reg.test(inputValue)) {
            setTokenId(inputValue)
        }
    };

    const handleTokenIdBlur = () =>{
        const {max,min} = tokenIdArea;
        setTokenId(Math.min(max,Math.max(min,tokenId)))
    }

    const getLoginUrl = ()=>{
        return new Promise((resolve,reject)=>{
            http('post',url.loginUrl, {
                TokenId: id,
                Market: chain,
                Series: type,
            }).then((res)=>{
                if(res.RetCode === 0){
                    resolve(res)
                }else(
                    reject()
                )
            }).catch(error=>{
                reject(error)
            })
        })
    }

    const checkLogin = async (InitCode)=>{
        let user = null;
        while (!user) {
            await sleep(1000);
            let res = await http("post", url.checkLogin, {
              InitCode
            })
            user = res;
            if (user && user.RetCode === 0 && user.Email) {
                setUserInfo(user)
                break;
            }

        }
    }

    const loginSuperAuth = async() => {
        try {
            const loginUrl = await getLoginUrl();
            const { InitCode, BrowserUrl } = loginUrl;
            window.open(BrowserUrl);
            checkLogin(InitCode)

        } catch (error) {

        }

    }

    const logout = ()=>{
        setLogined(false);
        localStorage.setItem('userInfo',"{}")
    }

    const changeTokenId = (tag) => {
        if (tag === 'minus' && Number(tokenId)) {
            setTokenId(Math.max(tokenIdArea?.min || 1, Number(tokenId - 1)))
        }
        if (tag === 'plus' && Number(tokenId)) {
            setTokenId(Math.min(tokenIdArea?.max || 1, Number(tokenId + 1)))
        }
    }

    const showNewNft = ()=>{
        navigate(`/${activeSeries}/${selChain}/${tokenId}`)
        // getMetaData(activeSeries, selChain, Number(tokenId))
    }

    return (
        <div className={s.main}>
            {/* {type && chain && id ? ( */}
            <div className={s.content}>
                {/* <div className={s.side}>
                    <div className={s.topWrap}>
                        <div className={s.seriesWrap}>
                            <div>Series</div>
                            {
                                Object.keys(config).length && Object.keys(config).map((key) => {
                                    return (
                                        <div onClick={() => { handleSeriesChange(config[key]?.value) }} className={`${s.item} ${key === activeSeries ? s.active : ''}`} key={key}>
                                            {config[key]?.name}
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className={s.chainWrap}>
                            <div>Chain</div>

                            <Select
                                style={{ width: 150 }}
                                options={chainArr}
                                value={selChain}
                                placeholder="select chain"
                                onChange={handleChainChange}

                            />
                        </div>
                        <div className={s.tokenWrap}>
                            <div>Token Id</div>
                            <div className={s.inputWrap}>
                                <div className={`${s.btn} ${s.minus}`} onClick={() => { changeTokenId('minus') }}>-</div>
                                <Input
                                    onChange={handleTokenIdChange}
                                    placeholder="Input a number"
                                    maxLength={16}
                                    value={tokenId}
                                    onBlur={handleTokenIdBlur}
                                />
                                <div className={`${s.btn} ${s.plus}`} onClick={() => { changeTokenId('plus') }}>+</div>
                            </div>

                        </div>
                        <div onClick={showNewNft} className={s.showBtn}>show</div>
                    </div>
                    <div className={s.loginWrap}>
                        {logined ?
                            (
                                <div className={s.loginedWrap}>
                                    <div className={s.email}>{userInfo?.Email || ''}</div>
                                    {nftListData && nftListData.length>0 ? <NftList getMetaData={getMetaData} nftListData={nftListData} />: <div>loading nftlist</div>}
                                    <div className={s.logoutbtn} onClick={logout}>Logout</div>
                                </div>
                            ) :
                            (
                                <div className={s.loginBtn} onClick={loginSuperAuth}>
                                    Login
                                </div>
                            )
                        }
                    </div>
                </div> */}
                <div className={s.right}>

                    <div className={s.avatarWrap}>
                        <AvatarInfo
                            size={200}
                            src={avatarUrl}
                            shape="square"
                            isServer={true}
                        />
                    </div>
                    <div className={s.dataWrap}>
                        {!dataIsNull ?
                            (
                                Object.keys(showObjData).map((key) => {
                                    return (
                                        <div className={s.item} key={key}>
                                            <div className={s.title}>{key}</div>
                                            <div className={s.val}>{showObjData[key] || ''}</div>
                                        </div>
                                    )
                                })
                            )
                            :
                            <div className={s.load}>
                                loading data...
                                {/* {testStr} */}
                            </div>
                        }
                        {showArrData.length ? showArrData.map((item, index) => {
                            return (
                                <div className={s.item} key={index}>
                                    <div className={s.title}>{item?.name}</div>
                                    <div className={s.val}>{item?.type === 1 ? item?.valueStr : item?.value}</div>
                                </div>
                            )
                        }) : null}
                        { }
                    </div>
                </div>
            </div>
            {/* ):
                <div>params error</div>
            } */}

        </div>

    )
}

export default Attr
