;(() => {
  'use strict'

  //helpers
  let doLog = console.log

  let doRandom = (theLimit) => Math.random() * theLimit

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
      
      let theCurrentAngle = 0

      
      theDirection && ((theCurrentAngle = thePI), (theStep = -theStep))



      //////////////////////////////////////////
      //this.theTimeTpPassDistance = (doRandom(340 * theSpeed) * 20)

      let theNeedToGo = doRandom(theTotalPath) * theStep + thePrevTimeStamp

      //this.theFaza = theFaza ^ 1
      (bug.theDirection = theDirection ^= 1)
        ? theAngle -= thePI
        : theAngle += thePI

      this.theLocalAngle = {
        theFaza
        ? (
          ( this.theDirection = (theDirection += -180) )
          , 90
        )
        : (
          ( this.theDirection = (theDirection += 180) )
          , 270
        )
      }

      this.theLeftOrigin = this.theX - (theRadius * doSin(theDirection))
      this.theTopOrigin = this.theY - (theRadius * doCos(theDirection))
      //////////////////////////////////////////




      let doFrame = (theCurrentTimeStamp) => {
        console.log(thePrevTimeStamp, theCurrentTimeStamp, theNeedToGo)

        let theLocalX = Math.cos(theCurrentAngle) * theRadius
        let theLocalY = Math.sin(theCurrentAngle) * theRadius

        //${(bug.theX = 300 + 150)}px;
        //${(bug.theY = 300 + 150)}px;
        theBugHTMLElement.style = `
          left: ${bug.theX}px;
          top: ${bug.theY}px;
          transform: translate(
            ${theDirection ? theLocalX : theLocalX}px
            , ${theDirection ? theLocalY : theLocalY}px
          )
          
        `

        //rotate( ${theDirection ? theCurrentAngle : -theCurrentAngle}rad )

        theCurrentAngle += (theCurrentTimeStamp - thePrevTimeStamp) * theStep
        thePrevTimeStamp = theCurrentTimeStamp

        //theNeedToGo
        //theCurrentAngle < theTotalPath

        //
        theNeedToGo > theCurrentTimeStamp
          ? (1, requestAnimationFrame(doFrame))
          : (1, (bug.theX += 2 * theRadius), bug.doUpdate())
      }

      requestAnimationFrame(doFrame)
    },
  }

  bug.doCreate()
  bug.doUpdate()
  //console.log(bug)
})()
