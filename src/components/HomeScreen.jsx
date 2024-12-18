import "./HomeScreen.css";
import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useHomeScreenContext from "./HomeScreenContext";
import useStateContext from "../game/StateContext";
import Winner from '../assets/Winner.svg';
import XWinner from '../assets/XWinner.svg';
import OWinner from '../assets/OWinner.svg';
import NWinner from '../assets/NWinner.svg';

const HomeScreen = () => {
    const gameIcon = require('../assets/GameIcon.png');

    const variants = {
        open: { backgroundColor: "rgba(0,0,0,0.3)" },
        closed: { backgroundColor: "rgba(0,0,0,0)" },
    };
    const modalVariants = {
        open: {
            opacity: 1,
            transition: { staggerChildren: 0.5, delayChildren: 0.2 },
        },
        closed: { opacity: 0 },
    };

    const { overlay, setOverlay, gameDone, setGameDone } = useHomeScreenContext();
    const { newGame, state, setState } = useStateContext();
    useEffect(()=>{if(state !== null && state.winner !== null) { setOverlay(true); setGameDone(true) }}, [state]);
    useEffect(()=>{}, [overlay]);

    console.log(state)

    return <>
    <AnimatePresence>
    { !overlay ? <></> 
    :   (gameDone === false ?
        <motion.div className="overlay" key="overlay1"
            variants={variants} initial={"closed"} 
            animate={"open"} exit={"closed"}
        >
            <motion.div className="modal" style={{display: "flex", flexDirection: "column", justifyContent: 'space-between'}}
                variants={modalVariants} onClick={(e) => e.stopPropagation()}>
                <motion.div></motion.div>        
                <motion.div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                    <motion.button 
                        className="button-82-pushable" role="button" 
                        onClick={() => { newGame(); setOverlay(false)}}> 
                        <motion.span className="button-82-shadow"></motion.span>
                        <motion.span className="button-82-edge"></motion.span>
                        <motion.span className="button-82-front text"> New Game </motion.span>
                    </motion.button>
                    <motion.img style={{width: '60%'}} src={gameIcon}/>
                </motion.div>
            </motion.div>
        </motion.div>

    :   <motion.div className="overlay" key="overlay2"
            variants={variants} initial={"closed"} 
            animate={"open"} exit={"closed"}
        >
            <motion.div className="modal" style={{display: "flex", flexDirection: "column", justifyContent: 'space-between'}}
                variants={modalVariants} onClick={(e) => e.stopPropagation()}>
                <motion.div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                    <motion.img src={Winner}/>   
                    <motion.img 
                        style={{transform: 'scale(1.6)', marginTop: '-35px'}}
                        src={state.winner === 'X' ? XWinner : (state.winner === 'O' ? OWinner : NWinner) }/>     
                </motion.div>
                <motion.div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                    <motion.button 
                        className="button-82-pushable" role="button" 
                        onClick={() => { setGameDone(false); setState(null) }}> 
                        <motion.span className="button-82-shadow"></motion.span>
                        <motion.span className="button-82-edge"></motion.span>
                        <motion.span className="button-82-front text"> Back To Menu </motion.span>
                    </motion.button>
                    <motion.img style={{width: '60%'}} src={gameIcon}/>
                </motion.div>
            </motion.div>
        </motion.div>)}
    </AnimatePresence>
    </>;
}

export default HomeScreen;