export class LoginPage{
    
    openurl(){

        cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
    }
    
    enterUsername(username){
        cy.get("[name='username']").type(username)
    }

    enterPassword(password){
        cy.xpath("//input[@type='password']").type(password)
    }

    clickLogin(){
        cy.xpath("//button[@type='submit']").click()
    }


}