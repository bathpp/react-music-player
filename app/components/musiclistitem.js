import React, { Component } from 'react'
import './musiclistitem.less'
import Pubsub from 'pubsub-js'

class MusicListItem extends Component {
    constructor(props) {
        super(props);

        this.playMusic = this.playMusic.bind(this);
        this.deleteMusic = this.deleteMusic.bind(this);
    }
    playMusic(musicItem) {
        Pubsub.publish('PLAY_MUSIC', musicItem);
    }
    deleteMusic(musicItem, e) {
        e.stopPropagation();
        Pubsub.publish('DELETE_MUSIC', musicItem);
    }
    render() {
        let musicListItem = this.props.musicListItem;
        return (
                <PlayHandler
                    musicItem={musicListItem}
                    focus={this.props.focus}
                >
                    <DeleteHandler musicItem={musicListItem}></DeleteHandler>
                </PlayHandler>
        )
    }
}

class PlayHandler extends Component {
    constructor(props) {
        super(props);
    }
    handlePlay() {

    }
    render() {
        return (
            <li onClick={this.handlePlay} className={`components-musiclistitem row${this.props.focus ? ' focus' : ''}`}>
                <p><strong>{this.props.musicItem.title} - {this.props.musicItem.artist}</strong></p>
            </li>
        )
    }
}

class DeleteHandler extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <p onClick={this.deleteMusic.bind(this, musicListItem)} className="-col-auto delete"></p>
        )
    }
}
export default MusicListItem;