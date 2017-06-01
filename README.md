# Pretzel Muxy Interactive

Pretzel Overlay component and Panel for Muxy's Twitch Interactive system.

###### Install dependencies:

```bash
$ yarn install
```

###### To develop:

```bash
$ yarn run dev
```

###### To lint the code:

```bash
$ yarn run lint
```

###### To preview your work

Once you've ran `yarn run dev` the console output will provide you with a URL
you can use to preview your work in the browser. By default this will be
`http://localhost:4000`.

###### Do I have to use yarn?

All of the above commands can also be executed with `npm` instead of `yarn`

***

#### Project structure

All of the frontend code can be found in the `client` folder.

The specific logic and presentation code for Pretzel components is found in
`client/components/Pretzel` and their respective subfolder, `NowPlaying` for the
interactive overlay component and `WhatsPlaying` for the panel.

To preview the components when running in dev mode you can navigate the
application to `http://localhost:4000/#` for the overlay component and
`http://localhost:4000/#/panel` for the panel component in your browser. This is
defined in the routes config file which can be found in the `client/router`
folder. Do note that the port specified in the application url's above may be
different for you.

The two views used for in the router config can found in the `client/views`
folder. This is where you define which components will be rendered in the view,
and is only used by you during development.

###### Component data flow

You will notice the `client/store/index` file, which is used to provide our
components with sample data. Your components will normally get this data from
the Muxy system, but during development it's useful to have this mocked up. We
also used this setup to mock the Muxy vote aggregation client and the getters
for data hydration and prefetching.

You might also notice that in our components we also import the
`shared/js/messenger` module which is just a `no-op`. This is because we use
Muxy's messenger module to fetch data dynamically for your components and allows
us to write production ready code in dev environment.

###### Extra files and folders

You will also find some extra folders in our project structure like `client/src`
and `client/static`. We used these in order to be able to organize our project
structure and imports in the same way Muxy imports our static assets (images,
fonts, css).
