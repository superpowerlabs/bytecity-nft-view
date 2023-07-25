import React, { useEffect, useMemo, useState, memo } from "react";
import { connect } from "react-redux";
import { useParams ,useNavigate} from "react-router-dom";
import http from "@/utils/axios";
import { url } from "@/utils/configUri";
import s from "./index.module.less"
import AvatarInfo from "@/components/AvatarInfo";
import NftList from "@/components/NftList";
import { message, Select, Input } from "antd";
import CustomIcon from "@/components/CustomIcon";
import { configJson } from "@/utils/configJson";
import LoadWebGL from "@/components/LoadWebGL"
function copyFn(text) {
    let copyInput = document.createElement("input");
    document.body.appendChild(copyInput);
    copyInput.setAttribute("value", text);
    copyInput.select();
    document.execCommand("Copy");
    copyInput.remove();
}



async function sleep(millis) {
    return new Promise((resolve) => setTimeout(resolve, millis));
}

const localUserInfo = JSON.parse(localStorage.getItem('userInfo') || '{}')
const Attr = ({
    unitySendMessage,
    isUnityLoaded,
    loadingProgression,
    fullyLoaded
}) => {
    console.log(loadingProgression);
    const navigate = useNavigate();
    const { type, chain, id } = useParams();
    const [userInfo, setUserInfo] = useState(localUserInfo);
    const [nftLoading, setNftLoading] = useState(false);
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
        if (type && chain && id && unitySendMessage) {
            getMetaData(type, chain, Number(id));
            unitySendMessage('Loader','UpdateNFTData',JSON.stringify({
                type, 
                chain,
                id:Number(id)
            }))    
        }
    }, [type, chain, id, unitySendMessage])


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
                delete skinData.parts;
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
        const chainObj = { ...configJson[activeSeries]?.chain };
        let chainarr = [];
        Object.keys(chainObj).forEach(key => {
            chainarr.push(chainObj[key])
        });
        setChainArr([...chainarr]);
        setSelChain(chainarr[0]?.value)
    }, [activeSeries])

    useEffect(() => {
        if (selChain) {
            const tokenArea = { ...configJson[activeSeries]?.chain[selChain]?.tokenID }
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
            setNftLoading(true);
            http(
                'get',
                'https://api2.byte.city/v1/nft/get-bruce?email='+userInfo?.Email,
                {}
                ).then(res=>{
                    if(res && res?.success && res?.assets){
                        setNftListData([...res?.assets || []]) 
                        setNftLoading(false);
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
        console.log(inputValue);
        const reg = /[0-9]\d*$/;
        if (reg.test(inputValue)) {
            setTokenId(parseInt(inputValue))
        }
        if(inputValue.length === 0){
            setTokenId('')
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
        if (tag === 'minus') {
            setTokenId(Math.max(tokenIdArea?.min || 0, Number(tokenId - 1)))
        }
        if (tag === 'plus') {
            setTokenId(Math.min(tokenIdArea?.max || 0, Number(tokenId + 1)))
        }
    }

    const showNewNft = ()=>{
        navigate(`/${activeSeries}/${selChain}/${tokenId}`)
        // getMetaData(activeSeries, selChain, Number(tokenId))
    }

    return (
        <div className={s.main}>
            {!isUnityLoaded && 
                <div className={s.loadWrap}>
                    <div className={s.progress}>LOADING: {parseInt((loadingProgression || 0) * 100)}%</div>
                </div>
            }
            <div className={`${s.content} ${isUnityLoaded ? s.show : ''}`}>
                <div className={s.side}>
                    <div className={s.topWrap}>
                        <div className={s.seriesWrap}>
                            <div className={s.label}>SERIES</div>
                            {
                                Object.keys(configJson).length && Object.keys(configJson).map((key) => {
                                    const {value,name,image} = configJson[key];
                                    return (
                                        <img src={image} onClick={() => { handleSeriesChange(value) }} className={`${s.item} ${key === activeSeries ? s.active : ''}`} key={key} />
                                    )
                                })
                            }
                        </div>
                        <div className={s.chainWrap}>
                            <div className={s.label}>CHAIN</div>
                        
                            <Select
                                style={{ width: 180 }}
                                options={chainArr}
                                value={selChain}
                                placeholder="select chain"
                                onChange={handleChainChange}
                                className="chainSel"
                                
                            />
                        </div>
                        <div className={s.tokenWrap}>
                            <div className={s.label}>TOKEN ID</div>
                            <div className={s.inputWrap}>
                                <div className={`${s.btn}`} onClick={() => { changeTokenId('minus') }}>
                                    <CustomIcon 
                                        name={'BC_NFT_Button_Left'} 
                                        isHaveHover={true} 
                                        imgName={'BC_NFT_Button_Left'} 
                                        width={26} 
                                        height={26} 
                                        />
                                </div>
                                <Input
                                    onChange={handleTokenIdChange}
                                    placeholder="Input a number"
                                    maxLength={16}
                                    value={tokenId}
                                    onBlur={handleTokenIdBlur}
                                    className={s.tokenIdInput}
                                />
                                <div className={`${s.btn}`} onClick={() => { changeTokenId('plus') }}>
                                    <CustomIcon 
                                        name={'BC_NFT_Button_003_Right'} 
                                        isHaveHover={true} 
                                        imgName={'BC_NFT_Button_003_Right'} 
                                        width={26} 
                                        height={26} 
                                        />
                                </div>
                            </div>

                        </div>
                        <div onClick={showNewNft} className={s.showBtn}>SHOW</div>
                    </div>
                    <div className={s.loginWrap}>
                        {logined ?
                            (
                                <div className={s.loginedWrap}>
                                    <div className={s.email}>
                                        <div className={s.text}>{userInfo?.Email || ''}</div> 
                                        <div className={s.icon}>
                                            <CustomIcon 
                                                onClick={(e)=>{e.stopPropagation();copyFn(userInfo?.Email || '')}} 
                                                name={'BC_NFT_Button_004'} 
                                                isHaveHover={true} 
                                                imgName={'BC_NFT_Button_004'} 
                                                width={20} 
                                                height={20} 
                                                />
                                        </div>
                                    </div>
                                    <div className={s.nftListWrap}>
                                    {
                                        
                                        nftLoading ? <div>loading nftlist</div> :
                                        nftListData && nftListData.length>0 ? <NftList getMetaData={getMetaData} nftListData={nftListData} />: <div>NO NFT ASSETS</div>
                                    
                                    }
                                    </div>
                                    <div className={s.logoutbtn} onClick={logout}>
                                        <div className={s.icon}>
                                            
                                        </div>
                                        LOGOUT
                                    </div>
                                </div>
                            ) :
                            (
                                <div className={s.loginBtn} onClick={loginSuperAuth}>
                                    <div className={s.title}>LOGIN</div>
                                    <div>SuperAuth Account</div>
                                </div>
                            )
                        }
                    </div>
                </div>
                <div className={s.right}>
                    <LoadWebGL />
                    {/* <div className={s.avatarWrap}>
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
                    </div> */}

                </div>
            </div>
                

        </div>

    ) 
}
const mapStateToProps = ({app}) => {
    return {
        unitySendMessage:app.unitySendMessage,
        isUnityLoaded:app.isUnityLoaded,
        loadingProgression:app.loadingProgression,
        fullyLoaded: app.fullyLoaded,
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
      
    }
  }
  export default memo(connect(mapStateToProps, mapDispatchToProps)(Attr));