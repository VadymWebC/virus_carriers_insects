;(() => {
  'use strict'

  //helpers
  let doLog = console.log

  let doRandom = (theLimit) => Math.random() * theLimit

  let doSin = Math.sin
  let doCos = Math.cos

  let thePI = Math.PI
  let theTotalPath = 2 * thePI
  let theStep = theTotalPath / 700

  let thePasserByRequestAnimationFrame = {
    _thePrevTimeStamp: 0,
    theSubscribersList: null,

    get theSubscribersList() {
      return this._thePrevTimeStamp
    },

    set theSubscribersList(theTimeStamp) {
      this.theSubscribersList.reduce(
        (theRes, doThing) => (doThing(theRes), theRes),
        theTimeStamp - this._thePrevTimeStamp
      )
      this._thePrevTimeStamp = theTimeStamp
    },

    doCreate: function () {
      //
    },
    doRun: function () {
      let doAnimationFrame = function (theTimeStamp) {
        requestAnimationFrame(doAnimationFrame)
      }.bind(this)

      requestAnimationFrame(doAnimationFrame)
    },
    doSubscribe: function (doThing) {
      this.theSubscribersList.push(doThing)
    },
  }

  let theHTMLVizualizator = {
    theLayout: null,
    theElementList: new Map(),
    doCreate: function () {
      let theLayout = (this.theLayout = document.createElement('div'))
      Object.assign(theLayout, {
        style: `
          width: 100%;
          height: 100%;
          overflow: hidden;
        `,
      })
      document.body.append(theLayout)
    },
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
      //theThing.theX =
      //theLeftOrigin + theRadius * doCos(theAngle)
      //(theThing.theY =
      //theTopOrigin + theRadius * doSin(theAngle))

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
    theSpeed: 0,
    // theBugHTMLElement: null,
    doCreate: function () {
      //let theCanvas = document.querySelector('#hive')
      // let theBugHTMLElement = (this.theBugHTMLElement =
      //   document.createElement('div'))
      // let { theName, theX, theY, theAngle } = this
      //
    },
    doUpdate: function () {
      let {
        theX,
        theY,
        theAngle,
        theDirection,
        theSpeed,
        theRadius,
        theBugHTMLElement,
      } = this

      let theLocalStep = theStep

      let thePrevTimeStamp = document.timeline.currentTime

      let theNeedToGo =
        (doRandom(theTotalPath) + thePI / 2) / theLocalStep + thePrevTimeStamp

      let theLocalAngle = 0

      ;(this.theDirection ^= 1)
        ? (theAngle += thePI)
        : ((theLocalAngle = thePI),
          (theAngle -= thePI),
          (theLocalStep = -theStep))

      let theLeftOrigin = theX - theRadius * doCos(theAngle)
      let theTopOrigin = theY - theRadius * doSin(theAngle)
      //////////////////////////////////////////

      let doFrame = (theCurrentTimeStamp) => {
        theAngle += (theCurrentTimeStamp - thePrevTimeStamp) * theLocalStep

        thePrevTimeStamp = theCurrentTimeStamp

        this.theX = theLeftOrigin + theRadius * doCos(theAngle)
        this.theY = theTopOrigin + theRadius * doSin(theAngle)
        this.theAngle = theAngle
        this.theDisplayAngle = theAngle - theLocalAngle
        //rotate(${theAngle - theLocalAngle}rad)

        // theBugHTMLElement.style = `
        //   transform:
        //     translateX(${(this.theX =
        //       theLeftOrigin + theRadius * doCos(theAngle))}px)
        //     translateY(${(this.theY = theTopOrigin + theRadius * doSin(theAngle))}px)
        //     translateZ(0)
        //     rotate(${theAngle - theLocalAngle}rad)
        //   ;
        // `

        // theNeedToGo > theCurrentTimeStamp
        //   ? requestAnimationFrame(doFrame)
        //   : (1,
        //     (this.theX = theX),
        //     (this.theY = theY),
        //     (this.theAngle = theAngle),
        //     this.doUpdate())
      }

      doFrame(thePrevTimeStamp + 10)
      // requestAnimationFrame(doFrame)
    },
  }

  let Bug = function (theName) {
    this.theName = theName
    this.theX = 400
    this.theY = 400
  }

  Bug.prototype = bug

  theHTMLVizualizator.doCreate()

  let myNewBug = new Bug('first')
  myNewBug.doUpdate()
  theHTMLVizualizator.doAdd(myNewBug)
  theHTMLVizualizator.doPaint()
  // myNewBug.doCreate()

  // let myNewBug2 = new Bug('second')
  // myNewBug2.doUpdate()
})()
