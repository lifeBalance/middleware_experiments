# Mounting middleware at different paths
Here we are gonna continue to play with the `use` method, and start passing a path as a first argument, so the middleware will only work for requests to that path.

## Moving all the middleware to a separate file
Before anything, let's move all of our middleware to that separate file we created in the previous section. This is how `middleware.js` should look like:

```js
module.exports = {
  one: function(req,res,next){
    console.log("#1: I'm middleware number one.");
    res.write("#1: I'm middleware number one.\n");
    next();
  },

  two: function(req,res,next){
    console.log("#2: I'm middleware number two.");
    res.write("#2: I'm middleware number two.\n");
    next();
  },

  three: function (req, res, next) {
    console.log("#3: I'm middleware number three.");
    res.write("#3: I'm middleware number three.\n");
    next();
  }
};
```

Make sure the file containing the module (`middleware.js`) is required in the main file (`index.js`):

```js
var middleware = require('./middleware');
```

Now let's mount all the middleware at the **root route**:

```js
app.use('/', middleware.one);
app.use('/', middleware.two);
app.use('/', middleware.three);
```

> Remember that if we don't pass a **path** as a first argument to the `use` method, it will mount all the middleware in the root route (`/`). So the above code is equivalent to:

>  ```js
>  app.use(middleware.one);
>  app.use(middleware.two);
>  app.use(middleware.three);
>  ```

> But it's better to be explicit when mounting middleware.

If we start our server and make a simple request this is what we get:

```
$ curl http://localhost:3000/
#1: I'm middleware number one.
#2: I'm middleware number two.
#3: I'm middleware number three.
Hello world!
```

> You can check out the project at this stage using:
>
> ```bash
> $ git checkout tags/v0.5
> $ npm run dev
> ```


---
[:arrow_backward:][back] ║ [:house:][home] ║ [:arrow_forward:][next]

<!-- navigation -->
[home]: ../README.md
[back]: middleware.md
[next]: #

<!-- links -->
[1]: http://expressjs.com/
