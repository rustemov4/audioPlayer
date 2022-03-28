import { useEffect, useState } from "react";
import {FaPlay,FaStop} from "react-icons/fa"
import { MdSkipNext,MdSkipPrevious,MdRepeat } from "react-icons/md";
import { useSelector } from "react-redux";
import logo from '../../assets/musicLogo.png'
import { data } from "../../data/data";
import { useDispatch} from "react-redux";
import { setMusic } from "../../store/slicers";
import './player.css'
export default function Player(props){
    const {current} = useSelector(state => state.music)
    const [paused,setPaused] = useState(true)
    const [audioPlayer,setAudioPlayer] = useState()
    const [time,setTime] = useState()
    const [inter,setInter] = useState()
    const [duration,setDuration] = useState()
    const [sliderValue,setSliderValue] = useState(0)
    const dispatch = useDispatch()
    const playMusic = (cur) =>{
        if(audioPlayer){
            audioPlayer.play()
            setPaused(false)
        }
        else{
            setAudioPlayer(current.music)
        }
    }
    const nextSong = () =>{
        var index = current.id
        clearInterval(inter)
        if(index === data.length - 1){
            index = -1
        }
        dispatch(setMusic({music: data[index + 1]}))
    }
    const previousSong = () =>{
        var index = current.id
        console.log(index)
        clearInterval(inter)
        if(index === 0){
            index = data.length
        }
        dispatch(setMusic({music:data[index - 1]}))
    }
    const currentTime = () =>{
         setInter(setInterval(() =>{
            var minutes = "0"+parseInt(audioPlayer.currentTime / 60, 10);
            var seconds = parseInt(audioPlayer.currentTime % 60);
            if(seconds < 10){
                seconds = "0"+parseInt(audioPlayer.currentTime % 60);
            }
            setTime(minutes + ":" + seconds)
            setSliderValue(audioPlayer.currentTime)
        },1000))
        audioPlayer.onloadedmetadata = () =>{
            setDuration(audioPlayer.duration)
        }
    }
    const changeTime = (e) =>{
        if(audioPlayer){
            console.log(e.target.value)
            audioPlayer.currentTime = e.target.value
        }
    }
    const repeat = () =>{
        audioPlayer.currentTime = 0
    }
    useEffect(() =>{
        if(audioPlayer){
            audioPlayer.pause()
            setPaused(true)
            clearInterval(inter)
            setTime("00:00")
            setAudioPlayer(current.music)
        }
    },[current])
    useEffect(() =>{
        if(audioPlayer){
            audioPlayer.currentTime = 0
            audioPlayer.play() 
            setPaused(false)
            currentTime()
        }
    },[audioPlayer])

    return (
        <div className='player'>
            <input type="range" className="form-range slider" value={sliderValue} min={0} max= {duration} step="0.01" onChange={(e) =>changeTime(e) } />
            <div className="d-flex justify-content-between align-items-center h-100 player_inner">
                <div className="d-flex align-items-center" >
                    <img src={current?.cover ? current?.cover :logo} className="logo"/>
                </div>
                <div className="d-flex">
                    <MdRepeat size={35} cursor="pointer" style={{marginRight:"25px"}} onClick={() => repeat()} className = "button"/>
                    <div className="d-flex">
                        <MdSkipPrevious size={35} cursor="pointer" style={{marginRight:"20px"}} onClick = {() => previousSong()} className = "button"/>
                        {
                            paused
                            ?
                            <FaPlay size={35} cursor="pointer" onClick={() =>{
                                playMusic(current.music)
                            }} className = "button"/>
                            :
                            <FaStop size={35} cursor = "pointer" onClick={() => {
                                audioPlayer?.pause()
                                setPaused(true)
                            }} className = "button"/> 
                        }
                        <MdSkipNext size={35} cursor="pointer" style={{marginLeft:"20px"}} className = "button" onClick={() => nextSong()}/>
                    </div>
                </div>
                <div className="timer">
                Time:{time ? time : "00:00"}
                </div>
            </div>
        </div>
    )
}