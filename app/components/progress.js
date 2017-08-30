import React from 'react';
import './progress.less';

class Progress extends React.Component {
	constructor(props) {
		super(props);
		this.setPercentage = this.setPercentage.bind(this);
	}
    setPercentage(e) {
		let progressBar = this.refs.progressBar;
		let percentage = (e.clientX -
				progressBar.getBoundingClientRect().left) / progressBar.clientWidth;
        // check if props.setProgress exist before calling
		this.props.setProgress && this.props.setProgress(percentage);
	}
	render() {
        let barStyle = {
            width: `${this.props.percentage}%`,
            background: this.props.barColor
        };
		return (
			<div 
				className='components-progress'
				ref='progressBar'
				onClick={this.setPercentage}
			>
				<div
					className='progress'
					style={barStyle}
                ></div>
			</div>
		);
	}
}

Progress.defaultProps = {
    percentage: 0,
	barColor: 'grey'
}

export default Progress;