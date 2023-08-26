## Angular Inertia.js Driver

Provides Angular support for Inertia.js; uses the original `@inertiajs/core` package.

> **Disclaimer:** This project is a work in progress. This is a 3rd party driver.

## Getting Started

```bash
git clone git@github.com:hettiger/angular-inertiajs-driver.git
cd angular-inertiajs-driver
composer install
cp .env.example .env
php artisan key:generate
npm -C resources/angular install
npm run ng:dev
php artisan serve
```

> Using `php artisan serve` is not recommended. Consider using [Laravel Herd](https://herd.laravel.com).

## Directory Structure

This project has been initialized using the Laravel installer and 
[hettiger/laravel-angular-preset](https://github.com/hettiger/laravel-angular-preset).

```text
angular-interiajs-driver // Laravel App Root
├── app
│   ├── …
│   └── Http
│       └── Controllers
│   │       ├── AboutController.php // Inertia.js Page Controller
│   │       └── HomeController.php // Inertia.js Page Controller
├── …
├── public
│   └── angular // Angular build
├── resources
│   ├── angular // Angular App Root ¹
│   │   └── src
│   │       ├── app
│   │       │   ├── inertia // Angular Inertia.js Driver
│   │       │   └── pages // Inertia.js Page Components
│   │       └── …
│   ├── …
│   └── views
│       ├── …
│       └── generated
│           └── angular.blade.php // Angular Laravel View ¹
├── routes
│   ├── …
│   └── web.php // Inertia.js Page Routes
└── …
```

¹ The Angular `index.html` file has been modified to include the `@inertiaHead` and `@inertia` directives. 
Changes made by [hettiger/laravel-angular-preset](https://github.com/hettiger/laravel-angular-preset) keep the 
`angular.blade.php` view in sync. (It's a slightly modified version of `index.html` that uses e.g. the Laravel 
`asset()` helper…)

## Adding Pages

Create dedicated page components using `ng g c pages/name` as you normally would.

> You need to cd into the `resources/angular` directory before trying to run `ng` commands.

Register your page components:

```ts
@NgModule({
    // …
    providers: [
        { provide: INERTIA_PAGES, useValue: { component: 'home', type: HomeComponent }, multi: true },
        { provide: INERTIA_PAGES, useValue: { component: 'about', type: AboutComponent }, multi: true },
    ],
    // …
})
export class AppModule {
    // …
}
```

> Notice the `useValue: { component: 'home', type: HomeComponent }` data structure. The component string corresponds
> to the `Inertia::render('home', [/* … */]);` call in your Inertia.js Page Controllers.

Add a Laravel route and a Inertia.js Page Controller to `routes/web.php`:

`Route::get('/', \App\Http\Controllers\HomeController::class);`

## Roadmap

- [ ] Support all Inertia.js features
- [ ] Release the driver as a standalone NPM package that can be installed into an existing Angular application

> There's absolutely no requirement to use 
> [hettiger/laravel-angular-preset](https://github.com/hettiger/laravel-angular-preset)
> or to build a monorepo in general.

## License

The Angular Inertia.js Driver is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
