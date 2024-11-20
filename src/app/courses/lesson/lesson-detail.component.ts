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
  // lesson: LessonDetail;

  // per navigare ho bisogno del Router, quindi lo inietto
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    // console.log(this.route.snapshot.data.lesson);

    // ho problemi con questo modo di assegnazione dati alla proprietà lesson
    // this.lesson = this.route.snapshot.data["lesson"];

    // il componente viene instanziato una sola volta, quando chiamo i metodi next e previous io devo aggiornarne il contenuto
    // prendendo i dati con route.snapshot è come se io avessi un'istantanea dei dati e questi rimarranno sempre gli stessi, cioè la lesson rimane sempre quella salvata al momento della creazione del componente
    // questo succede ogni volta che con la navigazione rivado sempre allo stesso componente, da un componente navigo verso se stesso, non creo una nuova instance del component
    // per far aggiornare i dati posso utizzare un observable, l'observable data dell'oggetto route

    // this.route.data.subscribe((val) => (this.lesson = val.lesson));

    // se usassi il subscribe avrei un problema per passarlo all'html ed utilizzare il pipe async, perchè questo fa la sottoscrizione lui, quindi utilizzo il pipe ed il metodo map in modo da avere un observable che restituisce un oggetto LessonDetail
    this.lesson$ = this.route.data.pipe(map((val) => val.lesson));

    // il router resolver dà come risultato un observable che emette un valore
    // lo snapshot è il metodo più veloce e conveniente per prendere il primo valore emesso quando il componente viene instanziato la prima volta con quella rotta e quindi ha il primo risultato emesso dal resolver
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
