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
  let theRandomLimit = theTotalPath / theStep
  //let theNeedToGo = doRandom(theTotalPath / theStep) + thePrevTimeStamp

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

      let { theName, theX, theY, theAngle } = bug

      //Math.random() * 300

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
      } = bug

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

        let theX
        let theY

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

  let Bug = function () {
    //
  }

  Bug.prototype = bug

  bug.doCreate()
  bug.doUpdate()
  //console.log(bug)
})()
