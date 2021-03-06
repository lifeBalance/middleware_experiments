# Application level middleware
Here we are gonna continue to play with the `use` method, and start passing a path as a first argument, so the middleware will only work for requests **matching** that path.

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

## Creating a couple of new routes and mounting the middleware
Let's create a new route below the old one:

```js
app.get('/about', function (req, res) {
  res.end('What do you wanna know cowboy?');
});
```

And mount the third middleware on the new route:

```js
app.use('/', middleware.one);
app.use('/', middleware.two);
app.use('/about', middleware.three);
```

> We can specify more than one middleware function at the same mount path:

> ```js
> app.use('/', middleware.one, middleware.two);
> app.use('/about', middleware.three);
> ```

Let's make a request to `/`:

```
$ curl http://localhost:3000/
#1: I'm middleware number one.
#2: I'm middleware number two.
Hello world!
```

And now a second request to `/about`:

```
$ curl http://localhost:3000/about
#1: I'm middleware number one.
#2: I'm middleware number two.
#3: I'm middleware number three.
What do you wanna know cowboy?
```

Oops:bangbang: most probably you weren't expecting that :confused: We didn't mount middlewares `one` and `two` on the `/about` path, yet these middlewares are still working. This is the way routing works in Express, all the middleware mounted in the **root route** will be available in **all** of the routes.

> All the middleware mounted in the **root route** will be run for every request, since the root route is matched by every request.

The same way, if we had the following route:

```js
app.get('/about/me', function (req, res) {
  res.end("I'm very cool!\n");
});
```

The middlewares `one` and `two` (mounted on `/`) and also middleware `three` (mounted on `/about`) will be working on any request to `/about/me`:

```
$ curl http://localhost:3000/about/me
#1: I'm middleware number one.
#2: I'm middleware number two.
#3: I'm middleware number three.
I'm very cool!
```

Even though we didn't explicitly mount any middleware at `/about/me` path, because a request to `/about/me` also **matches** the `/` and `/about` paths.

> You can check out the project at this stage using:
>
> ```
> $ git checkout tags/v0.6
> $ npm run dev
> ```

---
[:arrow_backward:][back] ║ [:house:][home] ║ [:arrow_forward:][next]

<!-- navigation -->
[home]: ../README.md
[back]: middleware.md
[next]: middleware3.md

<!-- links -->
[1]: http://expressjs.com/
