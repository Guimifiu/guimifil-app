import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ViewController, ModalController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Chart } from 'chart.js';

import { LoadingService } from '../../providers/loading-service';
import { FuelSupply } from '../../models/fuel-supply'
import { SuppliesChartsService } from '../../providers/supplies-charts-service';
import { UserData } from '../../providers/user-data';
import { ToastService } from '../../providers/toast-service';
import { FuelSupplyDetailsPage } from '../fuel-supply-details/fuel-supply-details';
import { Form } from '../../helpers/form';
import { FormErrorMessages } from '../../validators/form-error-messages';


@Component({
  selector: 'supplies-charts',
  templateUrl: 'supplies-charts.html',
  providers: [ 
    SuppliesChartsService,
    LoadingService,
    ToastService
   ]
})
export class SuppliesChartsPage extends Form{

  @ViewChild('lineCanvas') lineCanvas;
  lineChart: any;

  labels = [];
  gasData = [];
  dieselData = [];
  alcoholData = [];
  chartTypes = ["Mensal", "Semanal"];
  chartForm: FormGroup;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public loadingService: LoadingService,
    public suppliesChartsService: SuppliesChartsService,
    public userData: UserData,
    public toastService: ToastService,
    public modalCtrl: ModalController,
    public formBuilder: FormBuilder,
    
  ) {
    super(toastService);
    this.buildForm();
    this.setUpForm(this.chartForm);
  }

  ionViewDidLoad() {
    this.getChartData();
  }

  plotMonthlyChart() {
    this.lineChart = new Chart(this.lineCanvas.nativeElement, {

      type: 'line',
      data: {
        labels: this.labels,
        datasets: [
          {
              label: "Álcool",
              fill: false,
              lineTension: 0.1,
              backgroundColor: "rgba(75,192,192,0.4)",
              borderColor: "rgba(75,192,192,1)",
              borderCapStyle: 'butt',
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: 'miter',
              pointBorderColor: "rgba(75,192,192,1)",
              pointBackgroundColor: "#fff",
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: "rgba(75,192,192,1)",
              pointHoverBorderColor: "rgba(220,220,220,1)",
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: this.alcoholData,
              spanGaps: false,
          },
          {
            label: "Gasolina",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(192,75,192,0.4)",
            borderColor: "rgba(192,75,192,1)",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgba(192,75,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(192,75,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: this.gasData,
            spanGaps: false,
          },
          {
            label: "Diesel",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(192,192,75,0.4)",
            borderColor: "rgba(192,192,75,1)",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgba(192,192,75,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(192,192,75,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: this.dieselData,
            spanGaps: false,
          }
        ]
      }

    });
  }

  buildForm() {
    this.chartForm = this.formBuilder.group({
      chartTypes: [this.chartTypes[0], Validators.compose([
        Validators.required,
      ])],
    });
  }

  setValidationMessages() {
    this.validationMessages = {
      'chartTypes': {
        'required': FormErrorMessages.required('Tipo de gráfico'),
      }
    }
  }

  getChartData() {
    this.loadingService.showLoading('Carregando...');
      this.suppliesChartsService.monthlyChart(this.userData.currentUser)
      .then(chartData => {
        this.labels = chartData['labels'];
        this.gasData = chartData['gas_data'];
        this.alcoholData = chartData['alcohol_data'];
        this.dieselData = chartData['diesel_data'];
        this.plotMonthlyChart();
        
      })
      .catch((error) => this.toastService.presentToast(error))
      .then(() => this.loadingService.dismissLoading());
  }
  

  onSubmit() {
  } 


}
