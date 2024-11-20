import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { LessonDetail } from "../model/lesson-detail";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Component({
  selector: "lesson",
  templateUrl: "./lesson-detail.component.html",
  styleUrls: ["./lesson-detail.component.css"],
})
export class LessonDetailComponent implements OnInit {
  lesson$: Observable<LessonDetail>;
  lesson: LessonDetail;

  // per navigare ho bisogno del Router, quindi lo inietto
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    // this.route.data.subscribe((val) => console.log(val.lesson));

    // console.log(this.route.snapshot.data.lesson);
    this.lesson = this.route.snapshot.data["lesson"];
  }

  previous(lesson: LessonDetail) {
    // per navigare posso utilizzare diversi metodi
    // navigateByUrl accetta una stringa partendo dalla root
    // this.router.navigateByUrl("");
    // navigate permette invece di inserire valori in maniera simile al routerLink
    // il secondo argomento è un oggetto di configurazione, proprietà relativeTo ci permette di stabilire quale rotta prendere come riferimento per i relative path. Mi riferisco alla rotta padre
    this.router.navigate(["lessons", lesson.seqNo - 1], {
      relativeTo: this.route.parent,
    });
  }

  next(lesson: LessonDetail) {
    this.router.navigate(["lessons", lesson.seqNo + 1], {
      relativeTo: this.route.parent,
    });
  }
}
