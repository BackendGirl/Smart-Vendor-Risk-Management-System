<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Permission;
class PermissionController extends Controller
{

public function index()
{
    return Inertia::render('Permissions/Index', [
        'permissions' => Permission::latest()->get()
    ]);
}

public function store(Request $request)
{
    $request->validate([
        'name' => 'required|unique:permissions,name'
    ]);

    Permission::create(['name' => $request->name]);

    return back();
}

public function update(Request $request, Permission $permission)
{
    $request->validate([
        'name' => 'required|unique:permissions,name,' . $permission->id
    ]);

    $permission->update(['name' => $request->name]);

    return back();
}

public function destroy(Permission $permission)
{
    $permission->delete();
    return back();
}
}
