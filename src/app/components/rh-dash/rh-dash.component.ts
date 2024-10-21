import { Component } from '@angular/core';

@Component({
  selector: 'app-rh-dash',
  templateUrl: './rh-dash.component.html',
  styleUrl: './rh-dash.component.css'
})
export class RhDashComponent {
  public chartData = [
    { data: [10, 20, 30, 40], label: 'Series A' },
    { data: [20, 30, 40, 50], label: 'Series B' }
  ];

  // Labels du graphique
  public chartLabels = ['January', 'February', 'March', 'April'];

  // Options de configuration du graphique
  public chartOptions = {
    responsive: true,
  };

  // Type de graphique (line, bar, pie, etc.)
  public chartType: string = 'line';
}
