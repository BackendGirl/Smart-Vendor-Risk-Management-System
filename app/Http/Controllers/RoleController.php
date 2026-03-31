<?php

namespace App\Http\Controllers;

use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RoleController extends Controller
{
    
    public function index()
    {
        return Inertia::render('Roles/Index', [
            'roles' => Role::with('permissions')->get()
        ]);
    }

    public function create()
    {
        return Inertia::render('Roles/Create', [
            'permissions' => Permission::all()
        ]);
    }

    public function store(Request $request)
    {
        $role = Role::create([
            'name' => $request->name
        ]);

        $role->syncPermissions($request->permissions);

        return redirect()->route('roles.index');
    }

    public function edit(Role $role)
    {
        return Inertia::render('Roles/Edit', [
            'role' => $role,
            'permissions' => Permission::all(),
            'rolePermissions' => $role->permissions->pluck('name')
        ]);
    }

    public function update(Request $request, Role $role)
    {
        $role->update([
            'name' => $request->name
        ]);

        $role->syncPermissions($request->permissions);

        return redirect()->route('roles.index');
    }

    public function destroy(Role $role)
    {
        $role->delete();
        return back();
    }
}
