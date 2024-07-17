;(() => {
  'use strict'

  let bug = {
    theName: '',
    theX: 0,
    theY: 0,
    theDirection: 0,
    theRadius: 8,
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
        style: `top: ${(bug.theX = Math.random() * 300 + 50)}px;
                 left: ${(bug.theY = Math.random() * 300 + 50)}px;
                 transform: rotate(${Math.random() * 360}deg)
                `,
      })

      theCanvas.appendChild(theBugHTMLElement)
      //
    },
    doUpdate: () => {
      let = {
        theX,
        theY,
        theDirection,
        theSpeed,
        theRadius,
        theBugHTMLElement,
      } = bug
      let theTotalPath = 2 * Math.PI * theRadius
    },
  }

  bug.doCreate()
  console.log(bug)
})()
