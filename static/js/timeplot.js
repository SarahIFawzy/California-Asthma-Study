function init() {
    d3.json("http://localhost:5000/data").then((data) => {
        const data18 = data.survey_2018;
        const data19 = data.survey_2019;
        const data22 = data.survey_2022;
        let asthma18sum = 0;
        let asthma19sum = 0;
        let asthma22sum = 0;
        let CD18sum = 0;
        let CD22sum = 0;
        let DPM18sum = 0;
        let DPM19sum = 0;
        let DPM22sum = 0;
        let ozone18sum = 0;
        let ozone19sum = 0;
        let ozone22sum = 0;
        let PM18sum = 0;
        let PM19sum = 0;
        let PM22sum = 0;
        let pest18sum = 0;
        let pest19sum = 0;
        let pest22sum = 0;
        let poverty18sum = 0;
        let poverty19sum = 0;
        let poverty22sum = 0;
        let pop18sum = 0;
        let pop19sum = 0;
        let pop22sum = 0;
        let traffic18sum = 0;
        let traffic19sum = 0;
        let traffic22sum = 0;
 
        for (let i = 0; i < data18.length; i++) {
            const asthma18 = data.survey_2018[i]['Asthma Pctl'];
            const asthma19 = data.survey_2019[i]['Asthma Pctl'];
            const asthma22 = data.survey_2022[i]['Asthma Pctl'];
            const CD18 = data.survey_2018[i]['Cardiovascular Disease Pctl'];
            const CD22 = data.survey_2022[i]['Cardiovascular Disease Pctl'];
            const DPM18 = data.survey_2018[i]['Diesel PM Pctl'];
            const DPM19 = data.survey_2019[i]['Diesel PM Pctl'];
            const DPM22 = data.survey_2022[i]['Diesel PM Pctl'];
            const ozone18 = data.survey_2018[i]['Ozone Pctl'];
            const ozone19 = data.survey_2019[i]['Ozone Pctl'];
            const ozone22 = data.survey_2022[i]['Ozone Pctl'];
            const PM18 = data.survey_2018[i]['PM2.5 Pctl'];
            const PM19 = data.survey_2019[i]['PM2.5 Pctl'];
            const PM22 = data.survey_2022[i]['PM2.5 Pctl'];
            const pest18 = data.survey_2018[i]['Pesticides Pctl'];
            const pest19 = data.survey_2019[i]['Pesticides Pctl'];
            const pest22 = data.survey_2022[i]['Pesticides Pctl'];
            const poverty18 = data.survey_2018[i]['Poverty Pctl'];
            const poverty19 = data.survey_2019[i]['Poverty Pctl'];
            const poverty22 = data.survey_2022[i]['Poverty Pctl'];
            const pop18 = data.survey_2018[i]['Total Population'];
            const pop19 = data.survey_2019[i]['Total Population'];
            const pop22 = data.survey_2022[i]['Total Population'];
            const traffic18 = data.survey_2018[i]['Traffic Pctl'];
            const traffic19 = data.survey_2019[i]['Traffic Pctl'];
            const traffic22 = data.survey_2022[i]['Traffic Pctl'];
            asthma18sum += asthma18;
            asthma19sum += asthma19;
            asthma22sum += asthma22;
            CD18sum += CD18;
            CD22sum += CD22;
            DPM18sum += DPM18;
            DPM19sum += DPM19;
            DPM22sum += DPM22;
            ozone18sum += ozone18;
            ozone19sum += ozone19;
            ozone22sum += ozone22;
            PM18sum += PM18;
            PM19sum += PM19;
            PM22sum += PM22;
            pest18sum += pest18;
            pest19sum += pest19;
            pest22sum += pest22;
            poverty18sum += poverty18;
            poverty19sum += poverty19;
            poverty22sum += poverty22;
            pop18sum += pop18;
            pop19sum += pop19;
            pop22sum += pop22;
            traffic18sum += traffic18;
            traffic19sum += traffic19;
            traffic22sum += traffic22;
        }

        const asthma18avg = asthma18sum / data18.length;
        const asthma19avg = asthma19sum / data19.length;
        const asthma22avg = asthma22sum / data22.length;
        const CD18avg = CD18sum / data18.length;
        const CD22avg = CD22sum / data22.length;
        const DPM18avg = DPM18sum / data18.length;
        const DPM19avg = DPM19sum / data19.length;
        const DPM22avg = DPM22sum / data22.length;
        const ozone18avg = ozone18sum / data18.length;
        const ozone19avg = ozone19sum / data19.length;
        const ozone22avg = ozone22sum / data22.length;
        const PM18avg = PM18sum / data18.length;
        const PM19avg = PM19sum / data19.length;
        const PM22avg = PM22sum / data22.length;
        const pest18avg = pest18sum / data18.length;
        const pest19avg = pest19sum / data19.length;
        const pest22avg = pest22sum / data22.length;
        const poverty18avg = poverty18sum / data18.length;
        const poverty19avg = poverty19sum / data19.length;
        const poverty22avg = poverty22sum / data22.length;
        const pop18avg = pop18sum / data18.length;
        const pop19avg = pop19sum / data19.length;
        const pop22avg = pop22sum / data22.length;
        const traffic18avg = traffic18sum / data18.length;
        const traffic19avg = traffic19sum / data19.length;
        const traffic22avg = traffic22sum / data22.length;

        var popData = {
            x: [2018, 2019, 2021],
            y: [pop18avg/100, pop19avg/100, pop22avg/100],
            type: 'scatter',
            name: 'Population'
         };
        var asthmaData = {
            x: [2018, 2019, 2021],
            y: [asthma18avg, asthma19avg, asthma22avg],
            type: 'scatter',
            name: 'Asthma Pctl'
        };
        var CDData = {
            x: [2018, 2021],
            y: [CD18avg, CD22avg],
            type: 'scatter',
            name: 'Cardiovascular Disease Pctl'
        };
        var DPMData = {
            x: [2018, 2019, 2021],
            y: [DPM18avg, DPM19avg, DPM22avg],
            type: 'scatter',
            name: 'Diesel Pctl'
        };
        var ozoneData = {
            x: [2018, 2019, 2021],
            y: [ozone18avg, ozone19avg, ozone22avg],
            type: 'scatter',
            name: 'Ozone Pctl'
        };
        var PMData = {
            x: [2018, 2019, 2021],
            y: [PM18avg, PM19avg, PM22avg],
            type: 'scatter',
            name: 'PM2.5 Pctl'
        };
        var pestData = {
            x: [2018, 2019, 2021],
            y: [pest18avg, pest19avg, pest22avg],
            type: 'scatter',
            name: 'Pesticides Pctl'
        };
        var povertyData = {
            x: [2018, 2019, 2021],
            y: [poverty18avg, poverty19avg, poverty22avg],
            type: 'scatter',
            name: 'Poverty Pctl'
        };
        var trafficData = {
            x: [2018, 2019, 2021],
            y: [traffic18avg, traffic19avg, traffic22avg],
            type: 'scatter',
            name: 'Traffic Pctl'
        };


        var datasets = [
            {name: 'Population', values: popData, visible: false},
            {name: 'Ozone Pctl', values: ozoneData, visible: false},
            {name: 'PM2.5 Pctl', values: PMData, visible: false},
            {name: 'Diesel Pctl', values: DPMData, visible: false},
            {name: 'Pesticides Pctl', values: pestData, visible: false},
            {name: 'Traffic Pctl', values: trafficData, visible: false},
            {name: 'Cardiovascular Disease Pctl', values: CDData, visible: false},
            {name: 'Poverty Pctl', values: povertyData, visible: false},
            {name: 'Asthma Pctl', values: asthmaData, visible: true}
        ];

        var data = [asthmaData];
        
        var layout = {
        title: 'Potential Contributors to Asthma',
        showlegend: true,
        height: 300,
        width: 600,
        xaxis: {
            title: 'Year'
        },
        yaxis: {
            title: 'Percentile'
        }};
        
        Plotly.newPlot('chart1', data, layout);
        
        d3.selectAll('.control-panel input[type="checkbox"]').on('change', function() {
            let checkboxValue = d3.select(this).attr('value');
          
            datasets.forEach((dataset) => {
              if (dataset.name === checkboxValue) {
                dataset.visible = this.checked;
              }
            });
            updatePlot();
        });

        function updatePlot() {
            let visibleDatasets = datasets.filter(d => d.visible);

            data=[];

            visibleDatasets.forEach((dataset) => {
              if (dataset.visible) {
                data.push(dataset['values']);
              }
              
            });
            Plotly.newPlot('chart1', data, layout);
          }

        
          resetButton.addEventListener('click', function () {
            data = [asthmaData]
            Plotly.newPlot('chart1', data, layout)
            });

    });


    

}

init()

