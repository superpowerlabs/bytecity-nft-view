import React, { memo ,useState} from "react";
import { useMemo } from "react";
import s from "./index.module.less";
const imgbaseUrl = '/img/';
// const aa = './img/ama/'
// const ImgDom = () => {
//     return (
//         <img src={imgbaseUrl111} alt="avatar" />
//     )
//   }
const Index = (props) => {
  const {
    iconClass = "",
    name,
    width,
    height,
    style = {},
    imgName = '',
    color = "",
    isHaveHover = false,
    onClick = () => { }
  } = props;
  const [hover, setHover] = useState(false);
  const toggleHover = ()=>{ 
    setHover(!hover)
  }
  const imgSrc = useMemo(()=>{
    if(hover){
      return {
        backgroundImage:`url('${imgbaseUrl}${imgName}_hover.png')`
      } 
      
    }else{
      return {
        backgroundImage:`url('${imgbaseUrl}${imgName}.png')`
      } 
      // return `${imgbaseUrl}${imgName}.png`
    }
  },[hover,imgName]);
  
  return (
    <span className={`${s["icon-wrapper"]} anticon`} onClick={onClick} style={{width: width,height: height}}>
      <span
        className={`${s.customIcon} icon-${name} ${iconClass}`}
        onMouseEnter={isHaveHover?toggleHover:null} 
        onMouseLeave={isHaveHover?toggleHover:null}
        style={{ color: color || "none", width: width,height: height, ...style, ...imgSrc}}
      >
       
      </span>
    </span>
  )
}
export default memo(Index);
