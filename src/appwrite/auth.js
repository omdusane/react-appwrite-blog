import config from '../config/config.js';
import {Client, Account, ID} from "appwrite"

export class AuthService {
    client = new Client();
    account;

    constructor(){
        this.client
        .setEndpoint(config.appwriteUrl)
        .setProject(config.appwriteProjectId);
        this.account = new Account(this.client)

    }

    async createAccount({email, password, name}){
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount){
                //login user instead
                 return userAccount
            }else {
                return userAccount
            }
        } catch (error) {
            console.log("Error creating account");
            throw  error;
        }
    }

    async login({email, password}){
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            console.log("Error logging in User");
            throw error
        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get()
        } catch (error) {
            console.log('Error getting current user');
            throw error
        }
    }

    async logout(){
        try {
            return await this.account.deleteSessions()
            
        } catch (error) {
            console.log('Error logging out User');
            throw error
        }
    }
}

const authService = new AuthService();

export default authService;
