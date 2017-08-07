import Song from './../media/audio/Stickup.mp3'
import React from 'react'
import { connect } from 'react-redux'
import * as actions from './../store/modules/audio/action'

class WebAudio extends React.Component {

    componentDidMount() {
        let vizualizer = {}

        if (typeof AudioContext !== undefined) {
            vizualizer.audioContext = new AudioContext();
            // eslint-disable-next-line no-undef
        } else if (typeof webkitAudioContext !== undefined) {
            // eslint-disable-next-line no-undef
            vizualizer.audioContext = new webkitAudioContext();
        } else {
            throw new Error("AudioContext is not supported");
        }
        vizualizer.audioElement = this.audioElement;
        vizualizer.audioElement.crossOrigin = "anonymous";
        vizualizer.audioSource = vizualizer.audioContext.createMediaElementSource(vizualizer.audioElement);
        vizualizer.audioAnalyser = vizualizer.audioContext.createAnalyser();
        vizualizer.audioSource.connect(vizualizer.audioAnalyser);
        vizualizer.audioSource.connect(vizualizer.audioContext.destination);
        vizualizer.dataArray = new Uint8Array(1024);
        vizualizer.effects = [];
        this.vizualizer = vizualizer
        this.startRender()
    }

    startRender() {
        if (this.vizualizer.audioAnalyser) {
            //console.log("helo")
            this.vizualizer.audioAnalyser.getByteFrequencyData(this.vizualizer.dataArray)
            this.props.updateAudioData(Array.from(this.vizualizer.dataArray))
        }
        //requestAnimationFrame(this.startRender.bind(this));
    }

    render() {
        return (
            <audio ref={el => { this.audioElement = el }} src={Song} controls />
        )
    }

}

const mapStateToProps = ({ audio }) => {
    return {
        vizualizer: audio.vizualizer,
        effects: audio.effects
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateVizualizer: data => dispatch(actions.updateVizualizer(data)),
        updateAudioData: data => dispatch(actions.updateAudioData(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WebAudio)