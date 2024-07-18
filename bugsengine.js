;(() => {
  'use strict'

  let bug = {
    theName: '',
    theX: 0,
    theY: 0,
    theDirection: 0,
    theRadius: 30,
    theSpeed: 0,
    theBugHTMLElement: null,
    doCreate: () => {
      let theCanvas = document.querySelector('#hive')
      let theBugHTMLElement = (bug.theBugHTMLElement =
        document.createElement('div'))

      let { theName, theX, theY, theDirection } = bug

      Object.assign(theBugHTMLElement, {
        className: 'bug',
        title: theName,
        style: `                 
                 transform:
                 translate(
                   ${(bug.theX = Math.random() * 300 + 50)}px
                   , ${(bug.theY = Math.random() * 300 + 50)}px
                 )
                 rotate(${Math.random() * 360}deg)
                `,
      })

      theCanvas.appendChild(theBugHTMLElement)
      //
    },
    doUpdate: () => {
      let { theX, theY, theDirection, theSpeed, theRadius, theBugHTMLElement } =
        bug
      let theTotalPath = 2 * Math.PI
      let theStep = theTotalPath / 1000
      let thePrevTimeStamp = document.timeline.currentTime
      let theCurrentAngle = 0
      let doFrame = (theCurrentTimeStamp) => {
        theBugHTMLElement.style = `
          transform: translate(
            ${theX + Math.cos(theCurrentAngle) * theRadius}px
            , ${theY + Math.sin(theCurrentAngle) * theRadius}px
          )
          rotate( ${theCurrentAngle}rad )
        `
        theCurrentAngle += (theCurrentTimeStamp - thePrevTimeStamp) * theStep
        thePrevTimeStamp = theCurrentTimeStamp
        theCurrentAngle < theTotalPath && requestAnimationFrame(doFrame)
        //
      }
      requestAnimationFrame(doFrame)
    },
  }

  bug.doCreate()
  bug.doUpdate()
  console.log(bug)
})()
