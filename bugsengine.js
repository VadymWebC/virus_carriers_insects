;(() => {
  'use strict'

  //helpers
  let doLog = console.log

  let doRandom = (theLimit) => Math.random() * theLimit

  let doSin = Math.sin
  let doCos = Math.cos

  let bug = {
    theName: '',
    theX: 0,
    theY: 0,
    theAngle: 0,
    theDirection: 1,
    theRadius: 30,
    theSpeed: 0,
    theBugHTMLElement: null,
    doCreate: () => {
      let theCanvas = document.querySelector('#hive')
      let theBugHTMLElement = (bug.theBugHTMLElement =
        document.createElement('div'))

      let { theName, theX, theY, theAngle } = bug

      //Math.random() * 300

      Object.assign(theBugHTMLElement, {
        className: 'bug',
        title: theName,
        style: `
                 left: ${(bug.theX = 300 + 150)}px;
                 top: ${(bug.theY = 300 + 150)}px;
                 transform:
                 translate(
                   ${(bug.theX = 300 + 150)}px
                   , ${(bug.theY = 300 + 150)}px
                 )

                `,
      })

      //rotate(${Math.random() * 360}deg)

      theCanvas.appendChild(theBugHTMLElement)
      //
    },
    doUpdate: () => {
      let {
        theX,
        theY,
        theAngle,
        theDirection,
        theSpeed,
        theRadius,
        theBugHTMLElement,
      } = bug
      let thePI = Math.PI
      let theTotalPath = 2 * thePI
      let theStep = theTotalPath / 1000

      let thePrevTimeStamp = document.timeline.currentTime

      //let theCurrentAngle = 0

      //theDirection && ((theCurrentAngle = thePI), (theStep = -theStep))

      //////////////////////////////////////////
      //this.theTimeTpPassDistance = (doRandom(340 * theSpeed) * 20)

      let theNeedToGo = doRandom(theTotalPath) / theStep + thePrevTimeStamp

      let theLocalAngle = thePI / 2

      //this.theFaza = theFaza ^ 1
      ;(bug.theDirection = theDirection ^= 1)
        ? (bug.theAngle = theAngle -= thePI)
        : (bug.theAngle = ((theLocalAngle = 3 * thePI), (theAngle += thePI)))

      // this.theLocalAngle = {
      //   theFaza
      //   ? (
      //     ( this.theDirection = (theDirection += -180) )
      //     , 90
      //   )
      //   : (
      //     ( this.theDirection = (theDirection += 180) )
      //     , 270
      //   )
      // }

      let theLeftOrigin = theX - theRadius * doCos(theAngle)
      let theTopOrigin = theY - theRadius * doSin(theAngle)
      //////////////////////////////////////////

      let doFrame = (theCurrentTimeStamp) => {
        //console.log(thePrevTimeStamp, theCurrentTimeStamp, theNeedToGo)

        theAngle +=
          (theCurrentTimeStamp - thePrevTimeStamp) *
          (theDirection ? -theStep : theStep)

        thePrevTimeStamp = theCurrentTimeStamp

        // let theLocalX = Math.cos(theCurrentAngle) * theRadius
        // let theLocalY = Math.sin(theCurrentAngle) * theRadius
        let theX = theRadius * doCos(theAngle)
        let theY = theRadius * doSin(theAngle)

        //${(bug.theX = 300 + 150)}px;
        //${(bug.theY = 300 + 150)}px;
        theBugHTMLElement.style = `
          transform:
            translateX(${theLeftOrigin + theX}px)
            translateY(${theLeftOrigin + theY}px)
            translateZ(0)
            rotate(${theLocalAngle - theAngle}rad)
          ;          
        `

        //rotate( ${theDirection ? theCurrentAngle : -theCurrentAngle}rad )

        // theCurrentAngle += (theCurrentTimeStamp - thePrevTimeStamp) * theStep
        // thePrevTimeStamp = theCurrentTimeStamp

        //theNeedToGo
        //theCurrentAngle < theTotalPath

        //
        theNeedToGo > theCurrentTimeStamp
          ? (1, requestAnimationFrame(doFrame))
          : (1,
            (bug.theX = theX + theLeftOrigin),
            (bug.theY = theY + theTopOrigin),
            bug.doUpdate())
      }

      requestAnimationFrame(doFrame)
    },
  }

  bug.doCreate()
  bug.doUpdate()
  //console.log(bug)
})()
