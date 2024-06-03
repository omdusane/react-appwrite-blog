import config from '../config/config.js';
import {Client, ID, Databases, Storage, Query} from "appwrite"

export class Service{
    client =  new Client();
    databases;
    storage;

    constructor(){
        this.client
        .setEndpoint(config.appwriteUrl)
        .setProject(config.appwriteProjectId)
        this.databases = new Databases(this.client)
        this.storage = new Storage(this.client);
    }

    // CRUD Services

    async createPost({title, content, slug, imageurl, status, userId}){
        try {

            return await this.databases.createDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title, content, imageurl, status, userId
                }
            )
            
        } catch (error) {
            console.log('Error while creating post');
            throw error;
        }
    }

    async updatePost(slug,{title, content, imageurl, status}){
        try {
            
            return await this.databases.updateDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title, content, imageurl, status
                }
            )

        } catch (error) {
            console.log('Error while updating post');
            throw error;
        }
    }
  
    async deletePost({slug}) {
        try {
            console.log('from deletepost',slug);
             return await this.databases.deleteDocument(
                config.appwriteDatabaseId, 
                config.appwriteCollectionId,
                slug)
        } catch (error) {
            console.log(error);
            console.log('Error while deleting post');
            return false;
        }
    }

    async  getPost({slug}) {
        try {
             return await this.databases.getDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.log('Error while getting post');
            console.log(error);
            return false;
        }
    }

    async  getPosts(queries=[Query.equal('status', 'active')]) {
        try {
            
            return await this.databases.listDocuments(
                config.appwriteDatabaseId, 
                config.appwriteCollectionId, 
                queries
            )

        } catch (error) {
            console.log('Error while getting posts');
            return false;
        }
    }

    // File Upload Services
    async  uploadFile(file){
        try {
            return await this.storage.createFile(
                config.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log('Error while uploading file');
            return false;
        }
    }

    async deleteFile(fileId){
        try {
            await this.storage.deleteFile(
                config.appwriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deleteFile :: error", error);
            return false
        }
    }

    getFilePreview(fileId){
        try {
            return this.storage.getFilePreview(
                config.appwriteBucketId,
                fileId);
        } catch (error) {
            console.log('Error while getting file preview');
            console.log(error);
            return false;
        }
    }

}

const service = new Service();

export default service