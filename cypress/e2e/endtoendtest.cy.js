import { LoginPage } from "./pages/login_page"

describe('EndToEndTest', () => {
    
    /*1.Go to the site
      2.Login to the site
      3.Go to Admin tab
      4.Add user
      5.Check the added user in the record list

    */


      const loginPage = new LoginPage()
      var userRole='Admin';
      var employeeName='Ranga Akunuri'; //need to check for the existence on the site  //NOTE: Can be done by using if condition for extracting the data and savig it into the variable
      var stateType='Enabled';
      var usernameName='Test@@@user123'; // need to be unique and first checked into the records
      var passwordData='Test@123';
      var confirmPasswordData='Test@123';

      it('Verify the functionality of login , adding the user and verifying the added user', () => {
        //steps


        loginPage.openurl()
        loginPage.enterUsername('Admin')
        loginPage.enterPassword('admin123')
        loginPage.clickLogin()
        
        cy.xpath("(//span[contains(@class,'oxd-main-menu-item--name')]) [1]").click()
        cy.xpath("(//button[@type='button'])[6]").click()
        cy.xpath("(//div[contains(@class,'oxd-select-text-input')])[1]").click()
        cy.get("[role='listbox']").contains(userRole).click()
        cy.get('input[placeholder="Type for hints..."]').clear().type(employeeName, { delay: 300 }); 
        cy.get("[role='listbox']",{timeout:5000}).contains(employeeName).click({force: true })
        /*cy.get("[placeholder='Type for hints...']").type('Amelia',{delay:300})  
        cy.get("[role='listbox']",{timeout:5000}).should('be.visible').find('div').contains('Amelia  Brown').click({force: true })
        //cy.wait(2000)*/
        cy.xpath("(//div[contains(@class,'oxd-select-text-input')])[2]").click()
        cy.get("[role='listbox']").contains(stateType).click()
        cy.get(':nth-child(4) > .oxd-input-group > :nth-child(2) > .oxd-input').type(usernameName)
        cy.get('.user-password-cell > .oxd-input-group > :nth-child(2) > .oxd-input').type(passwordData)
        cy.get(':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input').type(confirmPasswordData)
        cy.get('button[type="submit"]').click()
        cy.get('.oxd-toast', { timeout: 2000 }).should('exist').invoke('text').then((successmsge) => {
               expect(successmsge).to.include('Success') 
              })
        cy.get('.oxd-table-cell.oxd-padding-cell:nth-of-type(2)',{timeout:2000}).each(($el,index,$list)=>{
                 if($el.text()==usernameName){
                cy.wrap($el).should('exist').and('contain',usernameName)
                }
             })

         })

      
            
      })






