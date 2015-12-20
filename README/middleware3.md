# Controlling middleware
In the previous section we saw how mounting a middleware at a path will cause the middleware function to be executed whenever **the base** of the requested path matches the path. So when we mount some middleware at the root path, it is going to cascade down to any other request, since every request also matches the `/`.

> The `/` is at the base of any other route; in the same way, a route path such as `'/user'` would be at the base of another one named `'/username'`, or `'/user/12'`, etc.

This is something that has to do with how the **routing** works in [Express][1]. In this section we are gonna learn how to be more specific about the reach of our middleware, and to do that we need to understand what is a **route path**.

## Route paths
Every request is made against URI. A route path (or just **path**) represents the part of the URI that comes after the domain name, for example:

* In `http://mydomain.com/about` the path is `/about`
* In `http://mydomain.com/users/12` the path is `/users/12`
* In `http://mydomain.com` the path is `/`

A route path, in combination with a request method, define the endpoint at which a request can be made. In Express we use these paths whenever we define a **route**, but also when we mount some **middleware**.

### Matching a route path
Express uses a package named [path-to-regexp][2] for matching the route paths; so check the documentation of this package for learning about all the possibilities in defining route paths. Basically a route path can be:

1. A **string**, such as `'/'`, or `'/about'`.
2. A **string pattern**, which is a string where we can use a small subset of **regexp** operators. For example, `'/$'`, or `'/about$'`.
3. A fully fledged **regular expression** such as `/.*fly$/`. Note that there are no quotes surrounding the path, just forward slashes.

We are not gonna cover **regular expressions** here, but let's see what we can do with **string patterns** to make our middleware more precise. Let's say we want to mount different middlewares at different paths, in a way that doesn't cascade down. The following table contains the mapping of middleware/path we want to achieve:

Middleware | Path
-----------|---------
`one`      | Only for requests made to `'/'`
`two`      | Only for requests made to `'/about'`
`three`    | Only for requests made to `'/about/me'`

* So far we've used **strings**:

```js
app.use('/', middleware.one, middleware.two);
app.use('/about', middleware.three);
```

But we saw the cascade down effect. That isn't bad in itself, sometimes it's actually what we want, but let's say that this time we don't want that.

* Let's mount our middleware using **string patterns**:

```js
app.use('/$', middleware.one);
app.use('/about$', middleware.two);
app.use('/about/me$', middleware.three);
```

Time to make some requests to see what we got. Starting with the root route, `'/$'`:

```
$ curl http://localhost:3000/
#1: I'm middleware number one.
Hello world!
```

Now let's try with `'/about$'`

```
$ curl http://localhost:3000/about
#2: I'm middleware number two.
What do you wanna know cowboy?
```

And finally, a request to `'/about/me'`:

```
$ curl http://localhost:3000/about/me
#3: I'm middleware number three.
I'm very cool!
```

This time we got what we were looking for, no middleware cascading down, and we did that using **string patterns** with a simple dollar sign (`$`) at the end. Using this character we match the end of a string, for example `'/user$'` would match a request to `'/user'` but not a request to `'/username'`. Some other symbols we can use:

Symbol | Matches   
-------|-----------
`foo$` | `foo` at the end of string
`b?`   | 0 or more `b`
`b+`   | 1 or more `b`
`a*b`  | Anything between `a` and `b`

Check the [Express routing guide][3] for more info and the [Express Route Tester][4] which is an online app for getting a feeling practicing with some patterns.

## Exact match using the app.all method
Express also offers a special routing method named `app.all`, which is normally used for loading middleware at a path for all request methods. Check the [docs][5] to know more about it.

A characteristic of this method is that it matches a complete path, for example:

```js
app.all( "/product" , handler);
// will match /product
// won't match /product/cool   <-- Important
// won't match /product/foo    <-- Important

app.all( "/product/*" , handler);
// won't match /product        <-- Important
// will match /product/cool
// will match /product/foo
```

In our example we could have used it this way:

```js
app.all('/', middleware.one);
app.all('/about', middleware.two);
app.all('/about/me', middleware.three);
```

And the result would have been the same that using string patterns. Give it a go and see it yourself.

> You can check out the project at this stage using:
>
> ```
> $ git checkout tags/v0.7
> $ npm run dev
> ```

---
[:arrow_backward:][back] ║ [:house:][home] ║ [:arrow_forward:][next]

<!-- navigation -->
[home]: ../README.md
[back]: middleware2.md
[next]: #

<!-- links -->
[1]: http://expressjs.com/
[2]: https://www.npmjs.com/package/path-to-regexp
[3]: http://expressjs.com/en/guide/routing.html
[4]: http://forbeslindesay.github.io/express-route-tester/
[5]: http://expressjs.com/en/4x/api.html#app.all
