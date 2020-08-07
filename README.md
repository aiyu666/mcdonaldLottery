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
![](https://i.imgur.com/iOjMO9I.png)
```
curl --request POST \
  --url localhost:5000/api/users \
  --header 'content-type: application/json' \
  --data '{
 "account": "<yourAccount>",
 "password": "<password>"
}'
```

#### Get lottery
Get the lottery vai call mcdonald api and show today's lottery which you get.
![](https://i.imgur.com/PDyHc8e.png)
```
curl --request POST \
  --url localhost:5000/api/lottery \
  --header 'content-type: application/json' \
  --data '{
 "accessToken": "<mcdonaldToken>"
}'
```

#### Get lottery status
Get the lottery list and stickers witch the date is not expired. 
![](https://i.imgur.com/QSxerRE.png)
```
curl --request GET \
  --url 'http://localhost:5000/api/lottery?accessToken=<mcdonaldToken>'
```

#### Auto get lottery 
Get the lottery daily , cronFormat default is UTF+8 00:01:00
![](https://i.imgur.com/7hVzp86.png)
![](https://i.imgur.com/2BD9J8e.png)
```
curl --request POST \
  --url http://localhost:5000/api/subscription \
  --header 'content-type: application/json' \
  --data '{
	"accessToken": "<mcdonaldToken>",
	"lineNotifiyToken": "<yourLineNotifiyToken>",
	"cronFormat": "<cronFormat>"
}'
```

