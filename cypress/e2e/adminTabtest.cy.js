import { LoginPage } from "./pages/login_page"


const loginpage = new LoginPage()
var usernameName='Test@2102'; // need to be unique and first checked into the records
var empName='Ranga Akunuri';  //sometimes fail due to unavailability of the name on site,need to change name and check
var myname='Adnan';

describe('AddUserFunctionality', () => {

      beforeEach(() =>{
        loginpage.openurl()
        loginpage.enterUsername('Admin')
        loginpage.enterPassword('admin123')
        loginpage.clickLogin()
      
      })
   
    
      it('verify that the Admin tab is visible and clickable', () => {
        //steps
    
       
        cy.xpath("(//span[contains(@class,'oxd-main-menu-item--name')]) [1]").should('be.visible') 
        cy.xpath("(//span[contains(@class,'oxd-main-menu-item--name')]) [1]").click() 
        cy.url().should('include','/admin/viewSystemUsers');  
    
      })

      it('verify that the Add button in admin tab is clickable and navigates to Add User form', () => {
        //steps
    
        cy.xpath("(//span[contains(@class,'oxd-main-menu-item--name')]) [1]").click()
        cy.xpath("(//button[@type='button'])[6]").should('be.visible')
        cy.xpath("(//button[@type='button'])[6]").click()
        cy.url().should('contain','/admin/saveSystemUser')

      })

      it('Verify that clicking the "User Role" dropdown opens the list of options', () => {
            //steps
        
            cy.xpath("(//span[contains(@class,'oxd-main-menu-item--name')]) [1]").click()
            cy.xpath("(//button[@type='button'])[6]").click()
            cy.xpath("(//div[contains(@class,'oxd-select-text-input')])[1]").click()
            cy.get("[role='listbox']").should('contain','Admin')
            cy.get("[role='listbox']").should('contain','ESS')
            
      })

      it('Verify that clicking the role in dropdown is selected as "user role"', () => {
        //steps
    
        cy.xpath("(//span[contains(@class,'oxd-main-menu-item--name')]) [1]").click()
        cy.xpath("(//button[@type='button'])[6]").click()
        cy.xpath("(//div[contains(@class,'oxd-select-text-input')])[1]").click()
        cy.get("[role='listbox']").contains('Admin').click()
        cy.xpath("(//div[contains(@class,'oxd-select-text-input')])[1]").should('contain','Admin') // to verify the selected value is correct or not
        })

      it('Verify auto-suggestion appears when typing and a valid employee name is selectable in the employee field', () => {
            //steps
            //var empName='Ranga Akunuri';  //sometimes fail due to unavailability of the name on site,need to change name and check
            cy.xpath("(//span[contains(@class,'oxd-main-menu-item--name')]) [1]").click()
            cy.xpath("(//button[@type='button'])[6]").click()
            cy.get("[placeholder='Type for hints...']").type(empName,{delay:200})  
            cy.get("[role='listbox']",{timeout:5000}).contains(empName).click({force: true })
      })
           

      it('Verify that clicking the "State" dropdown opens the list of options and are selectable', () => {
              //steps
          
              cy.xpath("(//span[contains(@class,'oxd-main-menu-item--name')]) [1]").click()
              cy.xpath("(//button[@type='button'])[6]").click()
              cy.xpath("(//div[contains(@class,'oxd-select-text-input')])[2]").click()
              cy.get("[role='listbox']").should('contain','Enabled')
              cy.get("[role='listbox']").should('contain','Disabled')
              cy.get("[role='listbox']").contains('Enabled').click()
              cy.xpath("(//div[contains(@class,'oxd-select-text-input')])[2]").should('contain','Enabled')// to verify the selected value is correct or not
              })
          
       it('verify that the Username field is visible and allows data entry', () => {
                //steps
              var uName='user@12345';
                cy.xpath("(//span[contains(@class,'oxd-main-menu-item--name')]) [1]").click()
                cy.xpath("(//button[@type='button'])[6]").click()
                cy.get(':nth-child(4) > .oxd-input-group > :nth-child(2) > .oxd-input').should('be.visible').and('be.enabled') //to check Username field is visible and enabled
                cy.get(':nth-child(4) > .oxd-input-group > :nth-child(2) > .oxd-input').type(uName)
                cy.get(':nth-child(4) > .oxd-input-group > :nth-child(2) > .oxd-input').should('have.value',uName) // to verify the entered value is correct or not
               })


        it('Verify that validation is displayed if username does not meet complexity rules for user already exist and less character entry ', () => {
                //steps
                
                var lessCharUser='user';
                var existUser='user2022'; //Need to change the user based on the availability on the site



                cy.xpath("(//span[contains(@class,'oxd-main-menu-item--name')]) [1]").click()
                cy.xpath("(//button[@type='button'])[6]").click()
                cy.get(':nth-child(4) > .oxd-input-group > :nth-child(2) > .oxd-input').type(lessCharUser)
                cy.get('.oxd-input-group > .oxd-text').should('contain','Should be at least 5 characters')//to check the validation if entered character are less than 5
                cy.wait(3000)
                cy.get(':nth-child(4) > .oxd-input-group > :nth-child(2) > .oxd-input').clear()
                cy.get(':nth-child(4) > .oxd-input-group > :nth-child(2) > .oxd-input',{delay:200}).type(existUser) // to check if validation is displayed for the user already exist NOTE:To test this user should be added first
                cy.get('.oxd-input-group > .oxd-text').should('contain','Already exists')                           
                

               })

       it('Verify that Password and Confirm Password fields are visible and enabled', () => {
                //steps
            
                cy.xpath("(//span[contains(@class,'oxd-main-menu-item--name')]) [1]").click()
                cy.xpath("(//button[@type='button'])[6]").click()
                cy.get('.user-password-cell > .oxd-input-group > :nth-child(2) > .oxd-input').should('be.visible').and('be.enabled') // to verify the password field
                cy.get(':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input').should('be.visible').and('be.enabled') // to verify the Confirm password field

               })

        it('Verify that user can enter a password and confirm that it matches', () => {
                //steps

                cy.xpath("(//span[contains(@class,'oxd-main-menu-item--name')]) [1]").click()
                cy.xpath("(//button[@type='button'])[6]").click()
                
                cy.get('.user-password-cell > .oxd-input-group > :nth-child(2) > .oxd-input').type('Test@123')
                cy.get(':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input').type('Test@123')
                cy.get('.user-password-cell > .oxd-input-group > :nth-child(2) > .oxd-input').should('have.value','Test@123')
                cy.get(':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input').should('have.value','Test@123')

                cy.get('.user-password-cell > .oxd-input-group > :nth-child(2) > .oxd-input').invoke('val').then((pass) => {
                
                       cy.get(':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input').invoke('val').should('eq',pass)
                    
                    
                      })

               })


        it('Verify validation when confirm password does not match entered password', () => {
                //steps

                cy.xpath("(//span[contains(@class,'oxd-main-menu-item--name')]) [1]").click()
                cy.xpath("(//button[@type='button'])[6]").click()
                cy.get('.user-password-cell > .oxd-input-group > :nth-child(2) > .oxd-input').type('Test@12345')
                cy.get(':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input').type('Test@123')
                cy.get('button[type="submit"]').click()
                cy.get('.user-password-row > .oxd-grid-2 > :nth-child(2) > .oxd-input-group > .oxd-text').should('contain', 'Passwords do not')

               })

        it('Verify Password strength validation', () => {
                //steps

                cy.xpath("(//span[contains(@class,'oxd-main-menu-item--name')]) [1]").click()
                cy.xpath("(//button[@type='button'])[6]").click()
                cy.get('.user-password-cell > .oxd-input-group > :nth-child(2) > .oxd-input').type('Test123')
                cy.wait(2000)
                cy.get('.oxd-chip').should('contain','Weak')
              
               })


        it('Verify that validation is displayed if password does not meet complexity rules', () => {
                //steps

                cy.xpath("(//span[contains(@class,'oxd-main-menu-item--name')]) [1]").click()
                cy.xpath("(//button[@type='button'])[6]").click()
                cy.get('.user-password-cell > .oxd-input-group > :nth-child(2) > .oxd-input').type('T123')
                cy.wait(2000)
                //to check validation when charaters are less than 7
                cy.get('.user-password-cell > .oxd-input-group > .oxd-text').should('contain','Should have at least 7 characters')
                //to check validation when no lowercase character is entered
                cy.get('.user-password-cell > .oxd-input-group > :nth-child(2) > .oxd-input').clear()
                cy.get('.user-password-cell > .oxd-input-group > :nth-child(2) > .oxd-input').type('T1234567')
                cy.wait(2000)
                cy.get('.user-password-cell > .oxd-input-group > .oxd-text').should('contain','Your password must contain minimum 1 lower')
              
               })



         it('Verify that save and close button are visible and enabled', () => {
                //steps

                cy.xpath("(//span[contains(@class,'oxd-main-menu-item--name')]) [1]").click()
                cy.xpath("(//button[@type='button'])[6]").click()
                cy.get('.oxd-button--ghost').should('be.visible').and('be.enabled')
                cy.get('button[type="submit"]').should('be.visible').and('be.enabled')
              
               })



        it('Verify that validation message appears if fields are left empty and clicked saved', () => {
                //steps
            
                cy.xpath("(//span[contains(@class,'oxd-main-menu-item--name')]) [1]").click()
                cy.xpath("(//button[@type='button'])[6]").click()
                cy.get('button[type="submit"]').click()//  directly click Save button
                //check the validation message for all 6 fields
                cy.get('.oxd-label.oxd-input-field-required').should('have.length',6) // to check the fields available for validation
                cy.get(':nth-child(1) > .oxd-grid-2 > :nth-child(1) > .oxd-input-group > .oxd-text').should('contain', 'Required')//user role field
                cy.get(':nth-child(1) > .oxd-grid-2 > :nth-child(2) > .oxd-input-group > .oxd-text').should('contain', 'Required')//employee name field
                cy.get(':nth-child(3) > .oxd-input-group > .oxd-text').should('contain', 'Required')//state field
                cy.get(':nth-child(4) > .oxd-input-group > .oxd-text').should('contain', 'Required')//username field
                cy.get('.user-password-cell > .oxd-input-group > .oxd-text').should('contain', 'Required')//password field
                cy.get('.user-password-row > .oxd-grid-2 > :nth-child(2) > .oxd-input-group > .oxd-text').should('contain', 'Passwords do not')//confirm password field
                

               })

        it('Verify that close button is working', () => {
                //steps

                cy.xpath("(//span[contains(@class,'oxd-main-menu-item--name')]) [1]").click()
                cy.xpath("(//button[@type='button'])[6]").click()
                cy.get('.oxd-button--ghost').click()
                cy.url().should('include','/admin/viewSystemUsers') //means the cancel button is working
              
               })

         it('Verify that clicking "Save" saves the user and redirects to previous page', () => {
                //steps



                var userRole='Admin';
                //var employeeName='Ranga Akunuri';
                var stateType='Enabled';
               // var usernameName='Test@user123'; // need to be unique and first checked into the records
                var passwordData='Test@123';
                var confirmPasswordData='Test@123';

                cy.xpath("(//span[contains(@class,'oxd-main-menu-item--name')]) [1]").click()
                cy.xpath("(//button[@type='button'])[6]").click()
                cy.xpath("(//div[contains(@class,'oxd-select-text-input')])[1]").click()
                cy.get("[role='listbox']").contains(userRole).click()
                cy.get("[placeholder='Type for hints...']").type(empName,{delay:200})  
                cy.get("[role='listbox']").contains(empName).click({force: true })
                cy.wait(2000)
                cy.xpath("(//div[contains(@class,'oxd-select-text-input')])[2]").click()
                cy.get("[role='listbox']").contains(stateType).click()
                cy.get(':nth-child(4) > .oxd-input-group > :nth-child(2) > .oxd-input').type(usernameName)
                cy.get('.user-password-cell > .oxd-input-group > :nth-child(2) > .oxd-input').type(passwordData)
                cy.get(':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input').type(confirmPasswordData)
                cy.get('button[type="submit"]').click()
                // to check if success message is exist
                cy.get('.oxd-toast', { timeout: 2000 }).should('exist').invoke('text').then((successmsge) => {
                       expect(successmsge).to.include('Success') 
                      })
                cy.url().should('include','/admin/viewSystemUsers') //means the user is saved and save button is working
              
                    
              })

             
          it('verify the added user in the records table by using search method', () => {
                //steps
               // var usernameName='Test@user123';
                cy.xpath("(//span[contains(@class,'oxd-main-menu-item--name')]) [1]").click()
                cy.get(':nth-child(2) > .oxd-input').type(usernameName)
                cy.get('.oxd-form-actions > .oxd-button--secondary').click()
                cy.get('.oxd-table-cell.oxd-padding-cell:nth-of-type(2)',{timeout:2000}).should('have.text',usernameName)
     
              })

          it('verify the added user in the records table by using iteration', () => {
                //steps
               // var usernameName='Test@user123';
                cy.xpath("(//span[contains(@class,'oxd-main-menu-item--name')]) [1]").click()
                cy.get('.oxd-table-cell.oxd-padding-cell:nth-of-type(2)',{timeout:2000}).each(($el,index,$list)=>{

                          if($el.text()==usernameName){

                            cy.wrap($el).should('exist').and('contain',usernameName)
                          }
                })
     
              })
        


})