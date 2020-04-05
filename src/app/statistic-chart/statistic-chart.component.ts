import {Component, Input, OnInit, ViewChild} from '@angular/core';
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
import {formatDate} from '@angular/common';

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
  @ViewChild("chart2") chart2: ChartComponent;
  public chartOptions2: Partial<ChartOptions>;

  @Input()
  public statistikData:Statistik[]

  constructor() {
  }


  ngOnInit() {

    this.chartOptions = {
      series: [
        {
          name: "Anmeldungen",
          data: this.statistikData.filter(s => s.id > 0).map(s => s.voranmeldungen)
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
        categories: this.statistikData.filter(s => s.id > 0).map(s => s.kanton),
        labels: {
          style: {
            colors: [
            ],
            fontSize: "12px"
          }
        }
      },
      yaxis:
        {
          title: {
            text: "Anzahl Anträge",
            style: {
              color: "#008FFB"
            }
          }
        },
    };
    this.chartOptions2 = {
      series: [
        {
          name: "Anmeldungen",
          data: Object.values<number>(this.statistikData.filter(s => s.id == 0)[0].perDay)
        }
      ],
      chart: {
        height: 350,
        type: "line",
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
        categories: Object.keys(this.statistikData.filter(s => s.id == 0)[0].perDay),
        labels: {
          style: {
            colors: [
            ],
            fontSize: "12px"
          }
        }
      },yaxis:
        {
          title: {
            text: "Anzahl Anträge",
            style: {
              color: "#008FFB"
            }
          },
        }
    };
  }

  getSeries(c: any) {
    return [
      {
        name: "distibuted",
        data: c
      }
    ];
  }
}
