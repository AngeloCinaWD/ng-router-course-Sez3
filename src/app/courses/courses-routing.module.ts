import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { CourseComponent } from "./course/course.component";
import { CourseResolver } from "./services/course.resolver";
import { LessonsListComponent } from "./lessons-list/lessons-list.component";
import { LessonDetailComponent } from "./lesson/lesson-detail.component";

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
  },
  {
    path: ":courseUrl",
    component: CourseComponent,
    // per creare delle rotte figlie di un'altra rotta, utilizzo la property children, che contiene un array di oggetti rotta
    // le child routes vengono renderizzate in un router-outlet posizionato all'interno del template del component della rotta padre, quindi in questo caso all'interno del course.component.html
    children: [
      {
        path: "",
        component: LessonsListComponent,
      },
      {
        path: "lessons/:lessonSeqNo",
        component: LessonDetailComponent,
      },
    ],
    resolve: {
      course: CourseResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [CourseResolver],
})
export class CoursesRoutingModule {}
