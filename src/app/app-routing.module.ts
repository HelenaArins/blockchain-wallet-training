import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SendTransactionComponent } from './send-transaction/send-transaction.component';
import { BalanceComponent } from './balance/balance.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { CanSendGuard } from './can-send.guard';

const routes: Routes = [
  { path: 'send-transaction', 
    component: SendTransactionComponent,
    canActivate: [CanSendGuard]
  },
  {path: 'dashboard', component: DashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
