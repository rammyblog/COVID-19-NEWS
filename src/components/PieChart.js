import React from 'react';
import ReactApexChart from "react-apexcharts";

class PieChart extends React.Component {
    constructor(props) {
        super(props);
        const {total_cases, total_deaths, total_recovered} = this.props;

        this.state = {
            series: [parseFloat(total_cases.replace(/,/g, '')), parseFloat(total_deaths.replace(/,/g, '')), parseFloat(total_recovered.replace(/,/g, ''))],
            options: {
                chart: {
                    type: 'donut',
                    width: '200'
                },
                labels: ['Total Cases', 'Total Recovered', 'Total Deaths'],

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
            <div id="chart">
                <ReactApexChart options={this.state.options} series={this.state.series} type="donut"/></div>
        )
    }
}

export default PieChart;