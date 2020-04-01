// import React from "react"
// import ReactApexChart from "react-apexcharts"
// import { convertStringToNumber } from "./utils/convertStringToNumber"

// class BarChart extends React.Component {
//   constructor(props) {
//     super(props)
//     console.log(this.props);
    
//     this.state = {
        
//         countries: [],
    
//       series: [
//         {
//           data: [this.countries.data()]
//         }
//       ],
//       options: {
//         chart: {
//           type: "bar",
//           height: 350
//         },
//         plotOptions: {
//           bar: {
//             horizontal: true
//           }
//         },
//         dataLabels: {
//           enabled: false
//         },
//         xaxis: {
//           categories: [

//           ]
//         }
//       }
//     }
//   }


//     componentDidUpdate(prevProps, prevState, snapshot) {
    
//         if (this.props.data() !== prevProps.data()) {
            
//             const country = this.props.data
            
//             this.setState(() => ({
//             countries: country
//         }));
    
//     }
// }

//   render() {
//     return (
//       <div id="chart">
//         <ReactApexChart
//           options={this.state.options}
//           series={this.state.series}
//           type="bar"
//           height={350}
//         />
//       </div>
//     )
//   }
// }


// export default BarChart