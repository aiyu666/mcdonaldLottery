# mcdonaldLottery

Easy to get the mcdonald lottery daily api.

## Installation
```
npm install
```

## Usage
```
npm run start
```

### Use curl
#### Get token
Get the token witch call mcdonald api will need.
```
curl --request POST \
  --url localhost:5000/api/users \
  --header 'content-type: application/json' \
  --data '{
 "account": "<yourAccount>",
 "password": "<password>"
}'
```

#### Get Lottery
Get the lottery vai call mcdonald api and show today's lottery which you get.
```
curl --request POST \
  --url localhost:5000/api/lottery \
  --header 'content-type: application/json' \
  --data '{
 "accessToken": "<token>"
}'
```

#### Get Lottery List
Get the lottery list and stickers witch the date is not expired. 
```
curl --request GET \
  --url http://localhost:5000/api/lottery \
  --header 'content-type: application/json' \
  --data '{
 "accessToken": "<token>"
}'
```