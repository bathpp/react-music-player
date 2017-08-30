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
            currentMusicItem: MUSIC_DATA[0]
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
        if (type === 'next') {
            newIndex = (index+1) % musicListLength;
            this.playMusic(this.state.musicList[newIndex]);
        }
        else {
            newIndex = (index -1 + musicListLength) % musicListLength;
            this.playMusic(this.state.musicList[newIndex]);
        }
    }

    findMusicIndex(musicItem) {
        return this.state.musicList.indexOf(musicItem);
    }
    componentDidMount() {
        $('#player').jPlayer({
            supplied: 'mp3',
            wmode: 'window'
        });

        this.playMusic(this.state.currentMusicItem);

        $('#player').bind($.jPlayer.event.ended, (e) => {
            this.playNext();
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

    }

    componentWillUnmount() {
        $('#player').unbind($.jPlayer.event.ended);
        PubSub.unsubscribe('PLAY_MUSIC');
        PubSub.unsubscribe('DELETE_MUSIC');
        PubSub.unsubscribe('PLAY_PREV');
        PubSub.unsubscribe('PLAY_NEXT');
    }


    render() {
        const PlayerComponent = () => (
            <Player
                currentMusicItem = {this.state.currentMusicItem}
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