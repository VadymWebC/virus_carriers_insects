;(() => {
  'use strict'

  let bug = {
    theName: '',
    theX: 0,
    theY: 0,
    theDirection: 0,
    theSpeed: 0,
    theBugHTMLElement: null,
    doUpdate: () => {
      let theCanvas = document.querySelector('#hive')
      let theBugHTMLElement = (bug.theBugHTMLElement =
        document.createElement('div'))

      let { theName, theX, theY, theDirection } = bug

      Object.assign(theBugHTMLElement, {
        className: 'bug',
        title: theName,
        style: `top: ${Math.random() * 300 + 50}px;
                 left: ${Math.random() * 300 + 50}px;
                 transform: rotate(${Math.random() * 360}deg)
                `,
      })

      theCanvas.appendChild(theBugHTMLElement)
      //
    },
  }

  bug.doUpdate()
})()
