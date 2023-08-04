import React, { memo } from "react";
import s from "./index.module.less";

const LoadPage = ({loadingProgression}) => {

  return (
    <div className={s.loadWrap}>
      <div className={s.bottom}>
        <div className={s.top}>
          <div className={s.logo}></div>
          <div className={s.desWrap}>
            <div className={`${s.tipIcon} ${s.dot} ${s.dotLeft}`}></div>
            <div className={`${s.tipIcon} ${s.border}`}></div>
            <div className={`${s.tipIcon} ${s.dot} ${s.dotRight}`}></div>
            <div className={s.testBg}>BYTE CITY IS A REVOLUTIONARY SOCIAL ENTERTAINMENT PLATFORM FOCUSING ON DIGITAL COLLECTIBLES, IMMERSIVE GAMING, AND SOCIAL EXPERIENCES.</div>
          </div>
        </div>
        <div className={s.progressWrap}>
          <div className={s.leftTip}></div>
          <div className={s.rightTip}></div>
          <div className={s.progressConten}>
            <div style={{width:`${parseInt((loadingProgression || 0) * 100)}%`}} className={s.scorllPercent}></div>
          </div>
          
          <div className={s.progress}>
            <div>LOADING...</div>
            <div className={s.text}>{parseInt((loadingProgression || 0) * 100)}%</div>
          </div>
        </div>  
      </div>
    </div>
  )
}
export default memo(LoadPage);
