;(() => {
  'use strict'

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
                 transform:
                 translate(
                   ${(bug.theX = 300 + 150)}px
                   , ${(bug.theY = 300 + 150)}px
                 )
                 rotate(${Math.random() * 360}deg)
                `,
      })

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
      let theTotalPath = 2 * Math.PI
      let theStep = theTotalPath / 1000
      let thePrevTimeStamp = document.timeline.currentTime
      let theCurrentAngle = 0
      theDirection = bug.theDirection ^= 1

      let doFrame = (theCurrentTimeStamp) => {
        let theLocalX = Math.cos(theCurrentAngle) * theRadius
        let theLocalY = Math.sin(theCurrentAngle) * theRadius

        theBugHTMLElement.style = `
          transform: translate(
            ${theX + (theDirection ? theLocalX : -theLocalX)}px
            , ${theY + (theDirection ? theLocalY : -theLocalY)}px
          )
          rotate( ${theDirection ? theCurrentAngle : -theCurrentAngle}rad )
        `

        //
        theCurrentAngle += (theCurrentTimeStamp - thePrevTimeStamp) * theStep

        console.log(theCurrentAngle, theTotalPath)

        thePrevTimeStamp = theCurrentTimeStamp

        theCurrentAngle < theTotalPath
          ? requestAnimationFrame(doFrame)
          : bug.doUpdate()
      }
      requestAnimationFrame(doFrame)
    },
  }

  bug.doCreate()
  bug.doUpdate()
  console.log(bug)
})()
