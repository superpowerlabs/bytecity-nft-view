import React, { useEffect, useState, memo, useCallback, useRef, useMemo } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import { connect } from "react-redux";
import { unityLoadConfig } from "@/utils/configJson";
import s from "./index.module.less";
import { url } from "@/utils/configUri";
const LoadWebGL = ({
  setUnitySendMessage,
  setLoadingProgression,
  setIsUnityLoaded,
  setFullyLoaded
}) => {

  const unityRef = useRef();

  const {
    unityProvider,
    isLoaded,
    loadingProgression,
    sendMessage,
    addEventListener, 
    removeEventListener
  } = useUnityContext(unityLoadConfig);

  useEffect(() => {
    // console.log(loadingProgression);
    setLoadingProgression(loadingProgression);
  }, [loadingProgression])

  const handleShowUnity = useCallback(() => {
    console.log(`Call NftViewUnityInit`);
    setFullyLoaded(true);
    // sendMessage('Loader', 'ShowUnityPanel');
  }, [sendMessage]);
  
  const handelSuperPowerAuthLogin = ()=>{
    console.log(`object`);
  }

  useEffect(() => {  
    addEventListener('SuperPowerAuthLogin', handelSuperPowerAuthLogin);
    addEventListener('NftViewUnityInit', handleShowUnity);
    
    return () => {
      removeEventListener('SuperPowerAuthLogin', handelSuperPowerAuthLogin);
      removeEventListener('NftViewUnityInit', handleShowUnity);
    };

  }, [addEventListener, removeEventListener, handleShowUnity])


  useEffect(() => {
    if(!isLoaded || !sendMessage) return;
    setIsUnityLoaded(true);
    setUnitySendMessage(sendMessage);
    sendMessage("Loader", "SetNFTDataUrl", url?.unitySetNFTDataUrl);

  }, [isLoaded,sendMessage])

  const getFocus =  () => {
    // sendMessage("CharCustomizeManager", "BackKeyBoard");
    // sendMessage("Loader", "DisableEventSystem", 'false');
  }


  return (
    <div className={s.content}  onClick={getFocus}>
      <Unity
        ref={unityRef}
        unityProvider={unityProvider}
        className={s.unityCanvas}
        // style={{display:isLoaded?'':'none'}}
      />
    </div>
  );
};
const mapStateToProps = ({app}) => {
  return {
    // isMiniMode:app.isMiniMode,
    
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    
    setUnitySendMessage: (params) => {
      return dispatch({
        type: "app/setUnitySendMessage",
        payload: params
      });
    },
    setIsUnityLoaded: (params) => {
      return dispatch({
        type: "app/setIsUnityLoaded",
        payload: params
      });
    },
    setLoadingProgression: (params) => {
      return dispatch({
        type: "app/setLoadingProgression",
        payload: params
      });
    },
    setFullyLoaded: (params) => {
      return dispatch({
        type: "app/setFullyLoaded",
        payload: params
      });
    },
  }
}

export default memo(connect(mapStateToProps, mapDispatchToProps)(LoadWebGL));