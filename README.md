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
Get token
```
curl --request POST \
  --url https://mcdonaldlottery.herokuapp.com/users \
  --header 'content-type: application/json' \
  --data '{
 "account": "<yourAccount>",
 "password": "<password>"
}'
```

Get Lottery
```
curl --request POST \
  --url localhost:5000/lottery \
  --header 'content-type: application/json' \
  --data '{
 "accessToken": "<token>"
}
```