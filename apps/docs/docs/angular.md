---
sidebar_position: 4
---

# Использование Module Federation в Angular

## Как добавить Module Federation в Angular-приложение

Плагин module federation работает только c webpack 5, поэтому для полноценной работы
вам понадобится Angular 12 версии и выше.

Чтобы начать работу с Module Federation вам необходимо

- Создать хост и дочерние приложения, сделать этом можно различными способами:
    - монорепозиторий nx
    - монорепозиторий angular cli
    - раздельные репозитории
- Установить зависимость для управления микрофронтендами на базе module federation для angular
  `@angular-architects/module-federation`, либо его полный аналог для nx `@nx/angular/module-federation`
- Задать для приложений файлы конфигурации
    - для хоста:
    ```javascript
    const { withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');
    
    module.exports = withModuleFederationPlugin({
        remotes: {
            "mfe1": "http://localhost:4201/remoteEntry.js",
        },
    });
    ```
    - для встраиваемого приложения
    ```javascript
    const { withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');
    
    module.exports = withModuleFederationPlugin({
        name: 'mfe1',
        
        exposes: {
            './Module': './projects/mfe1/src/app/core/core.module.ts',
        },
    });
    ```
- добавить загрузку mfe1 в хост
    - через роутинг, используя прямое объявление remotes в конфигурации хост приложения
    ```ts
        const ROUTES = [
            {
                path: 'mfe1',
                loadChildren: () => import('mfe1/Module').then(m => m.CoreModule)
            },
        ]
    
        @NgModule({
            imports: [
                CommonModule,
                RouterModule.forChild(ROUTES)
            ],
            bootstrap: [AppComponent],
        })
        export class AppModule {}
    ```
    - через роутинг, если в конфигурации хост приложения не указан удаленный модуль
    ```ts
    import { loadRemoteModule } from '@angular-architects/module-federation';
 
    const ROUTES = [
        {
            path: 'mfe1',
            loadChildren: () => loadRemoteModule({
                    remoteEntry: `http://localhost:4201/remoteEntry.js`,
                    type: 'module',
                    exposedModule: './Module',
                }).then((m) => m.CoreModule),
        },
    ]
    
    @NgModule({
        imports: [
            CommonModule,
            RouterModule.forChild(ROUTES)
        ],
        bootstrap: [AppComponent],
    })
    export class AppModule {}
    ```
    - загрузка компонента (императивный подход):
    ```ts
    const m = await loadRemoteModule({
        remoteEntry: `http://localhost:4201/remoteEntry.js`,
        type: 'module',
        exposedModule: './Module',
    });
    const entity = m.CoreModule;
    
    const component = createNgModule<{ rootComponent: Type<unknown> }>(
        entity
    ).instance.rootComponent;
    
    this.vcRef.createComponent(component);
    ```

## Как настроить Module Federation для обмена модулями между приложениями
Для того чтобы переиспользовать общие зависимости необходимо
в файлах конфигурации webpack указать следующие параметры:

- Если необходимо расшарить все зависимости:
```javascript
const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({
    // ...
    shared: {
        ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
    },
});
```

- Если необходимо расшарить только указанные зависимости:
```javascript
const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({
    // ...
    shared: share({
        "@angular/core": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
        "@angular/common": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
        "@angular/common/http": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
        "@angular/router": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
    }),
});
```

- Если необходимо расшарить внутренние библиотеки (например, при работе в nx монорепозитории):
```javascript
const {
    withModuleFederationPlugin,
    SharedMappings,
} = require('@angular-architects/module-federation/webpack');
const path = require('path');

const SHARED_LIBS = ['@angular15mf/core', '@angular15mf/rx-store'];

const sharedMappings = new SharedMappings();
sharedMappings.register(
    path.join(__dirname, '../tsconfig.base.json'),
    SHARED_LIBS
);

module.exports = (name, exposes = undefined) =>
    withModuleFederationPlugin({
        // ...
        shared: {
            ...sharedMappings.getDescriptors(),
        },
    });
```

## Как работать с удаленными модулями и удаленными компонентами

Для загрузки удаленных модулей или удаленных standalone компонентов используется метод `loadRemoteModule`
из пакета `@angular-architects/module-federation` (уже применялся в примерах выше).

Данный метод в качестве аргумента принимает следующие параметры:
- remoteEntry - путь до удаленного модуля/компонента
- type - тип загружаемого модуля, по умолчанию - `module` (для загрузки необходимо указать remoteEntry),
так же можно указать `manifest`, если используется стандартная конфигурация через файл манифеста
- exposedModule - значение, указываемое в загружаемом приложении в качестве экспортируемого модуля/компонента



