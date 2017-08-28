import React from 'react';
import Header from './components/header';
import Progress from './components/progress';

let duration = null;
class Root extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: '-'
    };
    this.progressChangeHandler = this.progressChangeHandler.bind(this);
    //this.handleClick = this.handleClick.bind(this);
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
    // bind once, then need to unbind, or if hit back, this will bind again
    $('#player').bind($.jPlayer.event.timeupdate, (e) => {
      duration = e.jPlayer.status.duration;
      this.setState({
        progress: e.jPlayer.status.currentPercentAbsolute
      });
    });
  }

  componentWillUnMount() {
    $('#player').unbind($.jPlayer.event.timeupdate);
  }
  progressChangeHandler(progress) {
    // console.log(this);
    //console.log('from progress', progress);
    $('#player').jPlayer('play', duration * progress);
  }
  // handleClick() {
  //   console.log(this);
  // }
  render() {
    return (
      <div>
        <Header />
        <Progress 
          progress={this.state.progress}
          onProgressChange={this.progressChangeHandler}
          barColor='#446688'
        >
        </Progress>
      </div>
    )
  }
}

export default Root;