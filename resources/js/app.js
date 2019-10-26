/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

Vue.component('example-component', require('./components/ExampleComponent.vue').default);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = new Vue({
    el: '#app',
});

"use strict"

const send = (method,uri,data={}) => {
    const url = 'http://127.0.0.1:8000' + uri
    return new Promise((resolve)=>{
        var xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        xhr.onload = () => {
            try{
                const res_json = JSON.parse(xhr.responseText)
                resolve(res_json)
            }catch (e) {
                resolve(xhr.responseText)
            }
        }
        xhr.onerror = () => {
            console.log(xhr.status);
            console.log("error!");
        };
        xhr.send(data);
    })
}

const api = {
    getTodoList(){
        return send("GET","/api/todo");
    },
    postTodo(todo){
        return send("POST","/api/todo",todo);
    },
    updateTodo(id,todo){
        return send("PUT","/api/todo/" + id,todo);
    },
    deleteTodo(id,data){
        return send("DELETE","/api/todo/" + id,data);
    }
}

export default api
