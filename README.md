
# Prerequisites

This project required listed tools to work properly

- NodeJS & NPM
- Mysql
- NestJs
- TypeORM
- ReactJs


# NestJs Environment Setup

- install nest js 

```sh
$ npm i -g @nestjs/cli
```

- Install project dependencies 

```sh
$ npm install
```

> this will install all required dependencies for nest framework


# ReactJs Environment Setup

- open terminal in react-app directory and run 

```
$ npm install
```
> This will install all required dependencies to run react app


#TypeORM Config

- create database <b>restaurant</b> in mysql server.
- open ormconfig.json exists on root directory
- set database, host, username and password for database connection

> all required tables will be created from entity files when nest server will run

 
 # Run NestJs Server
 
 - open terminal in root directory and run
 ```
 $ nest start
 ```

# Run React Webpack Server

- open terminal in react-app directory and run

```
$ npm start
```


- Open app in browser user following link

```
http://localhost:8010
```

- main page has three links for inventory, menu and ingredients



#Inventory 

- Click on inventory link
> It will redirect you to inventory page, it has list of existing inventory item 



![Image description](./screenshots/inventory-list.png)

- to reload inventoy list click on reload button ![Image description](./screenshots/reloaded.png)
- to add new inventory item click on add button ![Image description](./screenshots/add.png)
- to edit an item click on edit button ![Image description](./screenshots/edit.png)
- to delete an item click on delete button ![Image description](./screenshots/delete.png)

# Ingredient

- click on ingredient list

![Image description](./screenshots/ingredients-list.png)

> Ingredients list has all ingredients


- to reload ingreident list click on reload button ![Image description](./screenshots/reloaded.png)
- to delete an ingredient click on delete button ![Image description](./screenshots/delete.png)
- click on details icon ![Image description](./screenshots/details.png) to view the details of ingredient

![Image description](./screenshots/ingredient-details.png)

- click on calculate cost to get the cost of ingredient.

![Image description](./screenshots/ingredient-cost.png)


- to edit an ingredient click on edit button ![Image description](./screenshots/edit.png)

![Image description](./screenshots/ingredient-edit.png)

> you can add new inventory/ingredient in the list through ![Image description](./screenshots/add.png) button on top of recipe items list.


- to add new ingredient item click on add button ![Image description](./screenshots/add.png)

![Image description](./screenshots/ingredient-add.png)


# Menu

- click on menu list

![Image description](./screenshots/menu-list.png)

> Ingredients list has all menus


- to reload ingreident list click on reload button ![Image description](./screenshots/reloaded.png)
- to delete an menu click on delete button ![Image description](./screenshots/delete.png)
- click on details icon ![Image description](./screenshots/details.png) to view the details of menu

![Image description](./screenshots/menu-detail.png)

- click on calculate cost to get the cost of menu.

![Image description](./screenshots/menu-cost.png)


- to edit an menu click on edit button ![Image description](./screenshots/edit.png)

![Image description](./screenshots/menu-edit.png)

> you can add new inventory/menu in the list through ![Image description](./screenshots/add.png) button on top of recipe items list.


- to add new menu item click on add button ![Image description](./screenshots/add.png)

![Image description](./screenshots/menu-add.png)
