import React from 'react'
import Progress from '../components/progress'
import './player.less'


let duration = null;
class Player extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            progress: 0,
            volume: 0,
            leftTime: 0
        };
        this.setProgress = this.setProgress.bind(this);
        this.setVolume =  this.setVolume.bind(this);
    }
    componentDidMount() {
        $('#player').bind($.jPlayer.event.timeupdate, (e) => {
            duration = e.jPlayer.status.duration;
            this.setState({
                progress: e.jPlayer.status.currentPercentAbsolute,
                volume: e.jPlayer.options.volume * 100
            });
        });
    }
    // bind once, then need to unbind, or if hit back, this will bind again
    componentWillUnmount() {
        $('#player').unbind($.jPlayer.event.timeupdate);
    }
    setVolume(volume) {
        $('#player').jPlayer('volume', volume);
    }
    setProgress(progress) {
        // console.log(this);
        //console.log('from progress', progress);
        $('#player').jPlayer('play', duration * progress);
    }

    render() {
        return (
            <div className='page-player'>
                <h1 className='caption'>
                    {/*<Link to='/list'>My Music Player &gt;</Link>*/}
                </h1>
                <div className='mt20 row'>
                    <div className='controll-wrapper'>
                        <h2 className='music-title'>
                            {this.props.currentMusicItem.title}
                        </h2>
                        <h3 className='music-artist mt10'>
                            {this.props.currentMusicItem.artist}
                        </h3>
                        <div className='row mt20'>
                            <div className='left-time -col-auto'>-{this.state.leftTime}</div>
                            <div className='volume-container'>
                                <i className='icon-volume rt' style={{
                                    top: 5,
                                    left: -5
                                }}></i>
                                <div className='volume-wrapper'>
                                    <Progress
                                        progress={this.state.volume}
                                        setProgress={this.setVolume}
                                        barColor='grey'
                                    />
                                </div>
                            </div>
                        </div>
                        <div style={{
                            height: 10,
                            lineHeight: '10px',
                            marginTop: '20px'
                        }}>
                            <Progress
                                progress={this.state.progress}
                                setProgress={this.setProgress}
                                barColor='#447799'
                            />
                        </div>
                        <div className='mt35 row'>
                            <div>
                                <i onClick={this.prev} className='icon prev'></i>
                                <i
                                    onClick={this.play}
                                    className={`icon ml20 ${this.state.isPlay ? 'pause' : 'play'}`}
                                >
                                </i>
                                <i onClick={this.next} className='icon next ml20'></i>
                            </div>
                            <div className='-col-auto'>
                                <i
                                    onClick={this.changeCycleModel}
                                    className={`icon repeat-${this.props.cycleModel}`}
                                ></i>
                            </div>
                        </div>
                    </div>
                    <div className='-col-auto cover'>
                        <img
                            src={this.props.currentMusicItem.cover}
                            alt={this.props.currentMusicItem.title}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default Player;