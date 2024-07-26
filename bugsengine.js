;(() => {
  'use strict'

  //helpers
  let doLog = console.log

  let doRand = Math.random
  let doRandom = (theLimit) => doRand() * theLimit

  let doSin = Math.sin
  let doCos = Math.cos

  let thePI = Math.PI
  let theTotalPath = 2 * thePI
  let theStep = theTotalPath / 700

  let PasserByRequestAnimationFrame = function () {
    ;(this._thePrevTimeStamp = document.timeline.currentTime),
      (this.theSubscribersList = []),
      this.doRun()
  }

  PasserByRequestAnimationFrame.prototype = {
    doRun: function () {
      let doAnimationFrame = function (theTimeStamp) {
        this.thePrevTimeStamp = theTimeStamp
        requestAnimationFrame(doAnimationFrame)
      }.bind(this)

      requestAnimationFrame(doAnimationFrame)
    },
    doSubscribe: function (doThing) {
      this.theSubscribersList.push(doThing)
    },

    get thePrevTimeStamp() {
      return this._thePrevTimeStamp
    },

    set thePrevTimeStamp(theTimeStamp) {
      this.theSubscribersList.reduce(
        (theRes, doThing) => (doThing(theRes), theRes),
        theTimeStamp - this._thePrevTimeStamp
      )
      this._thePrevTimeStamp = theTimeStamp
    },
  }

  let HTMLVizualizator = function () {
    let theLayout = (this.theLayout = document.createElement('div'))
    Object.assign(theLayout, {
      style: `
          width: 100%;
          height: 100%;
          overflow: hidden;
        `,
    })
    document.body.append(theLayout)
  }

  HTMLVizualizator.prototype = {
    theLayout: null,
    theElementList: new Map(),

    doAddThing: function (theThing) {
      let theThingHTMLElement = document.createElement('div')
      //
      Object.assign(theThingHTMLElement, {
        className: 'bug',
        title: theThing.theName,
        style: `
                 left: ${theThing.theX}px;
                 top: ${theThing.theY}px;
                 transform: translate(0px, 0px) rotate(0deg);

                `,
      })

      this.theLayout.appendChild(theThingHTMLElement)
      return theThingHTMLElement
    },
    doAdd: function (theThing) {
      let { theElementList } = this
      theElementList.has(theThing) ||
        theElementList.set(theThing, this.doAddThing(theThing))
      //
    },
    doPaint: function () {
      this.theElementList.forEach((theThingHTMLElement, theThing) => {
        theThingHTMLElement.style = `
          transform:
            translateX(${theThing.theX}px)
            translateY(${theThing.theY}px)
            translateZ(0)
            rotate(${theThing.theDisplayAngle}rad)
          ;          
        `
      })
    },
  }

  let bug = {
    theName: '',
    theX: 0,
    theY: 0,
    theAngle: 0,
    theDisplayAngle: 0,
    theDirection: 0,
    theRadius: 8,
    theNeedToGo: 0,
    theLeftOrigin: 0,
    theTopOrigin: 0,

    doCreate: function () {},
    doUpdate: function () {
      let { theRadius, theAngle } = this
      let thePI = Math.PI
      this.theNeedToGo = (doRandom(theTotalPath) + thePI / 2) / theStep

      //////////////////////////////////////////
      this.theLeftOrigin = this.theX - theRadius * doCos(theAngle)
      this.theTopOrigin = this.theY - theRadius * doSin(theAngle)
    },
    doFrame: function (thePassedTimeStamp) {
      let { theRadius, theAngle, theDirection, theNeedToGo } = this

      let theLocalStep, theLocalAngle
      theDirection
        ? ((theLocalAngle = 0), (theLocalStep = theStep))
        : ((theLocalAngle = thePI), (theLocalStep = -theStep))

      this.theAngle = theAngle += thePassedTimeStamp * theLocalStep

      this.theX = this.theLeftOrigin + theRadius * doCos(theAngle)
      this.theY = this.theTopOrigin + theRadius * doSin(theAngle)
      this.theDisplayAngle = theAngle - theLocalAngle
      ;(this.theNeedToGo -= thePassedTimeStamp) < 0 &&
        ((this.theAngle += (this.theDirection ^= 1) ? thePI : -thePI),
        this.doUpdate())
    },
  }

  let Bug = function (theName) {
    this.theName = theName
    this.theX = 400
    this.theY = 400
    this.doUpdate()
  }

  Bug.prototype = bug

  // main
  let theHTMLVizualizator = new HTMLVizualizator()

  let thePasserByRequestAnimationFrame = new PasserByRequestAnimationFrame()

  thePasserByRequestAnimationFrame.doSubscribe(() => {
    theHTMLVizualizator.doPaint()
  })
  //
  ;[
    'Eesa Chambers',
    'Tariq Barber',
    'Eileen Strickland',
    'Zachariah Moore',
    'Judy Harvey',
    'Charlotte Grimes',
    'Danielle Buck',
    'Ria Gillespie',
    'Maisie Patton',
    'Erin Massey',
    'Lucia Morrow',
    'Arianna Tapia',
    'Carl Fox',
    'Dean Howard',
    'Leanne Hammond',
    'Kieron Pruitt',
    'Imogen Fields',
    'Noor Townsend',
    'Rowan Holt',
    'Keiran Hudson',
    'Edmund Cotton',
    "Tyrell O'Brien",
    'Sid Villegas',
    'Elissa Payne',
    'Arabella Meza',
    'Cohen Bradley',
    'Gary Herrera',
    'Daniela Higgins',
    'Renee Mitchell',
    'Susannah Carrillo',
    'Keelan Wilson',
    'Sasha Robbins',
    'Cheryl Dyer',
    'Lacey Richards',
    'Ella-Louise Oneal',
    'Luqman Johnston',
    'John Bailey',
    'Keenan Palmer',
    'Keziah Scott',
    'India Alexander',
    'Reggie Henderson',
    'Karol Connolly',
    'Jack Hilton',
    'Chiara Glenn',
    'Kieran Vazquez',
    'Deacon Watts',
    'Lina House',
    'Cara Newton',
    'Ayla Lynn',
    'Stasy Hermiona',
  ].forEach((theName) => {
    let theBug = new Bug(theName)
    theHTMLVizualizator.doAdd(theBug)
    thePasserByRequestAnimationFrame.doSubscribe(theBug.doFrame.bind(theBug))
  })
})()
