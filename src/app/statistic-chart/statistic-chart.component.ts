import {Component, OnInit, ViewChild} from '@angular/core';
import {
  ApexChart,
  ApexAxisChartSeries,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexLegend
} from "ng-apexcharts";
import data from '../../../db.json';
import {Statistik} from '../../../api/statistik';
import {Kanton} from '../../../api/kanton';
import {KurzArbeitVoranmeldung} from '../../../api/kurzArbeitVoranmeldung';

type ApexXAxis = {
  type?: "category" | "datetime" | "numeric";
  categories?: any;
  labels?: {
    style?: {
      colors?: string | string[];
      fontSize?: string;
    };
  };
};

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  colors: string[];
  legend: ApexLegend;
};

@Component({
  selector: 'app-statistic-chart',
  templateUrl: './statistic-chart.component.html',
  styleUrls: ['./statistic-chart.component.scss']
})
export class StatisticChartComponent implements OnInit {

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  public statistikData:Statistik[] = data['statistik'];

  constructor() {
    console.log(this.statistikData.map(s => s.kanton))


    this.chartOptions = {
      series: [
        {
          name: "distibuted",
          data: [...this.statistikData.filter(s => s.id > 0).map(s => s.voranmeldungen)]
        }
      ],
      chart: {
        height: 350,
        type: "bar",
        events: {
          click: function(chart, w, e) {
            // console.log(chart, w, e)
          }
        }
      },
      colors: [
        "#008FFB",
        "#00E396",
        "#FEB019",
        "#FF4560",
        "#775DD0",
        "#546E7A",
        "#26a69a",
        "#D10CE8"
      ],
      plotOptions: {
        bar: {
          columnWidth: "45%",
          distributed: true
        }
      },
      dataLabels: {
        enabled: false
      },
      legend: {
        show: false
      },
      xaxis: {
        categories: [... this.statistikData.filter(s => s.id > 0).map(s => s.kanton)
        ],
        labels: {
          style: {
            colors: [
            ],
            fontSize: "12px"
          }
        }
      }
    };
  }


  ngOnInit() {
  }

}
