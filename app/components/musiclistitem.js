import React, { Component } from 'react'
import './musiclistitem.less'
import Pubsub from 'pubsub-js'

class MusicListItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let musicListItem = this.props.musicListItem;
        return (
                <ListItemHandler
                    musicItem={musicListItem}
                    focus={this.props.focus}
                >
                </ListItemHandler>


        )
    }
}

/** The following two handler is created since you could not pass params directly in onClick
 * One way to do it is to use arrow function in onClick, but it will cause the render to create new function every time
 * Use sub-component is a better way, the param can be passed as a props in the sub-components
 * reference: https://stackoverflow.com/questions/29810914/react-js-onclick-cant-pass-value-to-method
**/
class ListItemHandler extends Component {
    constructor(props) {
        super(props);
        this.playMusic = this.playMusic.bind(this);
    }
    playMusic() {
        Pubsub.publish('PLAY_MUSIC', this.props.musicItem);
    }
    render() {
        return (
            <li onClick={this.playMusic} className={`components-musiclistitem row${this.props.focus ? ' focus' : ''}`}>
                <p><strong>{this.props.musicItem.title} - {this.props.musicItem.artist}</strong></p>
                <DeleteHandler musicItem={this.props.musicItem}></DeleteHandler>
            </li>
        )
    }
}

class DeleteHandler extends Component {
    constructor(props) {
        super(props);
        this.deleteMusic = this.deleteMusic.bind(this);
    }
    deleteMusic(e) {
        //delete is in side <li>, it will trigger the onclick in <li>
        e.stopPropagation();
        Pubsub.publish('DELETE_MUSIC', this.props.musicItem);
    }
    render() {
        return(
            <p onClick={this.deleteMusic} className="-col-auto delete"></p>
        )
    }
}
export default MusicListItem;