import { StyledGraphic, StyledViewProductBtn } from "./PieChart.styles";

export default function PieChart() {
    google.charts.load("current", { packages: ["corechart"] });
    google.charts.setOnLoadCallback(drawChart);
    
    function drawChart() {
        let data = google.visualization.arrayToDataTable([
            ['Task', 'Low item'],
            ['Capacity', 100],
            ['Critical stock level', 9]
        ]);
    
        let options = {
            title: 'Low item:',
            is3D: true,
        };
    
        let chart = new google.visualization.PieChart(document.getElementById('piechart_3d'));
        chart.draw(data, options);
    }

    return (
        <div className="col mt-4">
            <StyledGraphic className="shadow-sm text-center">
                <div className='pie-chart-3d' id="piechart_3d" style={{ width: '100%', height: '250px', borderRadius: '8px' }}></div>
                <StyledViewProductBtn className="btn btn-outline  mb-4 shadow-sm">View</StyledViewProductBtn>
            </StyledGraphic>
        </div>
    )
}