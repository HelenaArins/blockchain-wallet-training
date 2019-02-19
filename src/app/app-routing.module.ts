import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SendTransactionComponent } from './send-transaction/send-transaction.component';
import { BalanceComponent } from './balance/balance.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { CanSendGuard } from './can-send.guard';
import { PendingTransactionsComponent } from './pending-transactions/pending-transactions.component';
import { StartComponent } from './start/start.component';

const routes: Routes = [
  { path: 'send-transaction', 
    component: SendTransactionComponent,
    canActivate: [CanSendGuard]
  },
  {path: 'dashboard', component: DashboardComponent},
  {path: 'pending-transactions', component: PendingTransactionsComponent},
  {path: 'start', component: StartComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
