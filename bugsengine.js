;(() => {
  'use strict'

  let bug = {
    theName: '',
    theX: 0,
    theY: 0,
    theDirection: 0,
    theSpeed: 0,
    theBugHTMLElement,
    doUpdate: () => {
      // document.querySelector("#hive")
      let theBugHTMLElement = (bug.theBugHTMLElement =
        document.createElement('div'))

      Object.assign(theBugHTMLElement, {
        className: 'bug',
        title: theName,
        style: `top ${Math.random() * 300 + 50}px;
                 left: ${Math.random() * 300 + 50}px;
                 transform: rotate(${Math.random() * 360}deg)
                `,
      })
    },
  }
})()
