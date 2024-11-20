import { ResolveFn } from "@angular/router";
import { LessonDetail } from "../model/lesson-detail";
import { Observable } from "rxjs";
import { inject } from "@angular/core";
import { CoursesService } from "./courses.service";

export const lessonDetailResolver: ResolveFn<LessonDetail> = (
  route,
  state
): Observable<LessonDetail> => {
  //il parametro courseUrl non può essere ricavato in questa rotta, perchè questa è una rotta child
  // il parametro courseUrl è nella rotta padre, per prenderlo si utilizza la proprietà parent della route
  // i dettagli della singola lezione li fetcho tramite metodo loadLessonDetail nel CoursesService. Questo cerca la lezione per courseUrl e seqNo della lesson. Mi restituisce un Observable contenete i dettagli della lesson

  // console.log(route.paramMap.get("lessonSeqNo"));
  // console.log(route.parent.paramMap.get("courseUrl"));

  return inject(CoursesService).loadLessonDetail(
    route.parent.paramMap.get("courseUrl"),
    route.paramMap.get("lessonSeqNo")
  );
};
