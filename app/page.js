'use client'

import React, { useEffect, useRef, useState } from "react";
import { TitleItem } from "./Context/TitleItem";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

import data from './data/data.json'
import seasons from './data/seasons.json'
import movies from './data/movies.json'
import specials from './data/specials.json'
import epIds from './data/episodeIds.json'
import mvIds from './data/movieIds.json'
import spIds from './data/specialIds.json'
import axios from "axios";
import dynamic from "next/dynamic";

const VideoComponent = dynamic(() => import('./Components/VideoComponent'))

export default function Home() {

    const searchParams = useSearchParams();

    const [curSeason, setCurSeason] = useState(0);
    const [epSeason, setEpSeason] = useState([]);

    const [episode, setEpisode] = useState({});
    const [movie, setMovie] = useState({});
    const [special, setSpecial] = useState({});

    const [videoUrl, setVideoUrl] = useState("")
    const [currentID, setCurrentID] = useState(null);
    const [currentTypeLink, setCurrentTypeLink] = useState(false);

    const getDataSeason = (seasonNumber) =>{
        for (const item of seasons) {
            if(item.season == seasonNumber){
                setCurSeason(item)
            }
        }
    }
    const changeSeason = async (seasonNumber) => {
        for (const season of data) {
            if(season.season == seasonNumber){
                setEpSeason(season.episodes);
                getDataSeason(season.season);
            }
        }
    }
    function getSeasonAndEpisodes(episodeNumber) {
        for (const season of data) {
          for (const episode of season.episodes) {
            if (episode.episode === episodeNumber) {
                episode.title = episode.title.replace(/^"|"$/g, '');
                setEpisode(episode);
                getDataSeason(season.season);
              return {
                seasonNumber: season.season,
                seasonTitle: season.title,
                episodes: season.episodes
              };
            }
          }
        }
        return null;
    }
    const loadEpisode = async () => {
        if(searchParams.get('episode')){
            setState(1);
            setSpecial({});
            setMovie({});
            const episodeNumber = Number(searchParams.get('episode'))
            const result = getSeasonAndEpisodes(episodeNumber).episodes;
            setEpSeason(result);
        }else{
            changeSeason(curSeason == 0 ? 1 : curSeason)
        }
    }
    useEffect(() => {
        loadEpisode()
    }, [searchParams.get('episode')]);



    const loadMovies = async () => {
        if(searchParams.get('movie')){
            setState(2);
            setSpecial({});
            setEpisode({});
            const movieNumber = Number(searchParams.get('movie'));
            for(const item of movies){
                if(movieNumber == item['index']){
                    setMovie(item)
                }
            }
        }else{
            const movieNumber = movie?.index ? movie.index : 1;
            for(const item of movies){
                if(movieNumber == item['index']){
                    setMovie(item)
                }
            }
            setMovie({});
        }
    }
    useEffect(() => {
        loadMovies()
    }, [searchParams.get('movie')]);




    const loadSpecial = async () => {
        if(searchParams.get('special')){
            setState(3);
            setMovie({});
            setEpisode({});
            const specialNumber = Number(searchParams.get('special'));
            for(const item of specials){
                if(specialNumber == item['index']){
                    setSpecial(item)
                }
            }
        }else{
            const specialNumber = special?.index ? special.index : 1;
            for(const item of movies){
                if(specialNumber == item['index']){
                    setSpecial(item)
                }
            }
            setSpecial({})
        }
    }
    useEffect(() => {
        loadSpecial()
    }, [searchParams.get('special')]);



    const [state, setState] = useState(1);
    const titles = [
        { id: 1, label: 'Danh sách tập', sea: true },
        { id: 2, label: 'Movie', sea: false },
        { id: 3, label: 'Special', sea: false },
    ];

    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };
    const firstChildRef = useRef(null);
    const secondChildRef = useRef(null);
    const [height, setHeight] = useState('auto');
    useEffect(() => {
        const updateHeight = () => {
            if (firstChildRef.current && secondChildRef.current) {
                const firstChildHeight = firstChildRef.current.offsetHeight;
                const secondChildWidth = secondChildRef.current.offsetWidth;
                const parentWidth = secondChildRef.current.parentElement.offsetWidth;
                const secondChildWidthPercentage = (secondChildWidth / parentWidth) * 100;

                if (secondChildWidthPercentage < 50) {
                    setHeight(firstChildHeight);
                } else {
                    setHeight('auto');
                }
            }
        };
        updateHeight();
        window.addEventListener('resize', updateHeight);
        return () => window.removeEventListener('resize', updateHeight);
    }, []);



    useEffect(() => {
        setIsVisible(false);
        if(state == 1) loadEpisode()
        if(state == 2) loadMovies()
        if(state == 3) loadSpecial()
    }, [state])



    const hasScrolled = useRef(false);
    useEffect(() => {
        if (hasScrolled.current) return;
        const element = document.getElementById('ep_choice');
        const parent = document.querySelector('.contain_list_item_player_slide');

        if (element && parent) {
            const elementRect = element.getBoundingClientRect();
            const parentRect = parent.getBoundingClientRect();

            const elementOffset = elementRect.top - parentRect.top;
            const elementCenterOffset = elementOffset - (parent.clientHeight / 2) + (element.clientHeight / 2);

            parent.scrollTo({
                top: elementCenterOffset,
                behavior: 'smooth'
            });
            hasScrolled.current = true;
        }
    }, [episode, movie, special]);


    

    const loading = useRef(false);
    async function fetchLinkAsync(id, bc) {
        try {
            const response = await axios.get(`https://video.miwabox.live/api/${bc == true ? 'linkB' : 'link'}?id=${encodeURIComponent(id)}`);
            return response.data;
        } catch (error) {
            if(bc == false){
                return fetchLinkAsync(id, true);
            }else return "ERR";
        }
    }
    const getLink = async (linkId, bc = false) => {
        if(!loading.current){
            loading.current = true;
            setVideoUrl("");
            setCurrentTypeLink(bc);
            const link = await fetchLinkAsync(linkId, bc);
            setVideoUrl(link);
            loading.current = false;
        }
    }

    const settingLink = async (tmpId, bc = false) => {
        if (tmpId) {
            setCurrentID(tmpId);
            getLink(tmpId, bc);
        } else {
            setCurrentID(null);
            setVideoUrl("ERR");
        }
    };    


    useEffect(() => {
        setVideoUrl("");
        if(searchParams.get('episode')){
            const tmp = epIds.find(item => item.episode === Number(searchParams.get('episode')));
            settingLink(tmp?.id);
        }else if(searchParams.get('movie')){
            const tmp = mvIds.find(item => item.index === Number(searchParams.get('movie')));
            settingLink(tmp?.id);
        }else if(searchParams.get('special')){
            const tmp = spIds.find(item => item.index === Number(searchParams.get('special')));
            settingLink(tmp?.id);
        }else{
            window.location.href = "/?episode=1";
        }
    }, [searchParams.get('episode'), searchParams.get('movie'), searchParams.get('special')])



  return (

        <div className="content">

            <div className="head-info-player">
                <p>Cảm ơn Okami Fansub và một số nguồn khác đã dịch các video.</p>
                <p>Chọn HD nếu video bị mờ, bị lỗi hoặc tải chậm.</p>
            </div>

            <div className="wrap_player">
                
                <div className="player_content"  ref={firstChildRef}>

                    <div className="server_video">
                        <div className={!currentTypeLink ? "chose_server": "" } onClick={() => {settingLink(currentID)}}>AUTO</div>
                        <div className={currentTypeLink ? "chose_server": "" } onClick={() => {settingLink(currentID, true)}}>HD</div>

                        {searchParams.get('episode')?
                        <>
                            <Link href={`/?episode=${episode.episode + 1}`}>
                                <div className="mv-right">Tập tiếp theo</div>
                            </Link>
                            <Link href={`/?episode=${episode.episode - 1}`}>
                                <div className="mv-right">Tập trước</div>
                            </Link>
                        </>
                        : ""
                        }
                    </div>

                    <div className="contain_video">
                        <VideoComponent videoUrl={videoUrl} posterUrl={episode.imageUrl}/>
                    </div>
            

                    <div className="title_video">
                        {searchParams.get('episode') ?
                            <>
                                <div>Tập {episode?.episode}</div>
                                <div>{episode?.title ? episode?.title : "__"}</div>
                            </>
                        : ""}

                        {searchParams.get('movie') ?
                            <>
                                <div>Phim {movie?.index}</div>
                                <div>{movie?.title ? movie?.title :"__"}</div>
                            </>
                        : ""}

                        {searchParams.get('special') ?
                            <>
                                <div>Special {special?.index}</div>
                                <div>{special?.title ? special?.title :"__"}</div>
                            </>
                        : ""}
                    </div>
                    
                </div>

                <div className="player_slide" style={{ height: height }} ref={secondChildRef}>

                    <div className="contain_title_player_slide">
                        {titles.map(title => (
                            <TitleItem 
                                key={title.id} 
                                id={title.id} 
                                label={title.label} 
                                state={state} 
                                setState={setState} 
                            />
                        ))}
                    </div>

                    <div className="contain_middle_player_slide">

                        <div className="contain_tool_player_slide">
                            {titles[state-1]?.sea == true ?
                                (
                                    <div className="button_season_player_slide" onClick={toggleVisibility}>
                                        <span>Mùa {curSeason.season}</span>
                                        <div>{curSeason.start} - {curSeason.end}</div> 
                                    </div>
                                )
                                :
                                (
                                    <div className="show_total_item">Tổng số: {state == 2 ? movies.length : specials.length}</div>
                                )
                            }
                        </div>

                        <div className={`contain_list_season_player_slide ${isVisible ? 'show' : 'hide'}`}>
                            <div className="list_season_player_slide">
                                {seasons?.map((item, index) => (
                                    <div key={index} onClick={() => changeSeason(item.season)} id={item.season == curSeason.season ? "somua_choice" : ""} ><span>Season {item.season} - {item.title}</span><span>{item.start}-{item.end}</span></div>
                                ))}
                            </div>
                        </div>

                    </div>
                
                    <div className="contain_all_list_player">
                    
                        <div className="contain_list_item_player_slide">
                            <div className="list_item_player_slide">
                            
                                {state == 1 && epSeason?.map((item) => (
                                    <Link key={item.episode} href={`/?episode=${item.episode}`} passHref id={item.episode == episode?.episode ? "ep_choice" : ""}>
                            
                                        <div className="item_player_slide">
                                        <div className="img_item_player_slide">
                                            <img src={item.imageUrl} alt={`Episode ${item.episode}`} />
                                        </div>
                                        <div className="title_item_player_slide">Tập {item.episode}</div>
                                        <div className="view_item_player_slide">{String(item.title).replace(/^"|"$/g, '')}</div></div>
                    
                                    </Link>
                                ))}   

                                {state == 2 && movies?.map((item) => (
                                    <Link key={item.index} href={`/?movie=${item.index}`} passHref id={item.index == movie?.index ? "ep_choice" : ""}>
                            
                                        <div className="item_player_slide">
                                        <div className="img_item_player_slide">
                                            <img src={item.imageUrl} />
                                        </div>
                                        <div className="title_item_player_slide">Phim {item.index}</div>
                                        <div className="view_item_player_slide">{String(item.title).replace(/^"|"$/g, '')}</div></div>
                    
                                    </Link>
                                ))}   

                                {state == 3 && specials?.map((item) => (
                                    <Link key={item.index} href={`/?special=${item.index}`} passHref id={item.index == special?.index ? "ep_choice" : ""}>
                            
                                        <div className="item_player_slide">
                                        <div className="img_item_player_slide">
                                            <img src={item.imageUrl} />
                                        </div>
                                        <div className="title_item_player_slide">Special {item.index}</div>
                                        <div className="view_item_player_slide">{String(item.title).replace(/^"|"$/g, '')}</div></div>
                    
                                    </Link>
                                ))}   

                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className="bottom-player">Câu chuyện kể về Monkey D. Luffy, một chàng trai trẻ tuổi, được thần tượng thời thơ ấu của mình là Shanks "Tóc Đỏ" truyền cảm hứng trở thành một hải tặc, bắt đầu cuộc hành trình tại East Blue tìm kiếm kho báu danh giá và trở thành Vua Hải Tặc. Trong quá trình thành lập băng hải tặc Mũ Rơm, Luffy đã giải cứu và kết bạn với một kiếm sĩ tên là Roronoa Zoro(ロのノア ゾロ), và họ bắt đầu tìm kiếm One Piece. Họ tham gia vào cuộc hành trình cùng Nami(ナミ), một hoa tiêu; Usopp(ウソプ), một tay thiện xạ; Vinsmoke Sanji(ヴィンスモク サンジ), một đầu bếp. Họ có được một con tàu tên là Going Merry(ゴイング メリー) và đối đầu với những băng hải tặc khét tiếng của East Blue. Khi Luffy và đồng đội của cậu bắt đầu cuộc phiêu lưu của, những người khác tham gia vào băng sau đó trong bộ truyện, bao gồm Tony Tony Chopper(トニー チョパー), một bác sĩ và là một con tuần lộc biết nói; Nico Robin(ニコ ロビン), một nhà khảo cổ học; Franky(フランキー), một thợ đóng tàu cyborg; Brook(ブルーク), một nhạc công và Jinbei(ジンベイ), một người cá và là cựu thành viên của Thất vũ hải(七武海). Khi Going Merry bị hư hỏng không thể sửa chữa được, băng hải tặc Mũ Rơm đã sử dụng một con tàu mới tên là Thousand Sunny(サウサンド サーニー). Cùng nhau, họ chạm trán với những tên hải tặc, thợ săn tiền thưởng, tổ chức tội phạm, quân cách mạng, đặc vụ và Chính phủ thế giới, cùng nhiều bạn bè và kẻ thù khác.</div>
        </div>
  );
}