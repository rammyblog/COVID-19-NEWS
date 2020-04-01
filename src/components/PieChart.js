import React from 'react';
import ReactApexChart from "react-apexcharts";
import {convertStringToNumber} from './utils/convertStringToNumber'

class PieChart extends React.Component {
    constructor(props) {
        super(props);
        const {total_cases, total_deaths, total_recovered} = this.props;

        this.state = {
            series: [convertStringToNumber(total_cases),convertStringToNumber(total_recovered) ,convertStringToNumber(total_deaths)],
            options: {
                chart: {
                    type: 'donut',
                    width: '200%'
                },
                labels: ['Total Cases', 'Total Recovered', 'Total Deaths'],
                // dataLabels: {
                //     style: {
                //       colors: ['#F44336', '#E91E63', '#9C27B0']
                //     }
                //   },
                  fill: {
                    colors: ['#007bff', '#00e396', '#feb019']
                  },

                responsive: [{
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: '100%'
                        },
                        legend: {
                            position: 'bottom'
                        }
                    }
                }]
            },


        };
    }

    // componentDidUpdate(prevProps, prevState, snapshot) {
    //
    //     if (this.props.total_cases !== prevProps.total_cases) {
    //         this.setState({
    //             series: this.props
    //         });
    //     }
    //
    // }

    render() {
        return (
            <div id="chart" style={{width:'100%'}}>
                <ReactApexChart options={this.state.options} series={this.state.series} type="donut"/></div>
        )
    }
}

export default PieChart;