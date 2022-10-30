import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from "./pages/main-page/main-page.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'main',
    pathMatch: "full"
  },
  {
    path: '**',
    redirectTo: 'main'
  },
  {
    path: "main",
    component: MainPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
