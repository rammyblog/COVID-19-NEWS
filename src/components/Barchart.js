import React from "react"
import ReactApexChart from "react-apexcharts"


class BarChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            series: [{
              data: []
            }],
            options: {
                chart: {
                    type: "bar",
                    height: 350,

                },
                labels: [],
                plotOptions: {
                    bar: {
                        horizontal: true
                    }
                },
                dataLabels: {
                    enabled: true
                },
                xaxis: null
            }
        }
    }

    getStateData = () => {
        const props_states = this.props.data.map(state => state.state);
        const props_confirmed = this.props.data.map(num => num.number_confirmed);
        const seriesData = {data: props_confirmed};
        const categories = {categories: props_states};
        let stateOptions = {...this.state.options};
        let tempSeries = {...this.state.series};
        tempSeries = seriesData
        stateOptions.xaxis = categories;
        stateOptions.labels = props_states
        // console.log(tempSeries, [tempSeries], seriesData)

        this.setState(() => (
            {options: stateOptions, series: [tempSeries]}

        ));

    };

    componentDidMount() {
        this.getStateData()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

        if (this.props.data !== prevProps.data) {
            this.getStateData()
        }
    }

    render() {
        return (
            <div id="chart">
                <ReactApexChart
                    options={this.state.options}
                    series={this.state.series}
                    type="bar"
                    height={350}
                />
            </div>
        )
    }
}


export default BarChart