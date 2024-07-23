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
    theDirection: 0,
    theRadius: 8,
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
                 transform: translate(0px, 0px) rotate(0deg);

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
      let theStep = theTotalPath / 700

      let thePrevTimeStamp = document.timeline.currentTime

      let theNeedToGo = doRandom(theTotalPath) / theStep + thePrevTimeStamp

      let theLocalAngle = 0

      ;(bug.theDirection = theDirection ^= 1)
        ? (theAngle += thePI)
        : ((theLocalAngle = thePI), (theAngle -= thePI))

      let theLeftOrigin = theX - theRadius * doCos(theAngle)
      let theTopOrigin = theY - theRadius * doSin(theAngle)
      //////////////////////////////////////////

      let doFrame = (theCurrentTimeStamp) => {
        //console.log(thePrevTimeStamp, theCurrentTimeStamp, theNeedToGo)

        theAngle +=
          (theCurrentTimeStamp - thePrevTimeStamp) *
          (theDirection ? theStep : -theStep)

        thePrevTimeStamp = theCurrentTimeStamp

        // let theLocalX = Math.cos(theCurrentAngle) * theRadius
        // let theLocalY = Math.sin(theCurrentAngle) * theRadius
        let theX
        let theY

        //${(bug.theX = 300 + 150)}px;
        //${(bug.theY = 300 + 150)}px;
        theBugHTMLElement.style = `
          transform:
            translateX(${(theX =
              theLeftOrigin + theRadius * doCos(theAngle))}px)
            translateY(${(theY = theTopOrigin + theRadius * doSin(theAngle))}px)
            translateZ(0)
            rotate(${theAngle - theLocalAngle}rad)
          ;          
        `

        //rotate( ${theDirection ? theCurrentAngle : -theCurrentAngle}rad )

        // theCurrentAngle += (theCurrentTimeStamp - thePrevTimeStamp) * theStep
        // thePrevTimeStamp = theCurrentTimeStamp

        //theNeedToGo
        //theCurrentAngle < theTotalPath

        bug.theAngle = theAngle
        //
        theNeedToGo > theCurrentTimeStamp
          ? (1, requestAnimationFrame(doFrame))
          : (1, (bug.theX = theX), (bug.theY = theY), bug.doUpdate())
      }

      requestAnimationFrame(doFrame)
    },
  }

  bug.doCreate()
  bug.doUpdate()
  //console.log(bug)
})()
