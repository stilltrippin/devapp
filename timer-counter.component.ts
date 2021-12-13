import { Component, OnInit, OnDestroy } from '@angular/core';
import {Subscription, interval, Subject, timer, Observable, takeUntil, takeWhile} from 'rxjs';

@Component({
  selector: 'app-timer',
  templateUrl: './timer-counter.component.html',
  styleUrls: ['./timer-counter.component.css']
})
export class TimerCounterComponent implements OnInit, OnDestroy {

  private firstObsSubscription: Subscription;
  hsDiff: number;
  minsDiff: number;
  secsDiff: number;

  $timeCounter: Observable<number> = new Subject();

  hsStart: number;
  minsStart: number;
  secsStart: number;

  runningMode = false;



  dateNow = new Date();

  constructor() {
    this.hsStart = new Date().getHours();
    this.minsStart = new Date().getMinutes();
    this.secsStart = new Date().getSeconds();
    this.hsDiff = 0;
    this.secsDiff = 0;
    this.minsDiff = 0;
  }

  ngOnInit() {
    this.$timeCounter = interval(1000);
    this.firstObsSubscription = this.$timeCounter.subscribe(
      () => {
        if(this.runningMode) {
          this.hsDiff = Math.floor(this.secsDiff/3600) ;
          this.minsDiff = Math.floor(this.secsDiff/60);
          this.secsDiff ++;
        }
      }
    );
  }

  ngOnDestroy() {
    this.firstObsSubscription.unsubscribe();
  }

  handleStart() {
    //handles start/stop
    if(this.runningMode) {
      this.hsDiff = 0;
      this.secsDiff = 0;
      this.minsDiff = 0;
    }
    this.runningMode = !(this.runningMode);

    console.log(this.runningMode)

  }

  handleWait() {
    this.runningMode = !(this.runningMode);
  }

  handleReset() {
    this.hsDiff = 0;
    this.secsDiff = 0;
    this.minsDiff = 0;
  }
}
