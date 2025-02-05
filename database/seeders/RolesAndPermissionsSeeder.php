<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolesAndPermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $permissions = [
            'create-post',
            'edit-post',
            'delete-post',
            'manage-users'
        ];
    
        foreach ($permissions as $permission) {
            Permission::create(['name' => $permission]);
        }
    
        // Crear roles y asignar permisos
        $admin = Role::create(['name' => 'admin']);
        $admin->givePermissionTo(Permission::all());
    
        $editor = Role::create(['name' => 'editor']);
        $editor->givePermissionTo(['create-post', 'edit-post']);
    
        // Asignar rol a usuario
        $user = \App\Models\User::find(1);
        $user->assignRole('admin');
    }
}
