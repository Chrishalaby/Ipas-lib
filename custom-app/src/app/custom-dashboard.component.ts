import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  BaseCardComponent,
  IPaaSCoreService,
  SharedCardComponent,
} from '@ipas/core';

@Component({
  selector: 'app-custom-dashboard',
  standalone: true,
  imports: [CommonModule, SharedCardComponent],
  template: `
    <div class="dashboard">
      <h1>Custom App Dashboard</h1>
      <p>This app extends iPaaS Core library components</p>

      <div class="info-section">
        <h3>Base Component Info:</h3>
        <p>Title: {{ title }}</p>
        <p>Formatted: {{ getFormattedTitle() }}</p>
        <button (click)="updateTitle()">Update Title</button>
      </div>

      <div class="cards-section">
        <h3>Using iPaaS Core Shared Components:</h3>

        <ipas-card title="Customer Data">
          <p>Customer integration running smoothly</p>
          <p>Last sync: {{ systemInfo.timestamp | date : 'short' }}</p>
        </ipas-card>

        <ipas-card title="Order Processing">
          <p>Processing orders from multiple sources</p>
          <p>Environment: {{ systemInfo.environment }}</p>
        </ipas-card>

        <ipas-card title="Analytics Pipeline">
          <p>Real-time data analytics active</p>
          <p>Version: {{ systemInfo.version }}</p>
        </ipas-card>
      </div>

      <div class="demo-section">
        <h3>Demo: Process Data with iPaaS Core</h3>
        <button (click)="processData()">Process Sample Data</button>
        <pre *ngIf="processedResult">{{ processedResult | json }}</pre>
      </div>
    </div>
  `,
  styles: [
    `
      .dashboard {
        padding: 20px;
        max-width: 800px;
        margin: 0 auto;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
          sans-serif;
      }

      .info-section,
      .cards-section,
      .demo-section {
        margin: 20px 0;
        padding: 20px;
        border: 1px solid #e0e0e0;
        border-radius: 8px;
        background: #f9f9f9;
      }

      .info-section h3,
      .cards-section h3,
      .demo-section h3 {
        margin-top: 0;
        color: #333;
      }

      button {
        background: #007acc;
        color: white;
        border: none;
        padding: 10px 16px;
        border-radius: 4px;
        cursor: pointer;
        margin: 5px;
      }

      button:hover {
        background: #005999;
      }

      pre {
        background: #f0f0f0;
        padding: 10px;
        border-radius: 4px;
        overflow-x: auto;
      }
    `,
  ],
})
export class CustomDashboardComponent extends BaseCardComponent {
  systemInfo: any;
  processedResult: any = null;

  constructor(private ipaasService: IPaaSCoreService) {
    super();
    this.title = 'Custom Dashboard';
    this.systemInfo = this.ipaasService.getSystemInfo();
  }

  updateTitle() {
    this.title = `Updated at ${new Date().toLocaleTimeString()}`;
    this.logCardAction('title updated');
  }

  processData() {
    const sampleData = {
      customerId: '12345',
      orderTotal: 299.99,
      items: ['Widget A', 'Widget B'],
    };

    this.processedResult = this.ipaasService.processData(sampleData);
    this.logCardAction('data processed');
  }
}
