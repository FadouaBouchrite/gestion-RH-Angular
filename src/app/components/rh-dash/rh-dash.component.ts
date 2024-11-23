import { Component } from '@angular/core';
import { ChartType, ChartData } from 'chart.js';
import { UserService } from '../../services/user.service';
import { AbsenceService } from '../../services/absence.service';
import { StorageService } from '../../storage.service';
@Component({
  selector: 'app-rh-dash',
  templateUrl: './rh-dash.component.html',
  styleUrls: ['./rh-dash.component.css']
})
export class RhDashComponent {
  nbrRhs!: number;
  nbrEmpl!: number;
  nbrFy: number = 0;  // Initialiser à 0 pour éviter des erreurs
  nbrSy: number = 0;
  nbrTy: number = 0;
  nbrFty: number = 0;
  token: string | null = '';
  
  // Compteur pour suivre les données d'absence récupérées
  private absencesFetchedCount: number = 0;

  constructor(private userService: UserService, private absService: AbsenceService, private storageService: StorageService) {}

  ngOnInit(): void {
    this.token = this.storageService.getItem("token");
    if (this.token) {
      this.calculeNbrRh(this.token);
      this.claculeNbrEmpl(this.token);
      this.calculeAbsFy(this.token);
      this.calculeAbsSy(this.token);
      this.calculeAbsTy(this.token);
      this.calculeAbsFty(this.token);
    }
  }

  claculeNbrEmpl(token: string) {
    if (token) {
      this.userService.getEmplNbr(token).subscribe({
        next: (response: any) => {
          this.nbrEmpl = response;
          this.updatePieChartData(); // Mettre à jour les données du pie chart
        },
        error: (err) => {
          console.error(err);
        }
      });
    }
  }

  calculeNbrRh(token: string) {
    if (token) {
      this.userService.getRhNbr(token).subscribe({
        next: (response: any) => {
          this.nbrRhs = response;
          this.updatePieChartData(); // Mettre à jour les données du pie chart
        },
        error: (err) => {
          console.error(err);
        }
      });
    }
  }

  calculeAbsFy(token: string) {
    if (token) {
      this.absService.getFy(token).subscribe({
        next: (response: any) => {
          this.nbrFy = response;
          this.checkIfAllAbsencesFetched(); // Vérifier si toutes les absences sont récupérées
        },
        error: (err) => {
          console.error(err);
        }
      });
    }
  }

  calculeAbsSy(token: string) {
    if (token) {
      this.absService.getSy(token).subscribe({
        next: (response: any) => {
          this.nbrSy = response;
          this.checkIfAllAbsencesFetched(); // Vérifier si toutes les absences sont récupérées
        },
        error: (err) => {
          console.error(err);
        }
      });
    }
  }

  calculeAbsTy(token: string) {
    if (token) {
      this.absService.getTy(token).subscribe({
        next: (response: any) => {
          this.nbrTy = response;
          this.checkIfAllAbsencesFetched(); // Vérifier si toutes les absences sont récupérées
        },
        error: (err) => {
          console.error(err);
        }
      });
    }
  }

  calculeAbsFty(token: string) {
    if (token) {
      this.absService.getFty(token).subscribe({
        next: (response: any) => {
          this.nbrFty = response;
          this.checkIfAllAbsencesFetched(); // Vérifier si toutes les absences sont récupérées
        },
        error: (err) => {
          console.error(err);
        }
      });
    }
  }

  // Vérifier si toutes les absences ont été récupérées et mettre à jour le Bar Chart
  private checkIfAllAbsencesFetched() {
    this.absencesFetchedCount++;
    if (this.absencesFetchedCount === 4) { // Ajustez si vous avez d'autres absences
      this.updateBarChartData(); // Mettre à jour les données du bar chart
    }
  }

  // Méthode pour mettre à jour les données du Bar Chart
  updateBarChartData() {
    this.barChartData = {
      labels: ['2021', '2022', '2023', '2024'],
      datasets: [
        { data: [this.nbrFy, this.nbrSy, this.nbrTy, this.nbrFty], label: 'Série A' }
      ]
    };
  }

  // Méthode pour mettre à jour les données du Pie Chart
  updatePieChartData() {
    if (this.nbrRhs !== undefined && this.nbrEmpl !== undefined) {
      const total = this.nbrRhs + this.nbrEmpl;
      this.pieChartData = {
        labels: ['RHs', 'Employés'],
        datasets: [
          { data: [(this.nbrRhs / total) * 100, (this.nbrEmpl / total) * 100], label: 'Série B' }
        ]
      };
    }
  }

  // Type de graphiques
  public barChartType: ChartType = 'bar';
  public pieChartType: ChartType = 'pie';

  // Données pour le Bar Chart
  public barChartData: ChartData<'bar'> = {
    labels: ['2021', '2022', '2023', '2024'],
    datasets: [
      { data: [this.nbrFy, this.nbrSy, this.nbrTy, this.nbrFty], label: 'Série A' }
    ]
  };

  // Données initiales vides pour le Pie Chart, mises à jour dynamiquement
  public pieChartData: ChartData<'pie'> = {
    labels: ['RHs', 'Employés'],
    datasets: [
      { data: [], label: 'Série B' }
    ]
  };

  // Options de configuration des graphiques
  public chartOptions = {
    responsive: true,
  };
}
