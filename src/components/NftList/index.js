import {Navigation, Pagination, Grid} from "swiper/modules"
import {Swiper,SwiperSlide} from "swiper/react";
import { useNavigate } from "react-router-dom";
import AvatarInfo from "../AvatarInfo";
import "swiper/css/bundle";
// import "swiper/css"
import s from './index.module.less';

import { memo } from 'react'
const NftList = ({nftListData,getMetaData})=>{
    const navigate = useNavigate()
    const handleClick = ({chain,tokenId})=>{
        navigate(`/Brucelee/${chain}/${tokenId}`)
        // getMetaData('Brucelee',chain,Number(tokenId))
    }
    return (
        <Swiper 
            modules={[Navigation,Grid,Pagination]}
            className={`${s.wrap} nftList`}
            slidesPerView={3}
            navigation
            pagination={{
                type: "fraction",
            }}
            grid={{rows:2,fill:"row"}}
            slidesPerGroup= {3}
            
            >
                {
                    nftListData && nftListData.length && nftListData.map((item,i)=>{
                        const {chain,tokenId,image} = item;
                        return(
                            <SwiperSlide key={i} onClick={()=>{handleClick({chain,tokenId})}} className={s.slide} >
                                <AvatarInfo 
                                    size={50}
                                    src={image}
                                />
                            </SwiperSlide>
                        )
                    })
                }
            {/* 
            <SwiperSlide className={s.slide}>2</SwiperSlide>
            <SwiperSlide className={s.slide}>3</SwiperSlide>
            <SwiperSlide className={s.slide}>4</SwiperSlide>
            <SwiperSlide className={s.slide}>5</SwiperSlide>
            <SwiperSlide className={s.slide}>6</SwiperSlide>
            <SwiperSlide className={s.slide}>7</SwiperSlide>
            <SwiperSlide className={s.slide}>8</SwiperSlide>
            <SwiperSlide className={s.slide}>7</SwiperSlide>
            <SwiperSlide className={s.slide}>8</SwiperSlide>
            <SwiperSlide className={s.slide}>8</SwiperSlide>
            <SwiperSlide className={s.slide}>8</SwiperSlide>
            <SwiperSlide className={s.slide}>10</SwiperSlide> */}

        </Swiper>
    )
}

export default memo(NftList);