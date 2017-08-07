import React from 'react'
import { Bar } from '@vx/shape'
import { Group } from '@vx/group'
import { GradientTealBlue } from '@vx/gradient'
import { letterFrequency } from '@vx/mock-data'
import { scaleBand, scaleLinear } from '@vx/scale'
import { extent, max } from 'd3-array'
import { select } from 'd3-selection'
import { connect } from 'react-redux'
import * as d3 from "d3";


class Vizualisation extends React.Component {

    componentDidMount() {
        const { height } = this.props
        this.bars = d3.select(this.container)
            .selectAll('rect')
            .data(this.props.audioData || Array(1024))
            .enter()
            .append('rect')

        d3.select(this.container)
            .selectAll('rect')
            .data(this.props.audioData)
            .exit()
            .remove()

        d3.select(this.container)
            .selectAll('rect')
            .data(this.props.audioData)
            .attr('width', 10)
            .attr('y', height / 2)
            .attr('x', (d, i) => 3 * i)
            .attr('fill', 'rgba(23, 233, 217, .5)')
    }

    componentDidUpdate() {
        const { audioData, height } = this.props
        if (this.bars) {
            //console.log(audioData)
            this.bars.data(audioData)
                .attr('height', d => {
                    console.log(d)
                    this.setBarHeight(d)
                })
                .enter()
        }

        const transform = "scale(1, -1) translate(0, -" + height + ")";

        this.bars = d3.select(this.container)
            .selectAll('rect')
            .data(this.props.audioData || Array(1024))
            .enter()
            .append('rect')

        d3.select(this.container)
            .selectAll('rect')
            .data(this.props.audioData)
            .exit()
            .remove()

        d3.select(this.container)
            .selectAll('rect')
            .data(this.props.audioData)
            .attr('width', 1)
            .attr("transform", transform)
            .attr('height', d => this.setBarHeight(d))
            .attr('y', height / 2)
            .attr('x', (d, i) => 1 * i)
            .attr('fill', 'rgba(23, 233, 217, .5)')
    }

    setBarHeight(data) {
        const { height } = this.props
        return 1 + 0.5 * height * data / 255
    }

    render() {

        const { width, height, audioData } = this.props
        const data = audioData || []

        return (
            <svg width={width} height={height} ref={el => { this.svg = el }}>
                <GradientTealBlue id="teal" />
                <rect
                    x={0}
                    y={0}
                    width={width}
                    height={height}
                    fill={`url(#teal)`}
                    rx={1}
                />
                <g ref={el => this.container = el} />
            </svg>
        )
    }

}
Vizualisation.defaultProps = {
    width: 500,
    height: 500
}

// export default ({ width, height }) => {
//     if (width < 10) return null

//     // bounds
//     const xMax = width
//     const yMax = height - 120

//     // scales
//     const xScale = scaleBand({
//         rangeRound: [0, xMax],
//         domain: data.map(x),
//         padding: 0.4
//     })
//     const yScale = scaleLinear({
//         rangeRound: [yMax, 0],
//         domain: [0, max(data, y)]
//     })

//     return (
//         <svg width={width} height={height}>
//             <GradientTealBlue id="teal" />
//             <rect
//                 x={0}
//                 y={0}
//                 width={width}
//                 height={height}
//                 fill={`url(#teal)`}
//                 rx={14}
//             />
//             <Group top={40}>
//                 {data.map((d, i) => {
//                     const barHeight = yMax - yScale(y(d))
//                     return (
//                         <Group key={`bar-${x(d)}`}>
//                             <Bar
//                                 width={xScale.bandwidth()}
//                                 height={barHeight}
//                                 x={xScale(x(d))}
//                                 y={yMax - barHeight}
//                                 fill="rgba(23, 233, 217, .5)"
//                                 data={{ x: x(d), y: y(d) }}
//                                 onClick={data => event => {
//                                     alert(`clicked: ${JSON.stringify(data)}`)
//                                 }}
//                             />
//                         </Group>
//                     )
//                 })}
//             </Group>
//         </svg>
//     )
// }

const mapStateToProps = ({ audio }) => {
    return {
        vizualizer: audio.vizualizer,
        audioData: audio.audioData
    }
}

export default connect(mapStateToProps)(Vizualisation)
