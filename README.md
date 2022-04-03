# Email Scheduler

Its an email scheduler which will fire the mails to designated receivers on given time.

## Tech Stacks required
- NodeJS v14.19.0 (Hapi.js as a framework)
- MongoDB

## Features

- Create a scheduled job which will trigger the mail on given time.
- Get paginated report of created jobs.
- Get Details of a single job as well by just triggering an API.

## Installation

Requires Node.js v14+ to run (v14.19.0 Preferred) and MongoDB .

set the Environment variables.

```sh
MONGO_URI= <mongodb uri>
MONGO_USERNAME= <mongodb username>
MONGO_PASSWORD=<mongodb pasword>
MONGO_DBNAME=EMAIL_SCHEDULER
HOST=0.0.0.0
PORT=8000
EMAIL_ID=<Senders Email ID>
EMAIL_PASSWORD=<Password for above Email ID>
SMTP_SERVER=<SMTP server of above email>
SMTP_PORT=<SMTP server port>
```

Install the dependencies and devDependencies and start the server.

```sh
npm i
node index.js
```

## API documentation
Swagger documentation can be found on `0.0.0.0:8000/documentation`

- `POST /v1/jobs`
    - payload:
        ```js
        [
            { 
            "email":"email id of the receiver",
            "time": Valid: ["now/ x hour later/ on a particular time( Ex- 21st march,2022,6:00 AM)"],
            "subject":"Email subject",
            "body":"Email body"
            }
        ]
        ```
- `GET /v1/jobs`
    - query:
        ```js
        page: Number
        limit: Number
        ```
- `GET /v1/jobs/{id}`
    - parameter:
        ```
        id: Mongo ObjectId of any job
        ```
        
## How does it work?
- Works on the basis of a cronjob acting as a per-minute observer for any upcoming scheduled job.
- Each mail to be sent is created as a job by using `POST` API.
- Based on the time given in payload, the execution time is decided and set.
- Whenever observer finds a job whose execution time is less than current time and is not executed yet, will be fed to the executor.
- The executor will run each job asynchronously, it will trigger each mails, and updates the job status as success/failure
- A time will be stored, at which the job was executed.

## Some clarifications
- DB like postgres/MySQL with read heavy efficient operations can be used.
- As MongoDB natively uses UTC timezone, the cron (Observer) also runs on the UTC timezone.
- The API responses also are returned in UTC timezones. The timezone can be changed on the client side.