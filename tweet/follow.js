const puppeteer = require('puppeteer')
/**
 *       /outcome
 * Follow id 
 * @param {*} userID 
 * @param {*} pwd 
 * @param {*} followId 
 *  
 */
async function follow (userID, pwd,followId) {
  let data = {}

  let browser = await puppeteer.launch({ headless: true, slowMo: 100, args: ['--no-sandbox'] })
  let page = await browser.newPage()
  try {
    await page.setViewport({ width: 1920, height: 1080 })
    await page.goto('https://twitter.com/login')
   

    // For fetching username
    const mainInput = 'input.js-username-field.email-input.js-initial-focus'
    await page.waitForSelector(mainInput, { timeout: 300000 })
    await page.type(mainInput, userID)

    // For fetching password
    const passInput = 'input.js-password-field'
    await page.waitForSelector(passInput, { timeout: 300000 })
    await page.type(passInput, pwd)

    // To click login button
    const submitButton = 'button.submit.EdgeButton.EdgeButton--primary.EdgeButtom--medium'
    await page.waitForSelector(submitButton)
    await page.click(submitButton)
    await page.waitFor(1000 * 12)

    //To follow
    await page.goto(followId)
    const follow_people ='div.css-18t94o4.css-1dbjc4n.r-1niwhzg.r-p1n3y5.r-sdzlij.r-1phboty.r-rs99b7.r-1w2pmg.r-1vuscfd.r-1dhvaqw.r-1fneopy.r-o7ynqc.r-6416eg.r-lrvibr'
    await page.waitForSelector(follow_people)
    await page.click(follow_people)
    await browser.close()
    data['success']=true
    return data


    } catch (e) {
        await browser.close()
        console.log(e)
        throw new Error('Failed to follow..')
    }
}
module.exports = {
    follow
}
