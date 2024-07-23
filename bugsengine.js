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
    },
    doAdd: function (theThing) {
      let { theElementList } = this
      theElementList.has(theThing) && this.doAddThing(theThing)
      theElementList.add(theThing, {})
    },
    doPaint: function () {
      this.theElementList.forEach(() => {
        //
      })
    },
  }

  let bug = {
    theName: '',
    theX: 0,
    theY: 0,
    theAngle: 0,
    theDirection: 0,
    theRadius: 8,
    theSpeed: 0,
    theBugHTMLElement: null,
    doCreate: function () {
      let theCanvas = document.querySelector('#hive')
      let theBugHTMLElement = (this.theBugHTMLElement =
        document.createElement('div'))

      let { theName, theX, theY, theAngle } = this

      Object.assign(theBugHTMLElement, {
        className: 'bug',
        title: theName,
        style: `
                 left: ${(this.theX = 300 + 150)}px;
                 top: ${(this.theY = 300 + 150)}px;
                 transform: translate(0px, 0px) rotate(0deg);

                `,
      })

      theCanvas.appendChild(theBugHTMLElement)
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

        theBugHTMLElement.style = `
          transform:
            translateX(${(theX =
              theLeftOrigin + theRadius * doCos(theAngle))}px)
            translateY(${(theY = theTopOrigin + theRadius * doSin(theAngle))}px)
            translateZ(0)
            rotate(${theAngle - theLocalAngle}rad)
          ;          
        `

        theNeedToGo > theCurrentTimeStamp
          ? requestAnimationFrame(doFrame)
          : (1,
            (this.theX = theX),
            (this.theY = theY),
            (this.theAngle = theAngle),
            this.doUpdate())
      }

      requestAnimationFrame(doFrame)
    },
  }

  let Bug = function (theName) {
    this.theName = theName
  }

  Bug.prototype = bug

  let myNewBug = new Bug('first')
  myNewBug.doCreate()
  myNewBug.doUpdate()

  let myNewBug2 = new Bug('second')
  myNewBug2.doCreate()
  myNewBug2.doUpdate()
})()
