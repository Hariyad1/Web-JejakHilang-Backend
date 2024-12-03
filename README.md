# Web-JejakHilang-Backend



## Authors

- [@Hariyadi](https://www.github.com/hariyad1)


## Tech Stack

**Server:** 
- Node -> untuk menjalankan JavaScript di sisi server.
- Express -> framework aplikasi web Node.js yang minimal dan fleksibel yang menyediakan berbagai fitur robust untuk aplikasi web dan mobile.
- Mongoodb/Mongoose -> database NoSQL yang menggunakan dokumen mirip JSON dengan skema opsional. Mongoose adalah library Object Data Modeling (ODM) untuk MongoDB dan Node.js, yang menyediakan abstraksi tingkat lebih tinggi untuk pemodelan data.
- Cors -> itur keamanan yang diimplementasikan di browser untuk membatasi skrip yang berjalan di satu halaman agar tidak mengakses sumber daya di halaman lain.
- Bycrypt -> Bcrypt adalah fungsi hash password yang dirancang untuk lambat dan tahan terhadap serangan brute-force. Ini umum digunakan untuk menyimpan kata sandi dengan aman di database.
- ImageKit: Layanan dan pustaka untuk mengelola dan mengoptimalkan gambar.

**Client:**
- [Web-JejakHilang-Frontend](https://github.com/Hariyad1/Web-JejakHilang-Frontend)

## Run Locally

Clone the project

```bash
git clone https://github.com/Hariyad1/Web-JejakHilang-Backend
```

Go to the project directory

```bash
cd Web-JejakHilang-Backend
```

## Installation

Install my-project with npm

```bash
npm install or npm i
```


## Environment Variables

To run this project, you will need to add the following environment variables to your .env by creating it in the main folder or you can rename the envExamples in the directory to `.env`

**The environment variables:**
```bash
MONGO_URL= mongodb+srv://username:password@backend.1lllz.mongodb.net/dbjejakhilang?retryWrites=true&w=majority&appName=backend
PORT= 5000
SECRET= SECRETKEY
CORS_ORIGIN= http://localhost:5173
IMAGEKIT_PUBLIC_KEY = <YOUR_IMAGEKIT_PUBLIC_KEY>
IMAGEKIT_PRIVATE_KEY = <YOUR_IMAGEKIT_PRIVATE_KEY>
IMAGEKIT_URL_ENDPOINT = <YOUR_IMAGEKIT_URL_ENDPOINT>
```

**Setting Up MONGO_URL**

Follow these steps to create your MONGO_URL:

1. **Log in to MongoDB Atlas Dashboard:**
   - Visit MongoDB Atlas.
   - Sign in using your credentials.

2. **Navigate to Clusters:**
   - After logging in, you'll be on the MongoDB Atlas dashboard.
   - Click on "Clusters" from the left-hand menu.

3. **Select or Create a Cluster:**
   - If a cluster already exists, select it. Otherwise, create a new one by clicking "Build a New Cluster".
   - Configure your cluster by selecting the cloud provider, region, and cluster tier, then click "Create Cluster".

4. **Database Access Setup:**
   - In the left-hand menu, go to "Database Access" under the "Security" section.
   - Click "Add New Database User".
   - Provide a username and password for your MongoDB user. Remember these credentials as they are part of your MONGO_URI.

5. **IP Whitelist Setup (if necessary):**
   - Navigate to "Network Access" under the "Security" section in the left-hand menu.
   - Click "Add IP Address" and add your current IP address to the whitelist. This allows your application to connect to the MongoDB cluster.

6. **Get the Connection String (MONGO_URI):**
   - Return to the cluster dashboard by clicking "Clusters" in the left-hand menu.
   - Click "Connect" for your cluster.
   - Choose "Connect your application".

   - Copy the provided connection string, which should resemble:
  
   ```bash
   mongodb+srv://username:password@clustername.mongodb.net/database
   ```
   Replace:
   - `username` with your created username.
   - `password` with the password you set.
   - `clustername` with your MongoDB cluster's name.
   - `database` with your specific database name (e.g., kosan).

7. **Update Your MongoDB URI:**
   - Use the following format:

     ```bash
     MONGO_URL=mongodb+srv://yourUsername:yourPassword@yourCluster.mongodb.net/yourDatabase?retryWrites=true&w=majority
     ```
   - Replace the placeholders (`username`, `password`, `clustername`, and `database`) with your actual values.
   - Add this to your `.env` file.


**For IMAGEKIT_APIKEY**

This project uses [ImageKit](https://imagekit.io/) for image management and optimization. Follow the steps below to configure and use ImageKit in this project.

**Configuration Steps**

1. **Sign Up and Log In to ImageKit Dashboard:**
   - Visit [ImageKit.io](https://imagekit.io/).
   - Sign up for a new account or log in with your credentials.

2. **Create a New Project (If Necessary):**
   - Once logged in, you'll be on the ImageKit dashboard.
   - If you don't have a project yet, click "Create New Project" and follow the steps to set it up.

3. **Obtain API Credentials:**
   - Navigate to the "Developer" or "API Keys" section in your project dashboard.
   - Here, you'll find your public key, private key, and URL endpoint.
   - Note these details as they will be used in your `.env` file.

4. **Add Credentials to `.env`:**
   - Open the `.env` file in your project.
   - Add your ImageKit credentials as follows:

   ```bash
   IMAGEKIT_PUBLIC_KEY = <YOUR_IMAGEKIT_PUBLIC_KEY>
   IMAGEKIT_PRIVATE_KEY = <YOUR_IMAGEKIT_PRIVATE_KEY>
   IMAGEKIT_URL_ENDPOINT = <YOUR_IMAGEKIT_URL_ENDPOINT>
   ```

   Replace `<YOUR_IMAGEKIT_PUBLIC_KEY>`, `<YOUR_IMAGEKIT_PRIVATE_KEY>`, and `<YOUR_IMAGEKIT_URL_ENDPOINT>` with the values obtained from the ImageKit dashboard.

5. **Configure in Your Application Code:**
   - Ensure you have installed the `imagekit` package using `npm install imagekit`.
   - In your `index.js` or main application file, initialize ImageKit with the following code:

   ```javascript
   const ImageKit = require("imagekit");

   const imagekit = new ImageKit({
     publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
     privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
     urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
   });
   ```

6. **Test Connection and Functionality:**
   - Run your application and test if the ImageKit integration works correctly.
   - Try uploading an image through the endpoint you have set up to ensure everything is functioning as expected.

By following these steps, you can configure ImageKit in your backend project and ensure that credentials are securely stored in the `.env` file.


## Runing Server
When everything is installed and imported now run the server
```bash
//For dev
npm run nodemon
```

```bash
//with nodejs
npm run start
```


## API Endpoints

### Login & Registration
1. Register
    - **Endpoints:** `/api/auth/register`
    - **Method:** `POST`
    - **Body :**
      ```json
      {
        "username": "string",
        "email": "string",
        "password": "string",
        "isAdmin": "boolean"
      }
      ```

2. Login
    - **Endpoints:** `/api/auth/login`
    - **Method:** `POST`
    - **Body :**
      ```json
      {
        "email": "string",
        "password": "string"
      }
      ```

3. Logout
    - **Endpoints:** `/api/auth/logout`
    - **Method:** `GET`

4. Refetch
    - **Endpoints:** `/api/auth/logout`
    - **Method:** `GET`

### User
1. Update User
    - **Endpoints:** `/api/users/:id`
    - **Method:** `PUT`
    - **Body :**
      ```json
      { 
        "username": "string",
        "email": "string",
        "password": "string"
      }
      ```

2. Delete User
    - **Endpoints:** `/api/users/:id`
    - **Method:** `DELET`

3. Get User
    - **Endpoints:** `/api/users/:id`
    - **Method:** `GET`

### Post
1. Create Post
    - **Endpoints:** `/api/posts/create`
    - **Method:** `POST`
    - **Body :**
      ```json
      {
        "title": "string",
        "desc": "string",
        "photo": "string",
        "username": "string",
        "userId": "string",
        "categories": ["string"],
        "contactNo": "string",
        "reportType": "string" // 'Penemu' atau 'Pencari'
      }
      ```
      
2. Update Post
    - **Endpoints:** `/api/posts/:id`
    - **Method:** `PUT`
    - **Body :**
      ```json
      {
        "title": "string",
        "desc": "string",
        "photo": "string",
        "username": "string",
        "userId": "string",
        "categories": ["string"],
        "contactNo": "string",
        "reportType": "string" // 'Penemu' atau 'Pencari'
      }
      ```

3. Delete Post
    - **Endpoints:** `/api/posts/:id`
    - **Method:** `DELETE`

4. Get Post
    - **Endpoints:** `/api/posts`
    - **Method:** `GET`

5. Get Post Details
    - **Endpoints:** `/api/posts/:id`
    - **Method:** `GET`

6. Get User Posts
    - **Endpoints:** `/api/posts/user/:userId`
    - **Method:** `GET`

### Comment
1. Create Comment
    - **Endpoints:** `/api/comments/create`
    - **Method:** `POST`
    - **Body :**
      ```json
      {
        "comment": "string",
        "author": "string",
        "postId": "string",
        "userId": "string"
      }
      ```

2. Update Comment
    - **Endpoints:** `/api/comments/:id`
    - **Method:** `PUT`
    - **Body :**
      ```json
      {
        "comment": "string",
        "author": "string",
        "postId": "string",
        "userId": "string"
      }
      ```

3. Delete Comment
    - **Endpoints:** `/api/comments/:id`
    - **Method:** `DELETE`

4. Get Post Comments
    - **Endpoints:** `/api/comments/post/:postId`
    - **Method:** `GET`

### Admin
1. Get All Posts
    - **Endpoints:** `/api/admin/posts`
    - **Method:** `GET`

2. Delete Post
    - **Endpoints:** `/api/admin/posts/:id`
    - **Method:** `DELETE`

3. Get All Users
    - **Endpoints:** `/api/admin/users`
    - **Method:** `GET`

4. Delete User
    - **Endpoints:** `/api/admin/users/:id`
    - **Method:** `DELETE`
