# memes-api
REST APIs for sharing memes, viewing statistics of uploaded memes, and so on using Node.js with Express.js, MongoDB &amp; JWT.

## Getting Started

First, clone the project:

```bash
git clone https://github.com/rashedrahat/memes-api.git
```

Then,
```bash
cd memes-api
npm i
```

After then, run the server:

```bash
npm run start
```

Finally, import the `memes-api.json` into `Postman` or `Talend API Tetser` and test the API endpoints.

**Note:** Developed in Node version `10.13.0` Recommended Node version `10.13.0` or required any Node version `10.x.x`

**Special note:** After importing the `memes-api.json` if you don't found any endpoints or face any issues then please see the below details:

#### User sign-up: `http://localhost:2021/api/auth/register`
![User sign-up](https://i.ibb.co/D4XNkdr/Screenshot-from-2021-03-26-00-44-06.png)

#### User login: `http://localhost:2021/api/auth/login`
![User login](https://i.ibb.co/M7rMGcm/Screenshot-from-2021-03-26-01-02-10.png)

#### Upload a meme: `http://localhost:2021/api/meme/add`
![Upload a meme](https://i.ibb.co/h1MJ2xn/Screenshot-from-2021-03-26-00-45-36.png)

#### List all memes: `http://localhost:2021/api/meme/all`
![List all memes](https://i.ibb.co/DWMsCV7/Screenshot-from-2021-03-26-00-46-13.png)

#### View a shareable link: `http://localhost:2021/?fileName=meme-1.jpeg_1616692710941`
![View a shareable link](https://i.ibb.co/wWXVqgc/Screenshot-from-2021-03-26-01-02-04.png)

***That's all.***
