import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from "@angular/router";
import { LessonSummary } from "../model/lesson-summary";
import { Observable } from "rxjs";
import { CoursesService } from "./courses.service";
import { inject } from "@angular/core";

export const lessonsResolver: ResolveFn<LessonSummary[]> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<LessonSummary[]> => {
  // chiamo il metodo loadAllCourseLessonsSummary nel CoursesService che mi restituisce un Observable con un Array contenente tutte le lezioni relative ad un determinato course, identificato tramite courseUrl

  return inject(CoursesService).loadAllCourseLessonsSummary(
    route.paramMap.get("courseUrl")
  );
};
