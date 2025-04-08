import { LoginPage } from "./pages/login_page"

const loginpage=new LoginPage()

describe('LoginPageFunctinality', () => {


  beforeEach(() =>{
    loginpage.openurl()
  
  })

  it('Verify the url of the page', () => {
    //steps

    cy.url().should('eq','https://opensource-demo.orangehrmlive.com/web/index.php/auth/login').and('include','orangehrmlive')
    .and('contain','orangehrm')

  })


  it('Verify the correct title of the page', () => {
    //steps

    cy.title().should('eq','OrangeHRM')
  })

  it('Verify that logo are present & displayed on login page', () => {
    //steps

    cy.get('.orangehrm-login-branding > img').should('be.visible')
    cy.get('.orangehrm-login-logo > img').should('exist')
  })

  it('Verify the Total Number of Links on the Login Page', () => {
    //steps

    cy.xpath("//a").should('have.length',5)
  })


     
// i have included 3 testcases in single testcase - 1-invalid password,2-invalid username,3-invalid username & password
  

  it('Verify the validation message is displayed on login with invalid username or the password', () => {            


      //steps
            loginpage.enterUsername('Admin111')
            loginpage.enterPassword('admin000')
            loginpage.clickLogin()
            // cy.get("[name='username']").type("Admin111")
            // cy.xpath("//input[@type='password']").type("admin000")
            // cy.xpath("//button[@type='submit']").click()
            cy.xpath("//p[text()='Invalid credentials']").should('be.visible')
  
      
  
      })

  it('Verify Validation Message on log-in Without Entering Data', () => {
    //steps

          loginpage.clickLogin()
          //cy.xpath("//button[@type='submit']").click()
          cy.xpath("//span[text()='Required']").should('be.visible')

  })

  it('Verify the login with valid username & password and confirmation by user', () => {
    //steps

        loginpage.enterUsername('Admin')
        cy.get("[name='username']").should('have.value','Admin')
        //cy.xpath("//input[@type='password']").type("admin123")
        loginpage.enterPassword('admin123')
        cy.xpath("//input[@type='password']").should('have.value','admin123')
        //cy.xpath("//button[@type='submit']").click()
        loginpage.clickLogin()

        let expectedName="João JLevand";                  //The name changes automatically , so need to verify first while running the test

        cy.get(".oxd-userdropdown-name").then( (x)=>{

              let actualName=x.text()
              expect(actualName).to.equal(expectedName)    //BDD approach

              assert.equal(actualName,expectedName)    //TDD approach

          })
  })

  it('Verify the successful login by checking the URL', () => {
    //steps
    // cy.get("[name='username']").type("Admin")
    // cy.xpath("//input[@type='password']").type("admin123")
    // cy.xpath("//button[@type='submit']").click()

          loginpage.enterUsername('Admin')
          loginpage.enterPassword('admin123')
          loginpage.clickLogin()
          cy.url().should('contain','/dashboard/index')

  })


  it('verify that the Admin tab is visible and clickable', () => {
    //steps

    // cy.get("[name='username']").type("Admin")
    // cy.xpath("//input[@type='password']").type("admin123")
    // cy.xpath("//button[@type='submit']").click()
          loginpage.enterUsername('Admin')
          loginpage.enterPassword('admin123')
          loginpage.clickLogin()
          cy.xpath("(//span[contains(@class,'oxd-main-menu-item--name')]) [1]").should('be.visible')
          cy.xpath("(//span[contains(@class,'oxd-main-menu-item--name')]) [1]").click()
          cy.url().should('include','/admin/viewSystemUsers');

  })



})