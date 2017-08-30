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

    componentDidMount() {
        $('#player').jPlayer({
            ready: function () {
                $(this).jPlayer('setMedia', {
                    mp3: './static/music/01.mp3'
                }).jPlayer('play');
            },
            supplied: 'mp3',
            wmode: 'window'
        });
    }

    componentWillUnmount() {
        $('#player').unbind($.jPlayer.event.ended);
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