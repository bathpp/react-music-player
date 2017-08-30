import React from 'react'
import MusicListItem from "../components/musiclistitem";

class MusicList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let listItem = this.props.musicList.map((item) => {
            return (
                <MusicListItem
                    focus={item === this.props.currentMusicItem}
                    key={item.id}
                    musicListItem={item}
                >
                    {item.title}
                </MusicListItem>
                )
        });

        return (
            <ul>
                { listItem }
            </ul>
        )
    }
}

export default MusicList;