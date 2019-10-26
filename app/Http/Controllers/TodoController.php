<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class TodoController extends Controller
{
    public function index() {
        return view('todo');
    }

    public function get(){
        return response()->json(Auth::user()->todos()->get());
    }

    public function post(Request $request){
        $todo = new Todo();
        $todo->todo = $request->todo;
        $todo->user_id = Auth::id();
        $todo->save();
        return response("OK", 200);
    }

    public function delete($id){
        Todo::find($id)->delete();
        return response("OK", 200);;
    }

    public function update(Request $request,$id){
        $todo = Todo::find($id);
        $todo->todo = $request->todo;
        $todo->save();
        return response("OK", 200);
    }
}