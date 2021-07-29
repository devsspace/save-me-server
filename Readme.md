# Save Me Server

## How to contribute:
1. Check email and accept invitation
2. Clone the repo
3. Open terminal in that directory
4. run the command:
  ```
  git checkout development
  git add .
  git commit -m ""
  git fetch
  git pull origin development
  git push origin development
  ```

# Run Project:
  * confirm have `.env` file with these environment variable
    ```json
    DATABASE_URL=
    JWT_SECRET_KEY=
    ```
  * Dev Server :  `npm run start:dev`
  * Production Server :  `npm run start`