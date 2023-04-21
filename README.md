# posts
## API endpoints:
#
### [POST] /registration
### body: JSON
```json
{
  "username": "test",
  "password": "test"
}
```
### - to register a new user
#
### [POST] /login
### body: JSON
```json
{
  "username": "test",
  "password": "test"
}
```
### - to login
#
### [POST] /delete-user
### body: JSON
```json
{
  "username": "test"
}
```
### - to delete a user
#
### [POST] /create-post
### body: JSON
```json
{
  "username": "test",
  "postname": "test",
  "posttext": "test"
}
```
### - to create a post 
#
### [GET] /posts - - will show all posts and information about them
### body: none
#
### [GET] /post/:postId - - will show post by postId and information about it
### body: none
#
### [POST] /create-comment
### body: JSON
```json
{
  "username": "test",
  "postid": 1,
  "commenttext": "test"
}
```
### - to create a comment under the post
#
### [POST] /like
### body: JSON
```json
{
  "username": "test",
  "postid": 1
}
```
### - to like a post
#
### [POST] /dislike
### body: JSON
```json
{
  "username": "test",
  "postid": 1
}
```
### - to dislike a post