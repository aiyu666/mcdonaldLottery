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
```
curl --request POST \
  --url localhost:5000/api/lottery \
  --header 'content-type: application/json' \
  --data '{
 "accessToken": "<token>"
}'
```

#### Get Lottery List
```
curl --request GET \
  --url http://localhost:5000/api/lottery \
  --header 'content-type: application/json' \
  --data '{
 "accessToken": "<token>"
}'
```