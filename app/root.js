import React, { Component }from 'react'
import Header from './components/header'
import Player from "./page/player"
import MusicList from './page/musiclist'
import { MUSIC_DATA } from './config/musicData'
// import { Route } from 'react-router'
import { BrowserRouter, Route, Link } from 'react-router-dom'


class Root extends Component {
    constructor(props) {
        super(props);
        this.state = {
            musicList: MUSIC_DATA,
            currentMusicItem: MUSIC_DATA[0],
            currentPlayMode: 'cycle'
        }
    }

    playMusic(musicItem) {
        $('#player').jPlayer('setMedia', {
            mp3: musicItem.file
        }).jPlayer('play');
        this.setState({
            currentMusicItem: musicItem
        })
    }
    playNext(type = "next") {
        let index = this.findMusicIndex(this.state.currentMusicItem)
        let newIndex = null;
        let musicListLength = this.state.musicList.length;

        switch(this.state.currentPlayMode) {
            case 'cycle':
                if (type === 'prev') {
                    newIndex = (index - 1 + musicListLength) % musicListLength;
                }
                else {
                    newIndex = (index + 1) % musicListLength;
                }
                break;
            case 'one':
                newIndex = index;
                break;
            case 'random':
                newIndex = this.getRandomMusicIndex();
                break;
            default:
                newIndex = (index + 1) % musicListLength;
        }
        this.playMusic(this.state.musicList[newIndex]);
    }

    changePlayMode() {
        const PLAY_MODE = [
            'cycle',
            'one',
            'random'
        ];

        let modeIndex = PLAY_MODE.indexOf(this.state.currentPlayMode);
        this.setState({
            currentPlayMode: PLAY_MODE[(modeIndex + 1) % PLAY_MODE.length]
        })
    }

    findMusicIndex(musicItem) {
        return this.state.musicList.indexOf(musicItem);
    }
    getRandomMusicIndex() {
        let min = 0;
        let max = Math.floor(this.state.musicList.length);
        return Math.floor(Math.random() * (max - min)) + min;
    }
    // playRandom() {
    //     this.playMusic(this.state.musicList[this.getRandomMusicIndex()]);
    // }

    componentDidMount() {
        $('#player').jPlayer({
            supplied: 'mp3',
            wmode: 'window'
        });

        this.playMusic(this.state.currentMusicItem);

        $('#player').bind($.jPlayer.event.ended, (e) => {
            switch (this.state.currentPlayMode) {
                case 'cycle':
                    this.playNext();
                    break;
                case 'one':
                    this.playNext('one');
                    break;
                case 'random':
                    this.playNext('random');
                    break;
            }
        });

        PubSub.subscribe('PLAY_MUSIC', (msg, musicItem) => {
            this.playMusic(musicItem);
        });
        PubSub.subscribe('DELETE_MUSIC', (msg, musicItem) => {
            this.setState({
                musicList: this.state.musicList.filter(item => {
                    return item !== musicItem;
                })

            })
        });
        PubSub.subscribe('PLAY_PREV', (msg) => {
            this.playNext('prev');
        });
        PubSub.subscribe('PLAY_NEXT', (msg) => {
            this.playNext();
        });
        PubSub.subscribe('CHANGE_PLAY_MODE', (msg) => {
            this.changePlayMode();
        })

    }

    componentWillUnmount() {
        $('#player').unbind($.jPlayer.event.ended);
        PubSub.unsubscribe('PLAY_MUSIC');
        PubSub.unsubscribe('DELETE_MUSIC');
        PubSub.unsubscribe('PLAY_PREV');
        PubSub.unsubscribe('PLAY_NEXT');
        PubSub.unsubscribe('CHANGE_PLAY_MODE');
    }


    render() {
        const PlayerComponent = () => (
            <Player
                currentMusicItem = {this.state.currentMusicItem}
                playMode = {this.state.currentPlayMode}
            ></Player>
        )

        const ListComponent = () => (
            <MusicList
                currentMusicItem = {this.state.currentMusicItem}
                musicList = {this.state.musicList}
            >
            </MusicList>
        )

        return(
            <BrowserRouter>
                <div>
                    <Header/>
                    <Route exact={true} path='/' component={PlayerComponent}></Route>
                    <Route path='/list' component={ListComponent}></Route>
                </div>
            </BrowserRouter>
        )
    }

}

export default Root;